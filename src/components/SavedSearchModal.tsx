"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMapStore } from "@/stores/mapStore";
import { saveSearch } from "@/lib/api";
import { toast } from "sonner";

interface SavedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: () => void;
}

export function SavedSearchModal({
  isOpen,
  onClose,
  onSaved,
}: SavedSearchModalProps) {
  const [searchName, setSearchName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { bounds, filters, selectedCity } = useMapStore();

  const handleSave = async () => {
    if (!searchName.trim()) {
      toast.error("Please enter a name for this search");
      return;
    }

    setIsSaving(true);

    try {
      await saveSearch(
        searchName.trim(),
        bounds,
        filters,
        selectedCity
      );

      toast.success("Search saved successfully!");
      setSearchName("");
      onSaved?.();
      onClose();
    } catch (error) {
      console.error("Failed to save search:", error);
      toast.error("Failed to save search. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Search</DialogTitle>
          <DialogDescription>
            Save your current search criteria and map location for quick access later.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Input
            placeholder="e.g., Beachfront villas in Lagos"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave();
              }
            }}
            autoFocus
          />
          
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="space-y-1">
              {selectedCity && (
                <div>📍 Location: <span className="font-medium">{selectedCity}</span></div>
              )}
              {filters.minPrice && (
                <div>💰 Min Price: <span className="font-medium">€{filters.minPrice.toLocaleString()}</span></div>
              )}
              {filters.maxPrice && (
                <div>💰 Max Price: <span className="font-medium">€{filters.maxPrice.toLocaleString()}</span></div>
              )}
              {filters.beds && (
                <div>🛏️ Beds: <span className="font-medium">{filters.beds}+</span></div>
              )}
              {filters.baths && (
                <div>🚿 Baths: <span className="font-medium">{filters.baths}+</span></div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || !searchName.trim()}
          >
            {isSaving ? "Saving..." : "Save Search"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
