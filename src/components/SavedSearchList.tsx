"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, Trash2, Calendar } from 'lucide-react';
import { useSavedSearches, deleteSavedSearch } from '@/lib/api';
import { useMapStore } from '@/stores/mapStore';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

type SavedSearchListProps = {
  onSearchLoad?: () => void;
};

export function SavedSearchList({ onSearchLoad }: SavedSearchListProps) {
  const { savedSearches, isLoading, mutate } = useSavedSearches();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  const { setBounds, setFilters, setCenter, setSelectedCity } = useMapStore();

  const handleLoadSearch = (search: any) => {
    // Set filters
    if (search.filters) {
      setFilters(search.filters);
    }

    // Set city
    if (search.city) {
      setSelectedCity(search.city);
    }

    // Set bounds or fly to city
    if (search.bounds) {
      setBounds(search.bounds);
      // Fly to center of bounds
      const centerLat = (search.bounds.sw_lat + search.bounds.ne_lat) / 2;
      const centerLng = (search.bounds.sw_lng + search.bounds.ne_lng) / 2;
      setCenter({
        lat: centerLat,
        lng: centerLng,
        zoom: 12,
      });
    }

    toast.success(`Loaded search: ${search.name}`);
    onSearchLoad?.();
  };

  const handleDeleteSearch = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    setDeletingId(id);

    try {
      await deleteSavedSearch(id);
      toast.success('Search deleted successfully');
      mutate(); // Refresh the list
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete search');
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (savedSearches.length === 0) {
    return (
      <div className="text-center py-12">
        <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
          No Saved Searches
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Save your favorite searches to quickly find properties later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {savedSearches.map((search) => (
        <Card key={search.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 truncate">
                  {search.name}
                </h3>
                
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {search.city && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="truncate">{search.city}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1.5 text-xs">
                    <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>
                      Saved {formatDistanceToNow(new Date(search.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  
                  {search.filters && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {search.filters.minPrice && (
                        <span className="inline-block px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                          ${search.filters.minPrice.toLocaleString()}+
                        </span>
                      )}
                      {search.filters.beds && (
                        <span className="inline-block px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                          {search.filters.beds}+ beds
                        </span>
                      )}
                      {search.filters.baths && (
                        <span className="inline-block px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                          {search.filters.baths}+ baths
                        </span>
                      )}
                      {search.filters.propertyType && (
                        <span className="inline-block px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                          {search.filters.propertyType}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => handleLoadSearch(search)}
                >
                  Load
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteSearch(search.id, search.name)}
                  disabled={deletingId === search.id}
                >
                  {deletingId === search.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 text-red-500" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

