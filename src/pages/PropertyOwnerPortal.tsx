import React, { useState, useEffect } from 'react';
import { Home, Upload, Eye, Save, ArrowLeft, CheckCircle, Lock, User, Shield, Camera, DollarSign, MapPin, Bed, Bath, Edit, Trash2, X } from 'lucide-react';
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
    
    // Property Details
    propertyType: '',
    bedrooms: 0,
    bathrooms: 0,
    squareFeet: 0,
    yearBuilt: new Date().getFullYear(),
    lotSize: 0,
    
    // Pricing
    price: 0,
    listingType: 'rent', // 'rent' or 'sell'
    
    // Features & Amenities
    features: [] as string[],
    amenities: [] as string[],
    
    // Additional Info
    status: 'Draft',
    availableDate: '',
    photos: [] as File[],
    
    // Owner Information
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    ownerPreferredContact: 'email'
  });

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

  // Fetch listings when authenticated
  useEffect(() => {
    if (isAuthenticated && loginData.username) {
      fetchListings();
    }
  }, [isAuthenticated, loginData.username]);

  const fetchListings = async () => {
    setIsLoadingListings(true);
    try {
      const response = await propertiesApi.getPropertiesByOwner(loginData.username);
      setSubmittedListings(response.listings || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast({
        title: "Error",
        description: "Failed to load your listings. Please try again.",
        variant: "destructive",
      });
      // Fallback to localStorage if available
      const localListings = localStorage.getItem('owner_listings');
      if (localListings) {
        setSubmittedListings(JSON.parse(localListings));
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
        status: 'Pending Review' as const,
        availableDate: formData.availableDate || undefined,
        photos: formData.photos.map((file: File, index: number) => ({
          id: index,
          name: file.name,
          url: '', // Will be set by API after upload
          size: file.size,
          file: file
        })),
        ownerName: formData.ownerName,
        ownerEmail: formData.ownerEmail,
        ownerPhone: formData.ownerPhone,
        ownerPreferredContact: formData.ownerPreferredContact || 'email'
      };

      // Submit to API
      const newListing = await propertiesApi.createProperty(listingData);
      
      // Refresh listings
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
      status: listing.status || 'Draft',
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
      await propertiesApi.updateProperty(editingListing.id, updatedData);
      
      // Refresh listings
      await fetchListings();
      
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
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos.map((file, index) => ({
        id: prev.photos.length + index,
        name: file.name,
        url: '',
        size: file.size,
        file: file
      }))]
    }));
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
                onClick={() => setIsAuthenticated(false)}
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
                    <div className="grid grid-cols-2 gap-4">
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
                    </div>
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
                    
                    {/* Photo Upload Component */}
                    <PhotoUpload
                      photos={formData.photos.filter((p: any) => p.file)}
                      onPhotosChange={(photos) => handleAddPhotos(photos)}
                      maxPhotos={20}
                      maxSizePerPhoto={10}
                    />
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
                  <div className="flex justify-center gap-4 pt-6 border-t">
                    {editingListing && (
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
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Manage Your Listings
              </h2>
              <p className="text-slate-600 text-lg">
                View and manage all your property listings
              </p>
            </div>

            {isLoadingListings ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-slate-600">Loading your listings...</p>
                </CardContent>
              </Card>
            ) : submittedListings.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-slate-400 mb-4">
                    <Home className="mx-auto h-12 w-12" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-600 mb-2">
                    No Listings Yet
                  </h3>
                  <p className="text-slate-500 mb-4">
                    Create your first property listing to get started.
                  </p>
                  <Button onClick={() => setActiveTab('list')}>
                    Create New Listing
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {submittedListings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      {listing.photos.length > 0 ? (
                        <div className="h-48 bg-slate-100 flex items-center justify-center">
                          <img
                            src={listing.photos[0].url}
                            alt={listing.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-48 bg-slate-100 flex items-center justify-center">
                          <Home className="h-12 w-12 text-slate-400" />
                        </div>
                      )}
                      
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-slate-800 line-clamp-2">
                            {listing.title}
                          </h3>
                          <Badge className={getStatusColor(listing.status)}>
                            {listing.status}
                          </Badge>
                        </div>
                        
                        <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                          {listing.description}
                        </p>
                        
                        <div className="space-y-2 text-sm text-slate-600">
                          <div className="flex justify-between">
                            <span>Address:</span>
                            <span className="font-medium">{listing.address}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Price:</span>
                            <span className="font-medium text-primary">
                              ${(listing.price || 0).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Type:</span>
                            <span className="font-medium">{listing.propertyType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Bedrooms:</span>
                            <span className="font-medium">{listing.bedrooms}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Bathrooms:</span>
                            <span className="font-medium">{listing.bathrooms}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Photos:</span>
                            <span className="font-medium">{listing.photos.length}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex justify-between text-xs text-slate-500 mb-3">
                            <span>Submitted:</span>
                            <span>{listing.submittedAt ? new Date(listing.submittedAt).toLocaleDateString() : 'N/A'}</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => handleEditListing(listing)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Listing
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PropertyOwnerPortal;
