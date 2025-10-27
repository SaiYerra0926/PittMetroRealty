import { useState, useEffect } from "react";
import { Bookmark, Search, Bell, Mail, Calendar, MapPin, DollarSign, Home, Bed, Bath, Car, Star, Edit, Trash2, Share2, Eye, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useWorkflow } from "@/contexts/WorkflowContext";

interface BookmarkSearchProps {
  currentFilters?: any;
  onBookmark?: (searchData: any) => void;
}

const BookmarkSearch = ({ currentFilters, onBookmark }: BookmarkSearchProps) => {
  const { state, actions } = useWorkflow();
  const [isOpen, setIsOpen] = useState(false);
  const [searchData, setSearchData] = useState({
    name: "",
    description: "",
    emailNotifications: true,
    frequency: "daily"
  });

  const [savedSearches, setBookmarkdSearches] = useState(state.savedSearches);

  const notificationFrequencies = [
    { value: "immediate", label: "Immediate" },
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" }
  ];

  const handleBookmark = () => {
    actions.saveSearch({
      name: searchData.name,
      description: searchData.description,
      notifications: searchData.emailNotifications,
      frequency: searchData.frequency as any
    });
    setIsOpen(false);
    if (onBookmark) onBookmark(searchData);
  };

  const handleDelete = (id: string) => {
    actions.deleteSearch(id);
  };

  const handleEdit = (search: any) => {
    setSearchData({
      name: search.name,
      description: search.description,
      emailNotifications: search.notifications,
      frequency: search.frequency
    });
    setIsOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Bookmark Search Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-12">
            <Bookmark className="h-4 w-4 mr-2" />
            Bookmark Search
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bookmark className="h-5 w-5" />
              Bookmark Your Search
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Search Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Search Name *
              </label>
              <Input
                placeholder="e.g., Downtown Condos Under $500K"
                value={searchData.name}
                onChange={(e) => setSearchData(prev => ({ ...prev, name: e.target.value }))}
                className="h-12"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <Textarea
                placeholder="Describe what you're looking for..."
                value={searchData.description}
                onChange={(e) => setSearchData(prev => ({ ...prev, description: e.target.value }))}
                className="min-h-[80px]"
              />
            </div>

            {/* Current Search Criteria */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Search Criteria</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {searchData.priceMin && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Min Price:</span>
                      <span className="font-medium">${searchData.priceMin}</span>
                    </div>
                  )}
                  {searchData.priceMax && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Max Price:</span>
                      <span className="font-medium">${searchData.priceMax}</span>
                    </div>
                  )}
                  {searchData.bedrooms && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Bedrooms:</span>
                      <span className="font-medium">{searchData.bedrooms}</span>
                    </div>
                  )}
                  {searchData.bathrooms && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Bathrooms:</span>
                      <span className="font-medium">{searchData.bathrooms}</span>
                    </div>
                  )}
                  {searchData.propertyType && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Property Type:</span>
                      <span className="font-medium">{searchData.propertyType}</span>
                    </div>
                  )}
                  {searchData.location && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Location:</span>
                      <span className="font-medium">{searchData.location}</span>
                    </div>
                  )}
                </div>
                
                {searchData.amenities.length > 0 && (
                  <div>
                    <span className="text-slate-600 text-sm">Amenities:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {searchData.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="emailNotifications"
                    checked={searchData.emailNotifications}
                    onCheckedChange={(checked) => setSearchData(prev => ({ ...prev, emailNotifications: checked as boolean }))}
                  />
                  <label htmlFor="emailNotifications" className="text-sm font-medium">
                    Email me when new properties match this search
                  </label>
                </div>
                
                {searchData.emailNotifications && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Notification Frequency
                    </label>
                    <Select value={searchData.frequency} onValueChange={(value) => setSearchData(prev => ({ ...prev, frequency: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {notificationFrequencies.map((freq) => (
                          <SelectItem key={freq.value} value={freq.value}>
                            {freq.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleBookmark} disabled={!searchData.name}>
                <Bookmark className="h-4 w-4 mr-2" />
                Bookmark Search
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bookmarkd Searches */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">Your Bookmarkd Searches</h3>
        
        {state.savedSearches.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No Bookmarkd Searches</h3>
              <p className="text-slate-600 mb-4">
                Bookmark your search criteria to get notified when new properties match your requirements.
              </p>
              <Button onClick={() => setIsOpen(true)}>
                <Bookmark className="h-4 w-4 mr-2" />
                Bookmark Your First Search
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {state.savedSearches.map((search) => (
              <Card key={search.id} className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-semibold text-slate-800">
                          {search.name}
                        </h4>
                        {search.newResults > 0 && (
                          <Badge className="bg-green-500 text-white">
                            {search.newResults} New
                          </Badge>
                        )}
                      </div>
                      <p className="text-slate-600 text-sm mb-3">
                        {search.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Created {search.created}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {search.results} Properties
                        </div>
                        {search.notifications && (
                          <div className="flex items-center gap-1">
                            <Bell className="h-3 w-3" />
                            {search.frequency} alerts
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(search)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(search.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Search Criteria */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    {Object.entries(search.criteria).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-slate-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="font-medium text-slate-800">
                          {Array.isArray(value) ? value.join(', ') : value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="flex-1">
                      <Search className="h-4 w-4 mr-2" />
                      View Results
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkSearch;
