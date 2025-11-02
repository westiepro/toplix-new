"use client";

import { motion, PanInfo, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import type { Property } from "@/lib/api";
import { ChevronUp, ChevronDown } from "lucide-react";

interface PropertyBottomSheetProps {
  properties: Property[];
  onPropertyHover?: (id: string | null) => void;
  highlightedId?: string | null;
}

export function PropertyBottomSheet({
  properties,
  onPropertyHover,
  highlightedId,
}: PropertyBottomSheetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(600); // Default height
  const controls = useAnimation();

  const collapsedHeight = 200; // Show property count + first 2 properties
  const expandedHeight = viewportHeight * 0.7; // 70% of viewport

  // Set viewport height after mounting (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setViewportHeight(window.innerHeight);
      
      const handleResize = () => setViewportHeight(window.innerHeight);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    controls.start({
      y: isExpanded ? viewportHeight - expandedHeight : viewportHeight - collapsedHeight,
      transition: { type: "spring", damping: 30, stiffness: 300 },
    });
  }, [isExpanded, controls, viewportHeight, expandedHeight, collapsedHeight]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    if (velocity > 500 || offset > 100) {
      // Swipe down - collapse
      setIsExpanded(false);
    } else if (velocity < -500 || offset < -100) {
      // Swipe up - expand
      setIsExpanded(true);
    }
  };

  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      animate={controls}
      initial={{ y: viewportHeight - collapsedHeight }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl md:hidden"
      style={{ touchAction: "none" }}
    >
      {/* Drag Handle */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 rounded-t-3xl pb-2">
        <div
          className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-4 pb-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {properties.length} Properties
            </h3>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* Property List */}
      <div
        className="overflow-y-auto px-4 pb-4"
        style={{
          height: isExpanded ? expandedHeight - 80 : collapsedHeight - 80,
          maxHeight: isExpanded ? expandedHeight - 80 : collapsedHeight - 80,
        }}
      >
        <div className="grid grid-cols-1 gap-3 pt-3">
          {properties.slice(0, isExpanded ? undefined : 2).map((property) => (
            <div
              key={property.id}
              onMouseEnter={() => onPropertyHover?.(property.id)}
              onMouseLeave={() => onPropertyHover?.(null)}
              onTouchStart={() => onPropertyHover?.(property.id)}
            >
              <PropertyCard
                property={property}
                highlighted={highlightedId === property.id}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
