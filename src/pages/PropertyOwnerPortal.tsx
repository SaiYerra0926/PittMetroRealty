import React, { useState, useEffect, useRef } from 'react';
import { Home, Upload, Eye, Save, ArrowLeft, CheckCircle, Lock, User, Shield, Camera, DollarSign, MapPin, Bed, Bath, Edit, Trash2, X, Search, RefreshCw } from 'lucide-react';
import PropertyDetailsModal from '@/components/PropertyDetailsModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import PhotoUpload from '@/components/PhotoUpload';
import { PropertiesAPI } from '@/lib/api/properties';
import { useToast } from '@/hooks/use-toast';

const PropertyOwnerPortal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [submittedListings, setSubmittedListings] = useState<any[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingListings, setIsLoadingListings] = useState(false);
  const [editingListing, setEditingListing] = useState<any | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [selectedListing, setSelectedListing] = useState<any | null>(null);
  // Removed allListings - only owner's listings are shown now
  const [viewingListing, setViewingListing] = useState<any | null>(null);
  const { toast } = useToast();
  const propertiesApi = new PropertiesAPI();
  const [formData, setFormData] = useState({
    // Basic Information
    title: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    latitude: 0,
    longitude: 0,
    
    // Property Details
    propertyType: '',
    bedrooms: 0,
    bathrooms: 0,
    squareFeet: 0,
    yearBuilt: new Date().getFullYear(),
    lotSize: 0,
    
    // Pricing
    price: 0,
    listingType: 'rent', // 'rent', 'sell', or 'buy'
    
    // Features & Amenities
    features: [] as string[],
    amenities: [] as string[],
    
    // Additional Info
    status: 'active', // Default to 'active' for new listings
    availableDate: '',
    photos: [] as File[],
    
    // Owner Information
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    ownerPreferredContact: 'email'
  });

  const [isGeocoding, setIsGeocoding] = useState(false);
  const geocodeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Owner credentials (in real app, this would be secure authentication)
  const ownerCredentials = {
    username: 'owner@pittmetro.com',
    password: 'owner123'
  };

  const handleLogin = () => {
    if (loginData.username === ownerCredentials.username && 
        loginData.password === ownerCredentials.password) {
      setIsAuthenticated(true);
      setActiveTab('dashboard');
    } else {
      alert('Invalid credentials. Please contact Pitt Metro Realty for access.');
    }
  };

  // Professional geocoding function with better error handling
  const geocodeAddress = async (address: string, city: string, state: string, zipCode: string) => {
    if (!address || address.trim() === '') return;
    
    setIsGeocoding(true);
    try {
      // Build full address with proper formatting
      const addressParts: string[] = [];
      if (address) addressParts.push(address.trim());
      if (city) addressParts.push(city.trim());
      if (state) addressParts.push(state.trim());
      if (zipCode) addressParts.push(zipCode.trim());
      
      const fullAddress = addressParts.join(', ');
      
      if (fullAddress.trim() === '') {
        setIsGeocoding(false);
        return;
      }

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&limit=1&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'PittMetroRealty/1.0 (Property Management System)',
            'Accept-Language': 'en-US,en;q=0.9'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Geocoding API returned status ${response.status}`);
      }

      const data = await response.json();
      
      if (data && Array.isArray(data) && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lon = parseFloat(result.lon);
        
        // Validate coordinates
        if (!isNaN(lat) && !isNaN(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
          setFormData(prev => ({
            ...prev,
            latitude: lat,
            longitude: lon
          }));
          toast({
            title: "Location Found",
            description: `Coordinates: ${lat.toFixed(6)}, ${lon.toFixed(6)}`,
          });
        } else {
          throw new Error('Invalid coordinates received');
        }
      } else {
        // Try with simplified address (city and state only)
        if (city && state) {
          const simplifiedAddress = `${city}, ${state}${zipCode ? ` ${zipCode}` : ''}`;
          const retryResponse = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(simplifiedAddress)}&limit=1`,
            {
              headers: {
                'User-Agent': 'PittMetroRealty/1.0 (Property Management System)',
                'Accept-Language': 'en-US,en;q=0.9'
              }
            }
          );
          
          if (retryResponse.ok) {
            const retryData = await retryResponse.json();
            if (retryData && Array.isArray(retryData) && retryData.length > 0) {
              const result = retryData[0];
              const lat = parseFloat(result.lat);
              const lon = parseFloat(result.lon);
              
              if (!isNaN(lat) && !isNaN(lon)) {
                setFormData(prev => ({
                  ...prev,
                  latitude: lat,
                  longitude: lon
                }));
                toast({
                  title: "Approximate Location Found",
                  description: `Using city center: ${lat.toFixed(6)}, ${lon.toFixed(6)}`,
                  variant: "default",
                });
                setIsGeocoding(false);
                return;
              }
            }
          }
        }
        
        toast({
          title: "Location Not Found",
          description: "Could not geocode address. The property will still be saved, but may not appear on the map.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      toast({
        title: "Geocoding Error",
        description: "Unable to geocode address. The property will still be saved. You can manually add coordinates later.",
        variant: "default",
      });
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // Geocode address when address, city, state, or zipCode changes
    if (['address', 'city', 'state', 'zipCode'].includes(field)) {
      // Clear existing timeout
      if (geocodeTimeoutRef.current) {
        clearTimeout(geocodeTimeoutRef.current);
      }
      
      // Debounce geocoding (wait 1 second after user stops typing)
      geocodeTimeoutRef.current = setTimeout(() => {
        const currentAddress = field === 'address' ? value : formData.address;
        const currentCity = field === 'city' ? value : formData.city;
        const currentState = field === 'state' ? value : formData.state;
        const currentZipCode = field === 'zipCode' ? value : formData.zipCode;
        
        if (currentAddress && currentCity && currentState) {
          geocodeAddress(currentAddress, currentCity, currentState, currentZipCode);
        }
      }, 1000);
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.title.trim()) newErrors.title = 'Property title is required';
    if (!formData.description.trim()) newErrors.description = 'Property description is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
    if (formData.bedrooms <= 0) newErrors.bedrooms = 'Number of bedrooms is required';
    if (formData.bathrooms <= 0) newErrors.bathrooms = 'Number of bathrooms is required';
    if (formData.squareFeet <= 0) newErrors.squareFeet = 'Square footage is required';
    if (formData.price <= 0) newErrors.price = 'Price is required';
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
    if (!formData.ownerEmail.trim()) newErrors.ownerEmail = 'Owner email is required';
    if (!formData.ownerPhone.trim()) newErrors.ownerPhone = 'Owner phone is required';
    
    // Email validation
    if (formData.ownerEmail && !/\S+@\S+\.\S+/.test(formData.ownerEmail)) {
      newErrors.ownerEmail = 'Please enter a valid email';
    }
    
    // Photo validation
    if (formData.photos.length === 0) {
      newErrors.photos = 'At least one photo is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Track if initial fetch has been done
  const [hasInitialFetch, setHasInitialFetch] = useState(false);

  // Fetch listings when authenticated (only once on initial login, not on every render)
  useEffect(() => {
    if (isAuthenticated && loginData.username && !hasInitialFetch) {
      fetchListings(); // Only fetch owner's listings (already filtered to Buy/Rent/Sell with active/inactive status)
      setHasInitialFetch(true);
    }
  }, [isAuthenticated, loginData.username, hasInitialFetch]); // Only fetch once when authenticated

  const fetchListings = async () => {
    setIsLoadingListings(true);
    try {
      console.log('Fetching listings for:', loginData.username);
      const response = await propertiesApi.getPropertiesByOwner(loginData.username);
      console.log('API Response:', response);
      
      // Normalize listings data to ensure consistent structure
      const normalizedListings = (response.listings || []).map((listing: any) => ({
        id: listing.id,
        title: listing.title || 'Untitled Listing',
        description: listing.description || '',
        address: listing.address || '',
        city: listing.city || '',
        state: listing.state || '',
        zipCode: listing.zipCode || listing.zip_code || '',
        propertyType: listing.propertyType || listing.property_type || '',
        bedrooms: listing.bedrooms || 0,
        bathrooms: listing.bathrooms || 0,
        squareFeet: listing.squareFeet || listing.square_feet || 0,
        yearBuilt: listing.yearBuilt || listing.year_built,
        lotSize: listing.lotSize || listing.lot_size || 0,
        price: listing.price || 0,
        listingType: listing.listingType || listing.listing_type || 'rent',
        status: listing.status || 'active',
        availableDate: listing.availableDate || listing.available_date,
        photos: Array.isArray(listing.photos) ? listing.photos.map((p: any) => ({
          id: p.id,
          name: p.name || p.photo_name || '',
          url: p.url || p.photo_url || '',
          size: p.size || p.photo_size || 0
        })) : [],
        features: Array.isArray(listing.features) ? listing.features : [],
        amenities: Array.isArray(listing.amenities) ? listing.amenities : [],
        ownerName: listing.ownerName || listing.owner_name || '',
        ownerEmail: listing.ownerEmail || listing.owner_email || loginData.username,
        ownerPhone: listing.ownerPhone || listing.owner_phone || '',
        ownerPreferredContact: listing.ownerPreferredContact || listing.owner_preferred_contact || 'email',
        submittedAt: listing.submittedAt || listing.submitted_at || listing.createdAt || listing.created_at,
        createdAt: listing.createdAt || listing.created_at,
        updatedAt: listing.updatedAt || listing.updated_at
      }));
      
      console.log('Normalized listings:', normalizedListings);
      setSubmittedListings(normalizedListings);
      
      // Also save to localStorage for offline access
      if (normalizedListings.length > 0) {
        localStorage.setItem('owner_listings', JSON.stringify(normalizedListings));
      }
    } catch (error) {
      console.error('Error fetching listings from API:', error);
      console.log('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      
      // Fallback to localStorage if available
      const localListings = localStorage.getItem('owner_listings');
      if (localListings) {
        try {
          const parsed = JSON.parse(localListings);
          const normalized = Array.isArray(parsed) ? parsed.map((listing: any) => ({
            ...listing,
            photos: Array.isArray(listing.photos) ? listing.photos : [],
            features: Array.isArray(listing.features) ? listing.features : [],
            amenities: Array.isArray(listing.amenities) ? listing.amenities : []
          })) : [];
          setSubmittedListings(normalized);
          console.log('Loaded from localStorage:', normalized);
          toast({
            title: "Warning",
            description: "Using cached listings. Unable to fetch latest updates.",
            variant: "default",
          });
        } catch (parseError) {
          console.error('Error parsing localStorage listings:', parseError);
          setSubmittedListings([]);
        }
      } else {
        // No listings yet - this is normal for new users, don't show error
        console.log('No listings found in API or localStorage');
        setSubmittedListings([]);
      }
    } finally {
      setIsLoadingListings(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }
    
    // Ensure coordinates are geocoded if not already set
    if ((formData.latitude === 0 || formData.longitude === 0) && formData.address && formData.city && formData.state) {
      setIsLoading(true);
      setIsGeocoding(true);
      try {
        await geocodeAddress(formData.address, formData.city, formData.state, formData.zipCode);
        // Wait a moment for geocoding to complete
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error('Pre-submit geocoding error:', error);
      } finally {
        setIsGeocoding(false);
      }
    }
    
    setIsLoading(true);
    try {
      // Prepare listing data for API
      const listingData = {
        title: formData.title,
        description: formData.description,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        latitude: formData.latitude || undefined,
        longitude: formData.longitude || undefined,
        propertyType: formData.propertyType,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        squareFeet: formData.squareFeet,
        yearBuilt: formData.yearBuilt,
        lotSize: formData.lotSize || 0,
        price: formData.price,
        listingType: formData.listingType as 'rent' | 'sell' | 'buy',
        features: formData.features,
        amenities: formData.amenities,
        status: formData.status || 'active', // Use form status or default to 'active'
        availableDate: formData.availableDate || undefined,
        photos: formData.photos.map((photo: any, index: number) => {
          // Handle both File objects and photo objects with file property
          if (photo instanceof File) {
            return {
              id: index,
              name: photo.name,
              url: '',
              size: photo.size,
              file: photo
            };
          } else if (photo.file) {
            return {
              id: photo.id || index,
              name: photo.name || photo.file.name,
              url: photo.url || '',
              size: photo.size || photo.file.size,
              file: photo.file
            };
          } else {
            // Existing photo from database (no file property)
            return {
              id: photo.id || index,
              name: photo.name || '',
              url: photo.url || '',
              size: photo.size || 0
            };
          }
        }),
        ownerName: formData.ownerName,
        ownerEmail: formData.ownerEmail,
        ownerPhone: formData.ownerPhone,
        ownerPreferredContact: formData.ownerPreferredContact || 'email'
      };

      // Submit to API
      const newListing = await propertiesApi.createProperty(listingData);
      console.log('Created listing:', newListing);
      
      // Normalize the new listing
      const normalizedListing = {
        ...newListing,
        photos: Array.isArray(newListing.photos) ? newListing.photos : [],
        features: Array.isArray(newListing.features) ? newListing.features : [],
        amenities: Array.isArray(newListing.amenities) ? newListing.amenities : [],
        zipCode: newListing.zipCode || newListing.zip_code || '',
        propertyType: newListing.propertyType || newListing.property_type || '',
        squareFeet: newListing.squareFeet || newListing.square_feet || 0,
        yearBuilt: newListing.yearBuilt || newListing.year_built,
        lotSize: newListing.lotSize || newListing.lot_size || 0,
        listingType: newListing.listingType || newListing.listing_type || 'rent',
        availableDate: newListing.availableDate || newListing.available_date,
        submittedAt: newListing.submittedAt || newListing.submitted_at || newListing.createdAt || newListing.created_at,
        createdAt: newListing.createdAt || newListing.created_at,
        updatedAt: newListing.updatedAt || newListing.updated_at
      };
      
      // Add to local state immediately for better UX
      setSubmittedListings(prev => {
        const updated = [...prev, normalizedListing];
        localStorage.setItem('owner_listings', JSON.stringify(updated));
        return updated;
      });
      
      // Refresh listings from API to get complete data (only after successful submission)
      // This is fine here since it's after a new submission, not during editing
      await fetchListings();
      
      setShowSuccess(true);
      setActiveTab('manage');
      
      toast({
        title: "Success!",
        description: "Property listing submitted successfully! Our team will review it within 24 hours.",
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        latitude: 0,
        longitude: 0,
        propertyType: '',
        bedrooms: 0,
        bathrooms: 0,
        squareFeet: 0,
        yearBuilt: new Date().getFullYear(),
        lotSize: 0,
        price: 0,
        listingType: 'rent',
        features: [],
        amenities: [],
        status: 'Draft',
        availableDate: '',
        photos: [],
        ownerName: '',
        ownerEmail: '',
        ownerPhone: '',
        ownerPreferredContact: 'email'
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting listing:', error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "There was an error submitting your listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditListing = (listing: any) => {
    setEditingListing(listing);
    // Populate form with existing listing data
    setFormData({
      title: listing.title || '',
      description: listing.description || '',
      address: listing.address || '',
      city: listing.city || '',
      state: listing.state || '',
      zipCode: listing.zipCode || '',
      latitude: listing.latitude || listing.coordinates?.lat || 0,
      longitude: listing.longitude || listing.coordinates?.lng || 0,
      propertyType: listing.propertyType || '',
      bedrooms: listing.bedrooms || 0,
      bathrooms: listing.bathrooms || 0,
      squareFeet: listing.squareFeet || 0,
      yearBuilt: listing.yearBuilt || new Date().getFullYear(),
      lotSize: listing.lotSize || 0,
      price: listing.price || 0,
      listingType: listing.listingType || 'rent',
      features: listing.features || [],
      amenities: listing.amenities || [],
      status: listing.status || 'active',
      availableDate: listing.availableDate || '',
      photos: listing.photos || [],
      ownerName: listing.ownerName || '',
      ownerEmail: listing.ownerEmail || '',
      ownerPhone: listing.ownerPhone || '',
      ownerPreferredContact: listing.ownerPreferredContact || 'email'
    });
    setActiveTab('list');
  };

  const handleCancelEdit = () => {
    setEditingListing(null);
    // Reset form
    setFormData({
      title: '',
      description: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      latitude: 0,
      longitude: 0,
      propertyType: '',
      bedrooms: 0,
      bathrooms: 0,
      squareFeet: 0,
      yearBuilt: new Date().getFullYear(),
      lotSize: 0,
      price: 0,
      listingType: 'rent',
      features: [],
      amenities: [],
      status: 'Draft',
      availableDate: '',
      photos: [],
      ownerName: '',
      ownerEmail: '',
      ownerPhone: '',
      ownerPreferredContact: 'email'
    });
  };

  const handleUpdateListing = async () => {
    if (!editingListing || !editingListing.id) {
      toast({
        title: "Error",
        description: "No listing selected for update.",
        variant: "destructive",
      });
      return;
    }

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    // Ensure coordinates are geocoded if not already set
    if ((formData.latitude === 0 || formData.longitude === 0) && formData.address && formData.city && formData.state) {
      setIsUpdating(true);
      setIsGeocoding(true);
      try {
        await geocodeAddress(formData.address, formData.city, formData.state, formData.zipCode);
        // Wait a moment for geocoding to complete
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error('Pre-update geocoding error:', error);
      } finally {
        setIsGeocoding(false);
      }
    }

    setIsUpdating(true);
    try {
      // Prepare updated listing data
      const updatedData: any = {
        title: formData.title,
        description: formData.description,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        latitude: formData.latitude || undefined,
        longitude: formData.longitude || undefined,
        propertyType: formData.propertyType,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        squareFeet: formData.squareFeet,
        yearBuilt: formData.yearBuilt,
        lotSize: formData.lotSize || 0,
        price: formData.price,
        listingType: formData.listingType as 'rent' | 'sell' | 'buy',
        features: formData.features,
        amenities: formData.amenities,
        status: formData.status || 'active', // Include status in update
        availableDate: formData.availableDate || undefined,
        ownerName: formData.ownerName,
        ownerEmail: formData.ownerEmail,
        ownerPhone: formData.ownerPhone,
        ownerPreferredContact: formData.ownerPreferredContact || 'email'
      };

      // Process photos - keep existing photos and add new ones
      const existingPhotos = formData.photos.filter((p: any) => p.url && !p.file);
      const newPhotos = formData.photos.filter((p: any) => p.file);
      
      // Convert new File objects to base64 format
      const processedNewPhotos = await Promise.all(
        newPhotos.map(async (photo: any) => {
          if (photo.file) {
            const base64 = await propertiesApi['fileToBase64'](photo.file);
            return {
              name: photo.name,
              url: base64,
              size: photo.size,
              isBase64: true,
            };
          }
          return photo;
        })
      );

      updatedData.photos = [...existingPhotos, ...processedNewPhotos];

      // Update via API
      const updatedListing = await propertiesApi.updateProperty(editingListing.id, updatedData);
      
      // Update local storage with the updated listing
      const currentListings = submittedListings.map((listing: any) => 
        listing.id === editingListing.id ? updatedListing : listing
      );
      setSubmittedListings(currentListings);
      localStorage.setItem('owner_listings', JSON.stringify(currentListings));
      
      // Don't auto-refresh - let user click refresh button if needed
      // await fetchListings();
      
      toast({
        title: "Success!",
        description: "Property listing updated successfully!",
      });
      
      // Reset editing state
      handleCancelEdit();
      
    } catch (error) {
      console.error('Error updating listing:', error);
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "There was an error updating your listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeletePhoto = (photoIndex: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_: any, index: number) => index !== photoIndex)
    }));
  };

  const handleAddPhotos = (newPhotos: File[]) => {
    console.log('Adding photos:', newPhotos.length);
    setFormData(prev => {
      const newPhotoObjects = newPhotos.map((file, index) => ({
        id: prev.photos.length + index,
        name: file.name,
        url: '',
        size: file.size,
        file: file
      }));
      const updatedPhotos = [...prev.photos, ...newPhotoObjects];
      console.log('Total photos after adding:', updatedPhotos.length);
      return {
        ...prev,
        photos: updatedPhotos
      };
    });
  };

  const handleDeleteListing = async (listingId: string) => {
    if (!listingId) {
      toast({
        title: "Error",
        description: "Listing ID is required to delete.",
        variant: "destructive",
      });
      return;
    }

    setIsDeleting(listingId);
    try {
      await propertiesApi.deleteProperty(listingId);
      
      // Remove from local state
      const updatedListings = submittedListings.filter((listing: any) => listing.id !== listingId);
      setSubmittedListings(updatedListings);
      localStorage.setItem('owner_listings', JSON.stringify(updatedListings));
      
      // Clear selection if deleted listing was selected
      if (selectedListing?.id === listingId) {
        setSelectedListing(null);
      }
      
      toast({
        title: "Success!",
        description: "Property listing deleted successfully.",
      });
      
      setDeleteConfirmId(null);
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast({
        title: "Delete Failed",
        description: error instanceof Error ? error.message : "There was an error deleting your listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const handleSelectListing = (listing: any) => {
    setSelectedListing(listing);
    handleEditListing(listing);
  };

  const fetchAllListings = async () => {
    setIsLoadingAllListings(true);
    try {
      console.log('Fetching all listings from website...');
      const response = await propertiesApi.getProperties();
      console.log('All listings response:', response);
      
      // Normalize listings data
      const normalizedListings = (response.listings || []).map((listing: any) => ({
        id: listing.id,
        title: listing.title || 'Untitled Listing',
        description: listing.description || '',
        address: listing.address || '',
        city: listing.city || '',
        state: listing.state || '',
        zipCode: listing.zipCode || listing.zip_code || '',
        propertyType: listing.propertyType || listing.property_type || '',
        bedrooms: listing.bedrooms || 0,
        bathrooms: listing.bathrooms || 0,
        squareFeet: listing.squareFeet || listing.square_feet || 0,
        yearBuilt: listing.yearBuilt || listing.year_built,
        lotSize: listing.lotSize || listing.lot_size || 0,
        price: listing.price || 0,
        listingType: listing.listingType || listing.listing_type || 'rent',
        status: listing.status || 'active',
        availableDate: listing.availableDate || listing.available_date,
        photos: Array.isArray(listing.photos) ? listing.photos.map((p: any) => ({
          id: p.id,
          name: p.name || p.photo_name || '',
          url: p.url || p.photo_url || '',
          size: p.size || p.photo_size || 0
        })) : [],
        features: Array.isArray(listing.features) ? listing.features : [],
        amenities: Array.isArray(listing.amenities) ? listing.amenities : [],
        ownerName: listing.ownerName || listing.owner_name || '',
        ownerEmail: listing.ownerEmail || listing.owner_email || '',
        ownerPhone: listing.ownerPhone || listing.owner_phone || '',
        ownerPreferredContact: listing.ownerPreferredContact || listing.owner_preferred_contact || 'email',
        submittedAt: listing.submittedAt || listing.submitted_at || listing.createdAt || listing.created_at,
        createdAt: listing.createdAt || listing.created_at,
        updatedAt: listing.updatedAt || listing.updated_at
      }));
      
      console.log('Normalized all listings:', normalizedListings);
      setAllListings(normalizedListings);
    } catch (error) {
      console.error('Error fetching all listings:', error);
      
      // Try to load from localStorage as fallback (API client already tried, but let's try again with better error handling)
      try {
        const localProperties = localStorage.getItem('properties');
        if (localProperties) {
          const cachedListings = JSON.parse(localProperties);
          if (Array.isArray(cachedListings) && cachedListings.length > 0) {
            const normalizedCachedListings = cachedListings.map((listing: any) => ({
              id: listing.id,
              title: listing.title || 'Untitled Listing',
              description: listing.description || '',
              address: listing.address || '',
              city: listing.city || '',
              state: listing.state || '',
              zipCode: listing.zipCode || listing.zip_code || '',
              propertyType: listing.propertyType || listing.property_type || '',
              bedrooms: listing.bedrooms || 0,
              bathrooms: listing.bathrooms || 0,
              squareFeet: listing.squareFeet || listing.square_feet || 0,
              yearBuilt: listing.yearBuilt || listing.year_built,
              lotSize: listing.lotSize || listing.lot_size || 0,
              price: listing.price || 0,
              listingType: listing.listingType || listing.listing_type || 'rent',
              status: listing.status || 'active',
              availableDate: listing.availableDate || listing.available_date,
              photos: Array.isArray(listing.photos) ? listing.photos.map((p: any) => ({
                id: p.id,
                name: p.name || p.photo_name || '',
                url: p.url || p.photo_url || '',
                size: p.size || p.photo_size || 0
              })) : [],
              features: Array.isArray(listing.features) ? listing.features : [],
              amenities: Array.isArray(listing.amenities) ? listing.amenities : [],
              ownerName: listing.ownerName || listing.owner_name || '',
              ownerEmail: listing.ownerEmail || listing.owner_email || '',
              ownerPhone: listing.ownerPhone || listing.owner_phone || '',
              ownerPreferredContact: listing.ownerPreferredContact || listing.owner_preferred_contact || 'email',
              submittedAt: listing.submittedAt || listing.submitted_at || listing.createdAt || listing.created_at,
              createdAt: listing.createdAt || listing.created_at,
              updatedAt: listing.updatedAt || listing.updated_at
            }));
            
            setAllListings(normalizedCachedListings);
            toast({
              title: "Warning",
              description: `Using cached listings (${normalizedCachedListings.length} found). Unable to connect to API server. Start the server with "npm run server" to get fresh data.`,
              variant: "default",
            });
            return;
          }
        }
      } catch (cacheError) {
        console.error('Error loading from cache:', cacheError);
      }
      
      // If no cache available, show helpful error message
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const isConnectionError = errorMessage.includes('connect') || errorMessage.includes('fetch') || errorMessage.includes('network');
      
      toast({
        title: "Error",
        description: isConnectionError 
          ? "Unable to connect to API server. Please start the server by running: npm run server"
          : `Failed to fetch all listings: ${errorMessage}`,
        variant: "destructive",
      });
      setAllListings([]);
    } finally {
      setIsLoadingAllListings(false);
    }
  };

  const handleViewListing = (listing: any) => {
    // Format listing data for PropertyDetailsModal
    const formattedListing = {
      ...listing,
      id: listing.id,
      title: listing.title,
      address: listing.address,
      city: listing.city,
      state: listing.state,
      zipCode: listing.zipCode,
      price: listing.price ? `$${listing.price.toLocaleString()}` : '$0',
      bedrooms: listing.bedrooms || 0,
      bathrooms: listing.bathrooms || 0,
      sqft: listing.squareFeet || listing.sqft || 0,
      type: listing.propertyType,
      yearBuilt: listing.yearBuilt,
      features: listing.features || [],
      amenities: listing.amenities || [],
      status: listing.status || 'active',
      listingType: listing.listingType || 'rent',
      description: listing.description,
      images: listing.photos && listing.photos.length > 0 
        ? listing.photos.map((p: any) => p.url || p.photo_url || '').filter(Boolean)
        : [],
      image: listing.photos && listing.photos.length > 0 
        ? (listing.photos[0].url || listing.photos[0].photo_url || '')
        : undefined,
      coordinates: listing.latitude && listing.longitude 
        ? { lat: listing.latitude, lng: listing.longitude }
        : listing.coordinates,
      owner: {
        name: listing.ownerName,
        phone: listing.ownerPhone,
        email: listing.ownerEmail
      }
    };
    setViewingListing(formattedListing);
  };

  const handleCloseViewModal = () => {
    setViewingListing(null);
  };

  const propertyTypes = [
    'Single Family Home',
    'Condominium',
    'Townhouse',
    'Multi-Family',
    'Apartment',
    'Studio',
    'Commercial',
    'Land'
  ];

  const features = [
    'Air Conditioning', 'Heating', 'Hardwood Floors', 'Carpet', 'Tile Floors',
    'Fireplace', 'Walk-in Closet', 'Laundry Room', 'Garage', 'Driveway',
    'Pool', 'Garden', 'Balcony', 'Patio', 'Deck', 'Basement', 'Attic'
  ];

  const amenities = [
    'Swimming Pool', 'Gym/Fitness Center', 'Tennis Court', 'Basketball Court',
    'Playground', 'Clubhouse', 'Concierge', 'Security', 'Gated Community',
    'Pet Friendly', 'Parking', 'Storage', 'Elevator', 'Rooftop Access'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Published': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800">
              Property Owner Portal
            </CardTitle>
            <p className="text-slate-600">
              Secure access for property owners only
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Email Address</Label>
                <Input
                  id="username"
                  type="email"
                  placeholder="owner@pittmetro.com"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                />
              </div>
            </div>
            
            <Button 
              onClick={handleLogin}
              className="w-full"
              size="lg"
            >
              <Shield className="h-4 w-4 mr-2" />
              Access Portal
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-slate-500">
                Demo credentials: owner@pittmetro.com / owner123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main Portal
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsAuthenticated(false);
                  setHasInitialFetch(false); // Reset so listings will fetch again on next login
                  setEditingListing(null); // Clear any editing state
                }}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Logout</span>
              </Button>
              <div className="h-6 w-px bg-slate-300" />
              <h1 className="text-2xl font-bold text-slate-800 flex items-center space-x-2">
                <Home className="h-6 w-6 text-primary" />
                <span>Property Owner Portal</span>
              </h1>
            </div>
            <Badge variant="outline" className="text-sm">
              <User className="h-3 w-3 mr-1" />
              Owner Access
            </Badge>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <p className="text-green-800 font-medium">
                Property listing submitted successfully! Our team will review it within 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>List Property</span>
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Manage Listings</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Welcome to Your Property Portal
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Manage your property listings, upload photos, and track your real estate portfolio with Pitt Metro Realty.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Listings</p>
                      <p className="text-2xl font-bold text-slate-800">{submittedListings.length}</p>
                    </div>
                    <Home className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Active Listings</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {submittedListings.filter(l => l.status === 'Published').length}
                      </p>
                    </div>
                    <Eye className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Pending Review</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {submittedListings.filter(l => l.status === 'Pending Review').length}
                      </p>
                    </div>
                    <Save className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Photos</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {submittedListings.reduce((total, listing) => total + listing.photos.length, 0)}
                      </p>
                    </div>
                    <Camera className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="h-5 w-5 text-primary" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab('list')}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    List New Property
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('manage')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View All Listings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Security Notice</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 mb-4">
                    This portal is secured and only accessible to verified property owners. 
                    All data is encrypted and protected.
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Secure Connection Active</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* List Property Tab */}
          <TabsContent value="list" className="space-y-6">
              <Card className="shadow-xl">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-3xl font-bold text-slate-800 flex items-center justify-center space-x-3">
                    <Home className="h-8 w-8 text-primary" />
                    <span>{editingListing ? 'Edit Property Listing' : 'List Your Property'}</span>
                  </CardTitle>
                  <p className="text-slate-600 text-lg">
                    {editingListing 
                      ? 'Update your property details and photos below'
                      : `Create a professional listing with photos to attract potential ${formData.listingType === 'rent' ? 'tenants' : 'buyers'}`}
                  </p>
                </CardHeader>

              <CardContent className="p-8">
                <div className="space-y-8">
                  {/* Listing Type */}
                  <div>
                    <Label className="text-lg font-semibold mb-4 block">Listing Type</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Card 
                        className={`cursor-pointer transition-all ${
                          formData.listingType === 'rent' ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'
                        }`}
                        onClick={() => handleInputChange('listingType', 'rent')}
                      >
                        <CardContent className="p-4 text-center">
                          <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <h3 className="font-semibold">For Rent</h3>
                          <p className="text-sm text-slate-600">Monthly rental listing</p>
                        </CardContent>
                      </Card>
                      <Card 
                        className={`cursor-pointer transition-all ${
                          formData.listingType === 'sell' ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'
                        }`}
                        onClick={() => handleInputChange('listingType', 'sell')}
                      >
                        <CardContent className="p-4 text-center">
                          <Home className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <h3 className="font-semibold">For Sale</h3>
                          <p className="text-sm text-slate-600">Property sale listing</p>
                        </CardContent>
                      </Card>
                      <Card 
                        className={`cursor-pointer transition-all ${
                          formData.listingType === 'buy' ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'
                        }`}
                        onClick={() => handleInputChange('listingType', 'buy')}
                      >
                        <CardContent className="p-4 text-center">
                          <Search className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <h3 className="font-semibold">For Buy</h3>
                          <p className="text-sm text-slate-600">Property purchase listing</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Status Toggle */}
                  <div>
                    <Label className="text-lg font-semibold mb-4 block">Listing Status</Label>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant={formData.status === 'active' ? 'default' : 'outline'}
                        onClick={() => handleInputChange('status', 'active')}
                        className="flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Active
                      </Button>
                      <Button
                        type="button"
                        variant={formData.status === 'inactive' ? 'default' : 'outline'}
                        onClick={() => handleInputChange('status', 'inactive')}
                        className="flex-1"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Inactive
                      </Button>
                    </div>
                    <p className="text-sm text-slate-500 mt-2">
                      {formData.status === 'active' 
                        ? 'This listing will be visible on Buy, Rent, and Sell pages'
                        : 'This listing will be hidden from public view'}
                    </p>
                  </div>

                  {/* Basic Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-800">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <Label htmlFor="title">Property Title *</Label>
                        <Input
                          id="title"
                          placeholder="Beautiful 3BR/2BA Home in Prime Location"
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          className={errors.title ? 'border-red-500' : ''}
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="description">Property Description *</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your property's unique features..."
                          rows={4}
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          className={errors.description ? 'border-red-500' : ''}
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                      </div>

                      <div>
                        <Label htmlFor="address">Street Address *</Label>
                        <Input
                          id="address"
                          placeholder="123 Main Street"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className={errors.address ? 'border-red-500' : ''}
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                      </div>

                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          placeholder="Pittsburgh"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className={errors.city ? 'border-red-500' : ''}
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                      </div>

                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          placeholder="PA"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          className={errors.state ? 'border-red-500' : ''}
                        />
                        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                      </div>

                      <div>
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          placeholder="15213"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          className={errors.zipCode ? 'border-red-500' : ''}
                        />
                        {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-800">Property Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="propertyType">Property Type *</Label>
                        <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                          <SelectTrigger className={errors.propertyType ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            {propertyTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.propertyType && <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>}
                      </div>

                      <div>
                        <Label htmlFor="bedrooms">Bedrooms *</Label>
                        <Input
                          id="bedrooms"
                          type="number"
                          min="0"
                          value={formData.bedrooms}
                          onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value) || 0)}
                          className={errors.bedrooms ? 'border-red-500' : ''}
                        />
                        {errors.bedrooms && <p className="text-red-500 text-sm mt-1">{errors.bedrooms}</p>}
                      </div>

                      <div>
                        <Label htmlFor="bathrooms">Bathrooms *</Label>
                        <Input
                          id="bathrooms"
                          type="number"
                          min="0"
                          step="0.5"
                          value={formData.bathrooms}
                          onChange={(e) => handleInputChange('bathrooms', parseFloat(e.target.value) || 0)}
                          className={errors.bathrooms ? 'border-red-500' : ''}
                        />
                        {errors.bathrooms && <p className="text-red-500 text-sm mt-1">{errors.bathrooms}</p>}
                      </div>

                      <div>
                        <Label htmlFor="squareFeet">Square Feet *</Label>
                        <Input
                          id="squareFeet"
                          type="number"
                          min="0"
                          value={formData.squareFeet}
                          onChange={(e) => handleInputChange('squareFeet', parseInt(e.target.value) || 0)}
                          className={errors.squareFeet ? 'border-red-500' : ''}
                        />
                        {errors.squareFeet && <p className="text-red-500 text-sm mt-1">{errors.squareFeet}</p>}
                      </div>

                      <div>
                        <Label htmlFor="price">Price *</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                          <Input
                            id="price"
                            type="number"
                            min="0"
                            placeholder="0"
                            value={formData.price}
                            onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                            className={`pl-10 ${errors.price ? 'border-red-500' : ''}`}
                          />
                        </div>
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                      </div>

                      <div>
                        <Label htmlFor="availableDate">Available Date</Label>
                        <Input
                          id="availableDate"
                          type="date"
                          value={formData.availableDate}
                          onChange={(e) => handleInputChange('availableDate', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-800">Property Photos</h3>
                    
                    {/* Display existing photos with delete option */}
                    {formData.photos.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                        {formData.photos.map((photo: any, index: number) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden border-2 border-slate-200 bg-slate-100">
                              {photo.url ? (
                                <img
                                  src={photo.url}
                                  alt={photo.name || `Photo ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              ) : photo.file ? (
                                <img
                                  src={URL.createObjectURL(photo.file)}
                                  alt={photo.name || `Photo ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Camera className="h-8 w-8 text-slate-400" />
                                </div>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeletePhoto(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                              title="Delete photo"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            {photo.name && (
                              <p className="text-xs text-slate-600 mt-1 truncate" title={photo.name}>
                                {photo.name}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Photo Upload Component - Only for new photos */}
                    <div className="mt-4">
                      <PhotoUpload
                        photos={formData.photos.filter((p: any) => p.file).map((p: any) => p.file)}
                        onPhotosChange={(newPhotos: File[]) => {
                          console.log('PhotoUpload callback - new photos:', newPhotos.length);
                          handleAddPhotos(newPhotos);
                        }}
                        maxPhotos={9999}
                        maxSizePerPhoto={10}
                      />
                    </div>
                    {errors.photos && <p className="text-red-500 text-sm">{errors.photos}</p>}
                  </div>

                  {/* Owner Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-800">Owner Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="ownerName">Full Name *</Label>
                        <Input
                          id="ownerName"
                          placeholder="John Doe"
                          value={formData.ownerName}
                          onChange={(e) => handleInputChange('ownerName', e.target.value)}
                          className={errors.ownerName ? 'border-red-500' : ''}
                        />
                        {errors.ownerName && <p className="text-red-500 text-sm mt-1">{errors.ownerName}</p>}
                      </div>

                      <div>
                        <Label htmlFor="ownerEmail">Email Address *</Label>
                        <Input
                          id="ownerEmail"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.ownerEmail}
                          onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
                          className={errors.ownerEmail ? 'border-red-500' : ''}
                        />
                        {errors.ownerEmail && <p className="text-red-500 text-sm mt-1">{errors.ownerEmail}</p>}
                      </div>

                      <div>
                        <Label htmlFor="ownerPhone">Phone Number *</Label>
                        <Input
                          id="ownerPhone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.ownerPhone}
                          onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                          className={errors.ownerPhone ? 'border-red-500' : ''}
                        />
                        {errors.ownerPhone && <p className="text-red-500 text-sm mt-1">{errors.ownerPhone}</p>}
                      </div>

                      <div>
                        <Label htmlFor="ownerPreferredContact">Preferred Contact Method</Label>
                        <Select value={formData.ownerPreferredContact} onValueChange={(value) => handleInputChange('ownerPreferredContact', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone">Phone</SelectItem>
                            <SelectItem value="text">Text Message</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Submit/Update Button */}
                  <div className="flex justify-center gap-4 pt-6 border-t flex-wrap">
                    {editingListing && (
                      <>
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={handleCancelEdit}
                          className="min-w-[150px]"
                          disabled={isUpdating}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={async () => {
                            await fetchListings();
                            toast({
                              title: "Refreshed",
                              description: "Listings have been refreshed from the server.",
                            });
                          }}
                          className="min-w-[150px]"
                          disabled={isUpdating || isLoadingListings}
                        >
                          {isLoadingListings ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                              Refreshing...
                            </>
                          ) : (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Refresh
                            </>
                          )}
                        </Button>
                      </>
                    )}
                    <Button
                      size="lg"
                      onClick={editingListing ? handleUpdateListing : handleSubmit}
                      className="min-w-[200px]"
                      disabled={isLoading || isUpdating}
                    >
                      {(isLoading || isUpdating) ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {editingListing ? 'Updating...' : 'Submitting...'}
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          {editingListing ? 'Update Listing' : 'Submit Listing'}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Listings Tab */}
          <TabsContent value="manage" className="space-y-6">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2 sm:mb-3">
                Your Listings
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Manage your property listings from Buy, Rent, and Sell pages. View details, update, or delete listings.
              </p>
              <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
                {submittedListings.length > 0 && (
                  <p className="text-xs sm:text-sm text-slate-500">
                    Total: <span className="font-semibold text-primary">{submittedListings.length}</span> {submittedListings.length === 1 ? 'listing' : 'listings'}
                  </p>
                )}
                {submittedListings.length > 0 && (
                  <p className="text-xs sm:text-sm text-slate-500">
                    Your listings: <span className="font-semibold text-primary">{submittedListings.length}</span>
                  </p>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchListings}
                  disabled={isLoadingListings}
                  className="min-h-[36px]"
                >
                  <Search className="h-4 w-4 mr-2" />
                  {isLoadingListings ? 'Refreshing...' : 'Refresh'}
                </Button>
              </div>
            </div>

            {isLoadingListings ? (
              <Card className="border-2 border-dashed border-slate-200">
                <CardContent className="p-8 sm:p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-sm sm:text-base text-slate-600">Loading listings...</p>
                </CardContent>
              </Card>
            ) : submittedListings.length === 0 ? (
              <Card className="border-2 border-dashed border-slate-200 bg-slate-50/50">
                <CardContent className="p-8 sm:p-12 text-center">
                  <div className="text-slate-400 mb-4">
                    <Home className="mx-auto h-16 w-16 sm:h-20 sm:w-20" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-700 mb-2">
                    No Listings Yet
                  </h3>
                  <p className="text-sm sm:text-base text-slate-500 mb-6">
                    Create your first property listing to get started.
                  </p>
                  <Button onClick={() => setActiveTab('list')} className="min-h-[44px]">
                    <Upload className="h-4 w-4 mr-2" />
                    Create New Listing
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {submittedListings.map((listing) => {
                  const isOwnerListing = listing.ownerEmail === loginData.username;
                  return (
                  <Card 
                    key={listing.id} 
                    className={`overflow-hidden transition-all duration-300 hover:shadow-xl border-2 ${
                      selectedListing?.id === listing.id 
                        ? 'border-primary shadow-lg ring-2 ring-primary/20' 
                        : 'border-slate-200 hover:border-primary/50'
                    }`}
                  >
                    <CardContent className="p-0">
                      {/* Photo Section */}
                      <div className="relative group">
                        {listing.photos && listing.photos.length > 0 ? (
                          <div className="h-48 sm:h-56 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
                            <img
                              src={listing.photos[0].url || listing.photos[0].photo_url}
                              alt={listing.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <div className="hidden absolute inset-0 flex items-center justify-center bg-slate-100">
                              <Home className="h-12 w-12 text-slate-400" />
                            </div>
                          </div>
                        ) : (
                          <div className="h-48 sm:h-56 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                            <Home className="h-12 w-12 sm:h-16 sm:w-16 text-slate-400" />
                          </div>
                        )}
                        
                        {/* Status Badge Overlay */}
                        <div className="absolute top-2 right-2">
                          <Badge className={`${getStatusColor(listing.status)} shadow-lg backdrop-blur-sm`}>
                            {listing.status || 'Draft'}
                          </Badge>
                        </div>
                        
                        {/* Photo Count Badge */}
                        {listing.photos && listing.photos.length > 0 && (
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-black/60 text-white backdrop-blur-sm">
                              <Camera className="h-3 w-3 mr-1" />
                              {listing.photos.length}
                            </Badge>
                          </div>
                        )}
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-4 sm:p-5">
                        <div className="mb-3">
                          <h3 className="font-bold text-base sm:text-lg text-slate-800 line-clamp-2 mb-1.5">
                            {listing.title || 'Untitled Listing'}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-2">
                            {listing.description || 'No description available'}
                          </p>
                        </div>
                        
                        {/* Key Details */}
                        <div className="space-y-2 mb-4 pb-4 border-b border-slate-200">
                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <div className="flex items-center text-slate-600">
                              <MapPin className="h-3 w-3 mr-1.5 flex-shrink-0" />
                              <span className="truncate">Address</span>
                            </div>
                            <span className="font-semibold text-slate-800 text-right ml-2 truncate">
                              {listing.address || 'N/A'}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <div className="flex items-center text-slate-600">
                              <DollarSign className="h-3 w-3 mr-1.5 flex-shrink-0" />
                              <span>Price</span>
                            </div>
                            <span className="font-bold text-primary">
                              ${(listing.price || 0).toLocaleString()}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                            <div className="flex items-center text-slate-600">
                              <Bed className="h-3 w-3 mr-1.5 flex-shrink-0" />
                              <span>{listing.bedrooms || 0} Bed</span>
                            </div>
                            <div className="flex items-center text-slate-600">
                              <Bath className="h-3 w-3 mr-1.5 flex-shrink-0" />
                              <span>{listing.bathrooms || 0} Bath</span>
                            </div>
                          </div>
                          
                          {listing.propertyType && (
                            <div className="flex items-center justify-between text-xs sm:text-sm">
                              <span className="text-slate-600">Type</span>
                              <span className="font-medium text-slate-800">{listing.propertyType}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="space-y-2">
                          <Button
                            variant="default"
                            size="sm"
                            className="w-full min-h-[40px] bg-primary hover:bg-primary/90"
                            onClick={() => handleViewListing(listing)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          
                          {isOwnerListing && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full min-h-[40px] border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                                onClick={() => handleSelectListing(listing)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Listing
                              </Button>
                              
                              {deleteConfirmId === listing.id ? (
                                <div className="flex gap-2">
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    className="flex-1 min-h-[40px]"
                                    onClick={() => handleDeleteListing(listing.id)}
                                    disabled={isDeleting === listing.id}
                                  >
                                    {isDeleting === listing.id ? (
                                      <>
                                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                                        Deleting...
                                      </>
                                    ) : (
                                      <>
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Confirm Delete
                                      </>
                                    )}
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 min-h-[40px]"
                                    onClick={() => setDeleteConfirmId(null)}
                                    disabled={isDeleting === listing.id}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full min-h-[40px] border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                  onClick={() => setDeleteConfirmId(listing.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Listing
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                        
                        {/* Submission Date */}
                        {(listing.submittedAt || listing.createdAt) && (
                          <div className="mt-3 pt-3 border-t border-slate-200">
                            <p className="text-xs text-slate-500 text-center">
                              Submitted: {new Date(listing.submittedAt || listing.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Property Details Modal */}
        {viewingListing && (
          <PropertyDetailsModal
            property={viewingListing}
            open={!!viewingListing}
            onClose={handleCloseViewModal}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyOwnerPortal;
