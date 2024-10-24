// Importing necessary modules and components
"use client";
import { PulseLoader } from "react-spinners";

// ComponentLevelLoader component definition
export default function ComponentLevelLoader({ text, color, loading, size }) {
  return (
    // Container with text and loading spinner
    <span className="flex gap-1 items-center">
      {/* Display loading text */}
      {text}
      {/* PulseLoader component for the loading spinner */}
      <PulseLoader
        color={color}         // Spinner color
        loading={loading}     // Loading state
        size={size || 10}      // Spinner size (default: 10)
        data-testid="loader"  // Test identifier for testing purposes
      />
    </span>
  );
}
