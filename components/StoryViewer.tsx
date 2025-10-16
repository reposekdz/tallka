import React, { useState, useEffect, useRef } from 'react';
import type { Story } from '../types';

interface StoryViewerProps {
  isOpen: boolean;
  onClose: () => void;
  storyData: {
    stories: Story[];
    startIndex: number;
  };
}

const StoryViewer: React.FC<StoryViewerProps> = ({ isOpen, onClose, storyData }) => {
  const [currentIndex, setCurrentIndex] = useState(storyData.startIndex);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  {/* FIX: Changed useRef generic to be more explicit, which can solve overload resolution issues with some tooling. */}
  // FIX: Corrected useRef generic from `number` to `number | undefined` to match its initial `undefined` value.
  const timerRef = useRef<number | undefined>();

  const currentStory = storyData.stories[currentIndex];

  const goToNext = () => {
    if (currentIndex < storyData.stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };

  useEffect(() => {
    setCurrentIndex(storyData.startIndex);
  }, [storyData.startIndex]);

  useEffect(() => {
    if (!isOpen) return;

    setProgress(0);
    clearInterval(timerRef.current);

    if (currentStory.mediaType === 'image') {
      const duration = (currentStory.duration || 5) * 1000;
      let startTime = Date.now();
      timerRef.current = window.setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = Math.min((elapsedTime / duration) * 100, 100);
        setProgress(newProgress);
        if (newProgress >= 100) {
          goToNext();
        }
      }, 50);
    } else if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(e => console.error("Video play failed:", e));
    }
    
    return () => clearInterval(timerRef.current);
  }, [currentIndex, isOpen, storyData.stories]);
  
   const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current;
      if (duration) {
        setProgress((currentTime / duration) * 100);
      }
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="relative w-full h-full max-w-md max-h-[95vh] aspect-[9/16] bg-slate-800 rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
        
        {/* Progress Bars */}
        <div className="absolute top-2 left-2 right-2 flex space-x-1 z-20">
            {storyData.stories.map((story, index) => (
                <div key={story.id} className="h-1 flex-1 bg-white/30 rounded-full">
                    <div 
                        className="h-full bg-white rounded-full" 
                        style={{ width: `${index < currentIndex ? 100 : (index === currentIndex ? progress : 0)}%` }}
                    />
                </div>
            ))}
        </div>

        {/* Header */}
        <div className="absolute top-5 left-4 right-4 flex items-center justify-between z-20">
            <div className="flex items-center space-x-2">
                <img src={currentStory.user.avatar} className="w-8 h-8 rounded-full" />
                <span className="font-bold text-white text-sm">{currentStory.user.username}</span>
            </div>
            <button onClick={onClose} className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
        
        {/* Content */}
        {currentStory.mediaType === 'image' ? (
             <img src={currentStory.mediaUrl} className="w-full h-full object-cover" />
        ) : (
            <video 
                ref={videoRef}
                src={currentStory.mediaUrl} 
                className="w-full h-full object-cover" 
                onTimeUpdate={handleVideoTimeUpdate}
                onEnded={goToNext}
                playsInline
                autoPlay
            />
        )}

        {/* Navigation */}
        <div className="absolute inset-0 flex justify-between z-10">
            <div className="w-1/3 h-full" onClick={goToPrev}></div>
            <div className="w-1/3 h-full" onClick={goToNext}></div>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
