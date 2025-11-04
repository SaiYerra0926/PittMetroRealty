import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Workflow State Types
export interface SearchFilters {
  // Basic Filters
  location: string;
  priceMin: number;
  priceMax: number;
  bedrooms: string;
  bathrooms: string;
  propertyType: string;
  sqftMin: string;
  sqftMax: string;
  
  // Advanced Filters
  yearBuiltMin: string;
  yearBuiltMax: string;
  lotSizeMin: string;
  lotSizeMax: string;
  parkingSpaces: string;
  garageType: string;
  
  // Location Filters
  neighborhood: string;
  schoolDistrict: string;
  zipCode: string;
  
  // Amenities
  amenities: string[];
  
  // Property Features
  features: string[];
  
  // Market Filters
  daysOnMarket: string;
  priceReduction: boolean;
  newListing: boolean;
  openHouse: boolean;
  
  // Investment Filters
  rentalYield: string;
  capRate: string;
  hoaFees: string;
  
  // Accessibility
  accessibility: string[];
}

export interface SavedSearch {
  id: string;
  name: string;
  description: string;
  filters: SearchFilters;
  created: string;
  lastNotification: string;
  results: number;
  newResults: number;
  notifications: boolean;
  frequency: 'immediate' | 'daily' | 'weekly' | 'monthly';
  isActive: boolean;
}

export interface WorkflowState {
  // Current Search State
  currentFilters: SearchFilters;
  searchResults: any[];
  totalResults: number;
  isLoading: boolean;
  
  // Saved Searches
  savedSearches: SavedSearch[];
  
  // Map State
  mapView: 'satellite' | 'street' | 'terrain';
  selectedProperty: any | null;
  mapBounds: any;
  
  // Workflow Progress
  workflowStep: 'search' | 'filter' | 'map' | 'save' | 'results';
  workflowProgress: number;
  
  // UI State
  showAdvancedFilters: boolean;
  showMapView: boolean;
  showSaveDialog: boolean;
}

export interface WorkflowActions {
  // Filter Actions
  updateFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  applyFilters: () => void;
  
  // Search Actions
  performSearch: () => Promise<void>;
  saveSearch: (searchData: Partial<SavedSearch>) => void;
  deleteSearch: (searchId: string) => void;
  updateSearch: (searchId: string, updates: Partial<SavedSearch>) => void;
  
  // Map Actions
  setMapView: (view: 'satellite' | 'street' | 'terrain') => void;
  selectProperty: (property: any) => void;
  updateMapBounds: (bounds: any) => void;
  
  // Workflow Actions
  setWorkflowStep: (step: 'search' | 'filter' | 'map' | 'save' | 'results') => void;
  nextWorkflowStep: () => void;
  previousWorkflowStep: () => void;
  
  // UI Actions
  toggleAdvancedFilters: () => void;
  toggleMapView: () => void;
  toggleSaveDialog: () => void;
}

const defaultFilters: SearchFilters = {
  location: '',
  priceMin: 0,
  priceMax: 2000000,
  bedrooms: '',
  bathrooms: '',
  propertyType: '',
  sqftMin: '',
  sqftMax: '',
  yearBuiltMin: '',
  yearBuiltMax: '',
  lotSizeMin: '',
  lotSizeMax: '',
  parkingSpaces: '',
  garageType: '',
  neighborhood: '',
  schoolDistrict: '',
  zipCode: '',
  amenities: [],
  features: [],
  daysOnMarket: '',
  priceReduction: false,
  newListing: false,
  openHouse: false,
  rentalYield: '',
  capRate: '',
  hoaFees: '',
  accessibility: []
};

const defaultWorkflowState: WorkflowState = {
  currentFilters: defaultFilters,
  searchResults: [],
  totalResults: 0,
  isLoading: false,
  savedSearches: [],
  mapView: 'satellite',
  selectedProperty: null,
  mapBounds: null,
  workflowStep: 'search',
  workflowProgress: 0,
  showAdvancedFilters: false,
  showMapView: false,
  showSaveDialog: false
};

// Create Context
const WorkflowContext = createContext<{
  state: WorkflowState;
  actions: WorkflowActions;
} | null>(null);

