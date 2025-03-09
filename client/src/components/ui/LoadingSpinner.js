// src/components/ui/LoadingSpinner.jsx
export const LoadingSpinner = () => {
    return (
      <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-rose-gold"></div>
      </div>
    );
  };