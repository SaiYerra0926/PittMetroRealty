// Property Listings API Client
interface PropertyListing {
  id?: string;
  // Basic Information
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Property Details
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt?: number;
  lotSize?: number;
  
  // Pricing
  price: number;
  listingType: 'rent' | 'sell' | 'buy'; // 'rent', 'sell', or 'buy'
  
  // Features & Amenities
  features: string[];
  amenities: string[];
  
  // Additional Info
  status: 'Draft' | 'Pending Review' | 'Approved' | 'Rejected' | 'Published';
  availableDate?: string;
  photos: Array<{
    id?: number;
    name: string;
    url: string;
    size?: number;
    file?: File;
  }>;
  
  // Owner Information
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerPreferredContact?: 'email' | 'phone' | 'text';
  
  // Metadata
  submittedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PropertyListingsResponse {
  listings: PropertyListing[];
  total: number;
}

interface PropertyListingStats {
  totalListings: number;
  publishedListings: number;
  pendingListings: number;
  approvedListings: number;
}

export class PropertiesAPI {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    // Use environment variable if available, otherwise fallback to localhost for development
    this.baseUrl = baseUrl || import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  }

  /**
   * Test API server connection
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl.replace('/api', '')}/api/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  private async fetchData<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `API error: ${response.statusText}` }));
        throw new Error(errorData.message || `API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      // Handle network errors (e.g., server not running, CORS, connection refused)
      if (error instanceof TypeError && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
        console.error(`Network error fetching from ${url}:`, error.message);
        
        // Provide more helpful error message
        const isLocalhost = this.baseUrl.includes('localhost') || this.baseUrl.includes('127.0.0.1');
        const errorMessage = isLocalhost
          ? `Unable to connect to API server at ${this.baseUrl}. Please ensure the server is running with "npm run server" or "npm start".`
          : `Unable to connect to API server at ${this.baseUrl}. Please check your network connection and ensure the server is running.`;
        
        throw new Error(errorMessage);
      }
      
      // Re-throw if it's already an Error with a message
      if (error instanceof Error) {
        throw error;
      }
      
      console.error(`Error fetching from ${url}:`, error);
      throw new Error(`An unexpected error occurred: ${String(error)}`);
    }
  }

  /**
   * Get all property listings (with optional filters)
   */
  async getProperties(filters?: {
    status?: string;
    listingType?: 'rent' | 'sell' | 'buy';
    ownerEmail?: string;
    limit?: number;
    offset?: number;
  }): Promise<PropertyListingsResponse> {
    try {
      const queryParams = new URLSearchParams();
      if (filters?.status) queryParams.append('status', filters.status);
      if (filters?.listingType) queryParams.append('listingType', filters.listingType);
      if (filters?.ownerEmail) queryParams.append('ownerEmail', filters.ownerEmail);
      if (filters?.limit) queryParams.append('limit', filters.limit.toString());
      if (filters?.offset) queryParams.append('offset', filters.offset.toString());

      const endpoint = `/properties${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const data = await this.fetchData<{ success: boolean; listings: PropertyListing[]; total: number } | PropertyListingsResponse>(endpoint);
      
      // Normalize response format
      const normalizedData = 'listings' in data ? data : { listings: (data as any).data || [], total: (data as any).count || (data as any).total || 0 };
      
      // Cache to localStorage
      localStorage.setItem('properties', JSON.stringify(normalizedData.listings));
      return normalizedData;
    } catch (error) {
      console.warn("Failed to fetch properties from API, attempting to load from localStorage.");
      const localProperties = localStorage.getItem('properties');
      if (localProperties) {
        return { listings: JSON.parse(localProperties), total: JSON.parse(localProperties).length };
      }
      throw error;
    }
  }

  /**
   * Get a single property by ID
   */
  async getProperty(id: string): Promise<PropertyListing> {
    try {
      const data = await this.fetchData<{ listing: PropertyListing }>(`/properties/${id}`);
      return data.listing;
    } catch (error) {
      console.warn("Failed to fetch property from API, attempting to load from localStorage.");
      const localProperties = localStorage.getItem('properties');
      if (localProperties) {
        const properties = JSON.parse(localProperties);
        const property = properties.find((p: PropertyListing) => p.id === id);
        if (property) return property;
      }
      throw error;
    }
  }

  /**
   * Create a new property listing
   */
  async createProperty(listingData: Omit<PropertyListing, 'id' | 'submittedAt' | 'createdAt' | 'updatedAt'>): Promise<PropertyListing> {
    try {
      // Convert File objects to base64 for API submission
      const processedData = {
        ...listingData,
        photos: await Promise.all(
          listingData.photos.map(async (photo) => {
            if (photo.file) {
              // Convert file to base64
              const base64 = await this.fileToBase64(photo.file);
              return {
                name: photo.name,
                url: base64,
                size: photo.size,
                isBase64: true,
              };
            }
            return photo;
          })
        ),
      };

      const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify(processedData),
      };

      const result = await this.fetchData<{ success: boolean; message: string; listing: PropertyListing }>('/properties', options);
      
      // Invalidate cache after creating a new listing
      localStorage.removeItem('properties');
      localStorage.removeItem('propertyStats');
      localStorage.removeItem('owner_listings');
      
      // Normalize the listing data
      const listing = result.listing || result as any;
      return {
        ...listing,
        photos: Array.isArray(listing.photos) ? listing.photos : [],
        features: Array.isArray(listing.features) ? listing.features : [],
        amenities: Array.isArray(listing.amenities) ? listing.amenities : []
      };
    } catch (error) {
      console.error("Failed to create property:", error);
      throw error;
    }
  }

  /**
   * Update an existing property listing
   */
  async updateProperty(id: string, listingData: Partial<PropertyListing>): Promise<PropertyListing> {
    try {
      const options: RequestInit = {
        method: 'PUT',
        body: JSON.stringify(listingData),
      };

      const result = await this.fetchData<{ success: boolean; message: string; data: PropertyListing }>(`/properties/${id}`, options);
      
      // Invalidate cache
      localStorage.removeItem('properties');
      localStorage.removeItem('propertyStats');
      localStorage.removeItem('owner_listings');
      
      // Normalize the listing data
      const listing = result.data || result as any;
      return {
        ...listing,
        photos: Array.isArray(listing.photos) ? listing.photos.map((p: any) => ({
          id: p.id,
          name: p.name || p.photo_name || '',
          url: p.url || p.photo_url || '',
          size: p.size || p.photo_size || 0
        })) : [],
        features: Array.isArray(listing.features) ? listing.features : [],
        amenities: Array.isArray(listing.amenities) ? listing.amenities : []
      };
    } catch (error) {
      console.error("Failed to update property:", error);
      throw error;
    }
  }

  /**
   * Delete a property listing
   */
  async deleteProperty(id: string): Promise<void> {
    try {
      const options: RequestInit = {
        method: 'DELETE',
      };

      await this.fetchData<{ success: boolean; message: string }>(`/properties/${id}`, options);
      
      // Invalidate cache
      localStorage.removeItem('properties');
      localStorage.removeItem('propertyStats');
      localStorage.removeItem('owner_listings');
    } catch (error) {
      console.error("Failed to delete property:", error);
      throw error;
    }
  }

  /**
   * Get property listing statistics
   */
  async getPropertyStats(ownerEmail?: string): Promise<PropertyListingStats> {
    try {
      const endpoint = ownerEmail ? `/properties/stats?ownerEmail=${ownerEmail}` : '/properties/stats';
      const data = await this.fetchData<PropertyListingStats>(endpoint);
      localStorage.setItem('propertyStats', JSON.stringify(data));
      return data;
    } catch (error) {
      console.warn("Failed to fetch property stats from API, attempting to load from localStorage.");
      const localStats = localStorage.getItem('propertyStats');
      if (localStats) {
        return JSON.parse(localStats);
      }
      // Return default stats if nothing is cached
      return {
        totalListings: 0,
        publishedListings: 0,
        pendingListings: 0,
        approvedListings: 0,
      };
    }
  }

  /**
   * Get properties by owner email
   */
  async getPropertiesByOwner(ownerEmail: string): Promise<PropertyListingsResponse> {
    try {
      const endpoint = `/properties/owner?ownerEmail=${encodeURIComponent(ownerEmail)}`;
      const data = await this.fetchData<{ success: boolean; listings: PropertyListing[]; total: number }>(endpoint);
      
      // Cache to localStorage
      if (data.listings && data.listings.length > 0) {
        localStorage.setItem('owner_listings', JSON.stringify(data.listings));
      }
      
      return { listings: data.listings || [], total: data.total || 0 };
    } catch (error) {
      console.warn("Failed to fetch properties by owner from API, attempting to load from localStorage.");
      const localProperties = localStorage.getItem('owner_listings');
      if (localProperties) {
        const parsed = JSON.parse(localProperties);
        return { listings: Array.isArray(parsed) ? parsed : [], total: Array.isArray(parsed) ? parsed.length : 0 };
      }
      throw error;
    }
  }

  /**
   * Get published properties (for public display)
   */
  async getPublishedProperties(listingType?: 'rent' | 'sell' | 'buy'): Promise<PropertyListingsResponse> {
    return this.getProperties({ status: 'Published', listingType });
  }

  /**
   * Helper method to convert File to base64
   */
  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  /**
   * Helper method to convert base64 to File (for retrieval)
   */
  base64ToFile(base64: string, filename: string, mimeType: string = 'image/jpeg'): File {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || mimeType;
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
}

export type { PropertyListing, PropertyListingsResponse, PropertyListingStats };

