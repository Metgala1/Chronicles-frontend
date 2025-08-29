// Error.jsx
import React from "react";
import { AlertTriangle } from "lucide-react"; // professional icon

const Error = ({ title = "Something went wrong", message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6">
      <AlertTriangle className="text-red-500 w-16 h-16 mb-4" />
      
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
        {title}
      </h1>
      
      {message && (
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-lg">
          {message}
        </p>
      )}

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 px-6 py-2 bg-red-500 text-white font-medium rounded-xl shadow-md hover:bg-red-600 transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;
