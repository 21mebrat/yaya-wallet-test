import React from "react";
import { RefreshCw } from "lucide-react";

export const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
      <p className="mt-2 text-sm text-gray-600">{message}</p>
    </div>
  );
};
