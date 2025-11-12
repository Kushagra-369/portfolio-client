import React, { useState } from 'react'

interface PopProps {
  onClose: () => void;
  onRatingSubmit: (rating: number) => void;
}

export default function Pop({ onClose, onRatingSubmit }: PopProps) {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSubmit = async () => {
    if (selectedRating === 0) {
      alert('Please select a rating before submitting');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('Submitting rating:', selectedRating);
      console.log('User feedback:', feedback);
      
      // Call the parent function to handle the rating
      onRatingSubmit(selectedRating);
      
      // You can add your API call here:
      // await fetch('/api/ratings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ rating: selectedRating, feedback })
      // });
      
    } catch (error) {
      console.error('Error submitting rating:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#3e3b3b5e] bg-opacity-50"></div>
      
      {/* Popup Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl transition-colors"
        >
          ×
        </button>
        
        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⭐</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            How do you like our website?
          </h2>
          <p className="text-gray-600 mb-6">
            Your feedback helps us improve!
          </p>
          
          {/* Star Rating */}
          <div className="flex justify-center space-x-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                disabled={isSubmitting}
                className={`text-4xl transition-all duration-200 transform hover:scale-110 ${
                  star <= selectedRating 
                    ? 'text-yellow-400 scale-110' 
                    : 'text-gray-300 hover:text-yellow-300'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                ★
              </button>
            ))}
          </div>

          {/* Rating Text */}
          {selectedRating > 0 && (
            <p className="text-sm text-gray-600 mb-4">
              You rated: <span className="font-semibold text-blue-600">{selectedRating}</span> star{selectedRating > 1 ? 's' : ''}
            </p>
          )}
          
          {/* Optional Feedback */}
          <textarea
            placeholder="Any additional feedback? (Optional)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            disabled={isSubmitting}
            className="w-full p-3 border border-gray-300 rounded-lg resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            rows={3}
          />
          
          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Maybe Later
            </button>
            <button
              onClick={handleSubmit}
              disabled={selectedRating === 0 || isSubmitting}
              className={`flex-1 py-3 px-4 rounded-lg transition-colors ${
                selectedRating > 0 && !isSubmitting
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-400 text-white cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Rating'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}