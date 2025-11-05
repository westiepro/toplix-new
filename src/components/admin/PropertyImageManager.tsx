"use client";

import { useState } from "react";
import { X, Upload, GripVertical, Star, Loader2, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { uploadToCloudinary, getThumbnail } from "@/lib/cloudinary";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";

export interface PropertyImage {
  id: string;
  url: string;
  publicId?: string; // Cloudinary public ID for deletion
  display_order: number;
  is_featured: boolean;
  style_name?: string; // AI decoration style
  is_original?: boolean; // Marks the original/before image
  image_category?: 'gallery' | 'ai_styled' | 'original';
}

interface PropertyImageManagerProps {
  images: PropertyImage[];
  onChange: (images: PropertyImage[]) => void;
  maxImages?: number;
}

const AI_STYLE_OPTIONS = [
	"Modern",
	"Scandinavian",
	"Minimalist",
	"Boho",
	"Industrial",
	"Contemporary",
	"Mediterranean",
	"Rustic",
	"Luxury",
	"French Country",
	"Algarve Style",
	"Portuguese Traditional",
	"Lisbon Modern",
];

function SortableImageItem({
  image,
  index,
  onDelete,
  onUpdate,
  isFeatured,
}: {
  image: PropertyImage;
  index: number;
  onDelete: () => void;
  onUpdate: (updates: Partial<PropertyImage>) => void;
  isFeatured: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Use Cloudinary thumbnail optimization
  const thumbnailUrl = getThumbnail(image.url);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative flex items-center gap-3 p-3 bg-white border-2 rounded-lg ${
        isFeatured ? "border-blue-500 bg-blue-50" : "border-gray-200"
      }`}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
      >
        <GripVertical className="h-5 w-5 text-gray-400" />
      </div>

      {/* Image Preview - Optimized with Cloudinary */}
      <div className="relative w-20 h-20 rounded overflow-hidden border border-gray-200">
        <Image
          src={thumbnailUrl}
          alt={`Property image ${index + 1}`}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Image {index + 1}</p>
          {isFeatured && (
            <div className="flex items-center gap-1 text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
              <Star className="h-3 w-3" fill="currentColor" />
              Featured
            </div>
          )}
          {image.image_category === 'ai_styled' && (
            <div className="flex items-center gap-1 text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full">
              <Palette className="h-3 w-3" />
              AI Styled
            </div>
          )}
          {image.is_original && (
            <div className="flex items-center gap-1 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
              Original
            </div>
          )}
        </div>
        
        {/* Category selector */}
        <div className="flex gap-2 items-center">
          <Select
            value={image.image_category || 'gallery'}
            onValueChange={(value) => onUpdate({ 
              image_category: value as 'gallery' | 'ai_styled' | 'original',
              is_original: value === 'original',
            })}
          >
            <SelectTrigger className="h-7 text-xs w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gallery">Gallery</SelectItem>
              <SelectItem value="original">Original</SelectItem>
              <SelectItem value="ai_styled">AI Styled</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Style name selector - only show for AI styled images */}
          {image.image_category === 'ai_styled' && (
            <Select
              value={image.style_name || ''}
              onValueChange={(value) => onUpdate({ style_name: value })}
            >
              <SelectTrigger className="h-7 text-xs w-40">
                <SelectValue placeholder="Select style..." />
              </SelectTrigger>
              <SelectContent>
                {AI_STYLE_OPTIONS.map((style) => (
                  <SelectItem key={style} value={style}>
                    {style}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        
        <p className="text-xs text-gray-500 truncate">
          {image.url}
        </p>
      </div>

      {/* Delete Button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function PropertyImageManager({
  images,
  onChange,
  maxImages = 8,
}: PropertyImageManagerProps) {
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Check if Cloudinary is configured
  const isCloudinaryConfigured = !!(
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && 
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id);
      const newIndex = images.findIndex((img) => img.id === over.id);

      const reorderedImages = arrayMove(images, oldIndex, newIndex);
      
      // Update display_order and is_featured (first image is always featured)
      const updatedImages = reorderedImages.map((img, idx) => ({
        ...img,
        display_order: idx,
        is_featured: idx === 0,
      }));

      onChange(updatedImages);
      toast.success("Images reordered successfully");
    }
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    if (images.length >= maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    const newImage: PropertyImage = {
      id: `img-${Date.now()}`,
      url: newImageUrl.trim(),
      display_order: images.length,
      is_featured: images.length === 0,
    };

    onChange([...images, newImage]);
    setNewImageUrl("");
    toast.success("Image added successfully");
  };

  const handleDeleteImage = async (imageId: string) => {
    const imageToDelete = images.find((img) => img.id === imageId);
    
    // If it has a Cloudinary public ID, optionally delete from Cloudinary
    if (imageToDelete?.publicId) {
      try {
        // Optional: Delete from Cloudinary via API
        // await deleteFromCloudinary(imageToDelete.publicId);
      } catch (error) {
        console.error("Failed to delete from Cloudinary:", error);
      }
    }

    const filteredImages = images.filter((img) => img.id !== imageId);
    
    // Reorder and update featured status
    const updatedImages = filteredImages.map((img, idx) => ({
      ...img,
      display_order: idx,
      is_featured: idx === 0,
    }));

    onChange(updatedImages);
    toast.success("Image removed successfully");
  };

  const uploadSingleFile = async (file: File) => {
    if (images.length >= maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return false;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error(`${file.name} is not an image file`);
      return false;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error(`${file.name} is too large (max 10MB)`);
      return false;
    }

    try {
      // Upload to Cloudinary
      const { url, publicId } = await uploadToCloudinary(file, 'properties');
      
      const newImage: PropertyImage = {
        id: `img-${Date.now()}-${Math.random()}`,
        url: url,
        publicId: publicId,
        display_order: images.length,
        is_featured: images.length === 0,
      };

      onChange([...images, newImage]);
      return true;
      
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(`Failed to upload ${file.name}`);
      return false;
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    let successCount = 0;

    for (const file of files) {
      const success = await uploadSingleFile(file);
      if (success) successCount++;
    }

    setIsUploading(false);
    
    if (successCount > 0) {
      toast.success(`Successfully uploaded ${successCount} image(s)!`);
    }
    
    e.target.value = ""; // Reset file input
  };

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set to false if leaving the drop zone itself, not child elements
    if (e.currentTarget === e.target) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length === 0) {
      toast.error("Please drop image files only");
      return;
    }

    const availableSlots = maxImages - images.length;
    if (imageFiles.length > availableSlots) {
      toast.error(`Can only add ${availableSlots} more image(s)`);
      return;
    }

    setIsUploading(true);
    let successCount = 0;

    for (const file of imageFiles) {
      const success = await uploadSingleFile(file);
      if (success) successCount++;
    }

    setIsUploading(false);

    if (successCount > 0) {
      toast.success(`Successfully uploaded ${successCount} image(s)!`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium">Property Images</label>
          <p className="text-xs text-gray-500 mt-1">
            {images.length} of {maxImages} images • First image is the featured image • Optimized with Cloudinary
          </p>
        </div>
      </div>

      {/* Add Image Section with Drag & Drop */}
      <div 
        className={`relative space-y-3 p-4 rounded-lg border-2 border-dashed transition-all ${
          isDragging 
            ? 'bg-blue-50 border-blue-400 scale-[1.02]' 
            : 'bg-gray-50 border-gray-300'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Drag & Drop Overlay */}
        {isDragging && (
          <div className="absolute inset-0 bg-blue-500/10 rounded-lg flex items-center justify-center z-10 pointer-events-none">
            <div className="text-center p-8 bg-white/90 rounded-xl shadow-lg backdrop-blur-sm">
              <Upload className="h-16 w-16 text-blue-600 mx-auto mb-3 animate-bounce" />
              <p className="text-xl font-bold text-blue-900 mb-1">Drop images here</p>
              <p className="text-sm text-blue-700">Upload multiple images at once</p>
            </div>
          </div>
        )}

        {/* URL Input */}
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter image URL (https://...)"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddImage();
              }
            }}
          />
          <Button
            type="button"
            onClick={handleAddImage}
            disabled={!newImageUrl.trim() || images.length >= maxImages}
          >
            <Upload className="h-4 w-4 mr-2" />
            Add URL
          </Button>
        </div>

        {/* File Upload - Uploads to Cloudinary */}
        {isCloudinaryConfigured ? (
          <div className="relative">
            <label className="block">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                disabled={isUploading || images.length >= maxImages}
                className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </label>
            {isUploading && (
              <div className="absolute inset-0 bg-white/90 flex items-center justify-center rounded-md">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                  <p className="text-sm text-gray-600">Uploading to Cloudinary...</p>
                </div>
              </div>
            )}
            {/* Drag & Drop Hint */}
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-500">
                Or drag and drop images here to upload
              </p>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-xs text-yellow-800 font-medium mb-1">
              📁 File Upload Disabled
            </p>
            <p className="text-xs text-yellow-700">
              To enable file uploads, configure Cloudinary in your <code className="bg-yellow-100 px-1 rounded">.env.local</code> file.
              For now, you can add images by URL above.
            </p>
          </div>
        )}

        <div className="flex items-start gap-2 text-xs text-gray-500">
          <span className="text-blue-600">☁️</span>
          <div>
            {isCloudinaryConfigured ? (
              <>
                <p className="font-medium text-blue-700">Cloudinary Optimized</p>
                <p>Images are automatically optimized, resized, and delivered via CDN</p>
              </>
            ) : (
              <>
                <p className="font-medium text-gray-700">Add Images by URL</p>
                <p>Paste image URLs from Unsplash, Cloudinary, or any image hosting service</p>
              </>
            )}
            <p className="mt-1">💡 Tip: Drag images to reorder. First image = featured image.</p>
          </div>
        </div>
      </div>

      {/* Images List */}
      {images.length > 0 && (
        <div className="space-y-2">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={images.map((img) => img.id)}
              strategy={verticalListSortingStrategy}
            >
              {images.map((image, index) => (
                <SortableImageItem
                  key={image.id}
                  image={image}
                  index={index}
                  onDelete={() => handleDeleteImage(image.id)}
                  onUpdate={(updates) => {
                    const updatedImages = images.map((img) =>
                      img.id === image.id ? { ...img, ...updates } : img
                    );
                    onChange(updatedImages);
                  }}
                  isFeatured={image.is_featured}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center py-8 text-gray-400 border-2 border-dashed rounded-lg">
          <Upload className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No images added yet</p>
          <p className="text-xs">Upload images to Cloudinary or add by URL</p>
        </div>
      )}
    </div>
  );
}
