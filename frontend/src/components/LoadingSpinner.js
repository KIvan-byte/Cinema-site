import React from 'react';
import { useTheme } from '../context/ThemeContext';

const LoadingSpinner = ({ size = "large", color = "cinema-red" }) => {
  const { theme } = useTheme();
  
  // Automatically adjust color based on theme if not explicitly specified
  if (color === "cinema-red" && theme === "dark") {
    color = "white";
  }
  
  const sizeClasses = {
    small: "h-8 w-8 border-2",
    medium: "h-12 w-12 border-3",
    large: "h-16 w-16 border-4"
  };
  
  const colorClasses = {
    "cinema-red": "border-t-red-600 border-b-red-600",
    white: "border-t-white border-b-white",
    gray: "border-t-gray-600 border-b-gray-600",
  };
  
  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}></div>
    </div>
  );
};

export default LoadingSpinner;
