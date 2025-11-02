"use client";

import { ZoomIn, ZoomOut, Maximize, Minimize, Map, Satellite, Moon, Sun, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleFullscreen: () => void;
  onToggleStyle: (style: 'streets' | 'satellite' | 'dark') => void;
  onToggleDraw?: () => void;
  onClearDraw?: () => void;
  isFullscreen: boolean;
  currentStyle: 'streets' | 'satellite' | 'dark';
  isDrawing?: boolean;
  hasDrawnShape?: boolean;
}

export function MapControls({
  onZoomIn,
  onZoomOut,
  onToggleFullscreen,
  onToggleStyle,
  onToggleDraw,
  onClearDraw,
  isFullscreen,
  currentStyle,
  isDrawing = false,
  hasDrawnShape = false,
}: MapControlsProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
      {/* Zoom Controls */}
      <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
        <button
          onClick={onZoomIn}
          className="p-2 hover:bg-gray-100 transition-colors border-b border-gray-200"
          aria-label="Zoom in"
          title="Zoom in"
        >
          <ZoomIn className="h-5 w-5 text-gray-700" />
        </button>
        <button
          onClick={onZoomOut}
          className="p-2 hover:bg-gray-100 transition-colors"
          aria-label="Zoom out"
          title="Zoom out"
        >
          <ZoomOut className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* Map Style Toggle */}
      <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
        <button
          onClick={() => onToggleStyle(currentStyle === 'streets' ? 'satellite' : 'streets')}
          className="p-2 hover:bg-gray-100 transition-colors flex items-center gap-2"
          aria-label={currentStyle === 'streets' ? 'Switch to satellite' : 'Switch to map'}
          title={currentStyle === 'streets' ? 'Satellite view' : 'Map view'}
        >
          {currentStyle === 'streets' ? (
            <Satellite className="h-5 w-5 text-gray-700" />
          ) : (
            <Map className="h-5 w-5 text-gray-700" />
          )}
        </button>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <button
          onClick={() => {
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            // Also update map style if currently in streets view
            if (currentStyle === 'streets') {
              onToggleStyle(newTheme === 'dark' ? 'dark' : 'streets');
            }
          }}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          ) : (
            <Moon className="h-5 w-5 text-gray-700" />
          )}
        </button>
      </div>

      {/* Draw Tool Controls */}
      {onToggleDraw && (
        <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
          <button
            onClick={onToggleDraw}
            className={`p-2 transition-colors ${
              isDrawing
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            aria-label={isDrawing ? 'Stop drawing' : 'Draw area'}
            title={isDrawing ? 'Stop drawing' : 'Draw search area'}
          >
            <Pencil className="h-5 w-5" />
          </button>
          {hasDrawnShape && onClearDraw && (
            <button
              onClick={onClearDraw}
              className="p-2 hover:bg-gray-100 transition-colors border-t border-gray-200 text-gray-700"
              aria-label="Clear drawn shape"
              title="Clear drawn shape"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
      )}

      {/* Fullscreen Toggle */}
      <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
        <button
          onClick={onToggleFullscreen}
          className="p-2 hover:bg-gray-100 transition-colors"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? (
            <Minimize className="h-5 w-5 text-gray-700" />
          ) : (
            <Maximize className="h-5 w-5 text-gray-700" />
          )}
        </button>
      </div>
    </div>
  );
}