// Provider Component
export const WorkflowProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<WorkflowState>(defaultWorkflowState);

  // Load saved searches from localStorage on mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('realEstateSavedSearches');
    if (savedSearches) {
      setState(prev => ({
        ...prev,
        savedSearches: JSON.parse(savedSearches)
      }));
    }
  }, []);

  // Save searches to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('realEstateSavedSearches', JSON.stringify(state.savedSearches));
  }, [state.savedSearches]);

  const actions: WorkflowActions = {
    // Filter Actions
    updateFilters: (filters: Partial<SearchFilters>) => {
      setState(prev => ({
        ...prev,
        currentFilters: { 
          ...prev.currentFilters, 
          ...filters,
          // Ensure arrays are never undefined
          amenities: filters.amenities !== undefined ? filters.amenities : (prev.currentFilters.amenities || []),
          features: filters.features !== undefined ? filters.features : (prev.currentFilters.features || []),
          accessibility: filters.accessibility !== undefined ? filters.accessibility : (prev.currentFilters.accessibility || [])
        },
        workflowProgress: Math.min(100, prev.workflowProgress + 10)
      }));
    },

    resetFilters: () => {
      setState(prev => ({
        ...prev,
        currentFilters: defaultFilters,
        workflowProgress: 0
      }));
    },

    applyFilters: () => {
      setState(prev => ({
        ...prev,
        isLoading: true,
        workflowStep: 'results',
        workflowProgress: 80
      }));
      
      // Simulate API call
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          isLoading: false,
          workflowProgress: 100,
          totalResults: Math.floor(Math.random() * 50) + 10
        }));
      }, 1000);
    },

    // Search Actions
    performSearch: async () => {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        workflowStep: 'results',
        workflowProgress: 100
      }));
    },

    saveSearch: (searchData: Partial<SavedSearch>) => {
      const newSearch: SavedSearch = {
        id: Date.now().toString(),
        name: searchData.name || 'Untitled Search',
        description: searchData.description || '',
        filters: state.currentFilters,
        created: new Date().toISOString().split('T')[0],
        lastNotification: new Date().toISOString().split('T')[0],
        results: Math.floor(Math.random() * 20) + 5,
        newResults: Math.floor(Math.random() * 5),
        notifications: searchData.notifications || false,
        frequency: searchData.frequency || 'daily',
        isActive: true,
        ...searchData
      };

      setState(prev => ({
        ...prev,
        savedSearches: [newSearch, ...prev.savedSearches],
        showSaveDialog: false,
        workflowStep: 'save'
      }));
    },

    deleteSearch: (searchId: string) => {
      setState(prev => ({
        ...prev,
        savedSearches: prev.savedSearches.filter(search => search.id !== searchId)
      }));
    },

    updateSearch: (searchId: string, updates: Partial<SavedSearch>) => {
      setState(prev => ({
        ...prev,
        savedSearches: prev.savedSearches.map(search =>
          search.id === searchId ? { ...search, ...updates } : search
        )
      }));
    },

    // Map Actions
    setMapView: (view: 'satellite' | 'street' | 'terrain') => {
      setState(prev => ({
        ...prev,
        mapView: view
      }));
    },

    selectProperty: (property: any) => {
      setState(prev => ({
        ...prev,
        selectedProperty: property
      }));
    },

    updateMapBounds: (bounds: any) => {
      setState(prev => ({
        ...prev,
        mapBounds: bounds
      }));
    },

    // Workflow Actions
    setWorkflowStep: (step: 'search' | 'filter' | 'map' | 'save' | 'results') => {
      const progressMap = {
        search: 0,
        filter: 25,
        map: 50,
        save: 75,
        results: 100
      };

      setState(prev => ({
        ...prev,
        workflowStep: step,
        workflowProgress: progressMap[step]
      }));
    },

    nextWorkflowStep: () => {
      const stepOrder = ['search', 'filter', 'map', 'save', 'results'];
      const currentIndex = stepOrder.indexOf(state.workflowStep);
      if (currentIndex < stepOrder.length - 1) {
        const nextStep = stepOrder[currentIndex + 1] as any;
        actions.setWorkflowStep(nextStep);
      }
    },

    previousWorkflowStep: () => {
      const stepOrder = ['search', 'filter', 'map', 'save', 'results'];
      const currentIndex = stepOrder.indexOf(state.workflowStep);
      if (currentIndex > 0) {
        const prevStep = stepOrder[currentIndex - 1] as any;
        actions.setWorkflowStep(prevStep);
      }
    },

    // UI Actions
    toggleAdvancedFilters: () => {
      setState(prev => ({
        ...prev,
        showAdvancedFilters: !prev.showAdvancedFilters,
        workflowStep: prev.showAdvancedFilters ? 'search' : 'filter'
      }));
    },

    toggleMapView: () => {
      setState(prev => ({
        ...prev,
        showMapView: !prev.showMapView,
        workflowStep: prev.showMapView ? 'search' : 'map'
      }));
    },

    toggleSaveDialog: () => {
      setState(prev => ({
        ...prev,
        showSaveDialog: !prev.showSaveDialog,
        workflowStep: prev.showSaveDialog ? 'search' : 'save'
      }));
    }
  };

  return (
    <WorkflowContext.Provider value={{ state, actions }}>
      {children}
    </WorkflowContext.Provider>
  );
};

// Custom Hook
export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};

export default WorkflowProvider;

