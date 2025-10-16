
import React, { useState, useEffect, useRef } from 'react';
import type { Story, User } from '../types';

interface StoryViewerProps {
  isOpen: boolean;
  onClose: () => void;
  storyData: {
    stories: Story[];
    startIndex: number;
    users: User[];
  };
}

const StoryViewer: React.FC<StoryViewerProps> = ({ isOpen, onClose, storyData }) => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStoryInUser, setCurrentStoryInUser] = useState(0);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  // FIX: Initialize timerRef to null for type safety.
  const timerRef = useRef<number | null>(null);

  const usersWithStories = storyData.users;

  useEffect(() => {
    if (isOpen) {
        const initialStory = storyData.stories[storyData.startIndex];
        const userIndex = usersWithStories.findIndex(u => u.id === initialStory.user.id);
        const storyIndex = storyData.stories.filter(s => s.user.id === initialStory.user.id).findIndex(s => s.id === initialStory.id);
        
        setCurrentUserIndex(userIndex >= 0 ? userIndex : 0);
        setCurrentStoryInUser(storyIndex >= 0 ? storyIndex : 0);
    }
  }, [isOpen, storyData.startIndex, storyData.stories, usersWithStories]);


  const activeUserStories = storyData.stories.filter(s => s.user.id === usersWithStories[currentUserIndex]?.id);
  const currentStory = activeUserStories[currentStoryInUser];

  const goToNextStory = () => {
    if (currentStoryInUser < activeUserStories.length - 1) {
      setCurrentStoryInUser(currentStoryInUser + 1);
    } else {
      goToNextUser();
    }
  };

  const goToPrevStory = () => {
    if (currentStoryInUser > 0) {
      setCurrentStoryInUser(currentStoryInUser - 1);
    } else {
      goToPrevUser();
    }
  };
  
  const goToNextUser = () => {
    if (currentUserIndex < usersWithStories.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
      setCurrentStoryInUser(0);
    } else {
      onClose();
    }
  };

  const goToPrevUser = () => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
      setCurrentStoryInUser(0);
    }
  };

  useEffect(() => {
    if (!isOpen || !currentStory) return;

    setProgress(0);
    if (timerRef.current) {
        clearInterval(timerRef.current);
    }

    if (currentStory.mediaType === 'image') {
      const duration = (currentStory.duration || 5) * 1000;
      let startTime = Date.now();
      timerRef.current = window.setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = Math.min((elapsedTime / duration) * 100, 100);
        setProgress(newProgress);
        if (newProgress >= 100) {
          goToNextStory();
        }
      }, 50);
    } else if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(e => console.error("Video play failed:", e));
    }
    
    return () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    }
  }, [currentStoryInUser, currentUserIndex, isOpen, currentStory]);
  
   const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current;
      if (duration) {
        setProgress((currentTime / duration) * 100);
      }
    }
  };

  if (!isOpen || !currentStory) return null;

  const prevUser = usersWithStories[currentUserIndex - 1];
  const nextUser = usersWithStories[currentUserIndex + 1];

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center overflow-hidden" onClick={onClose}>
        
        {/* Prev User card */}
        {prevUser && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer opacity-50 hover:opacity-100 transition-all duration-300" onClick={(e) => { e.stopPropagation(); goToPrevUser(); }}>
                <div className="w-32 h-56 bg-slate-700 rounded-lg overflow-hidden">
                    <img src={prevUser.avatar} className="w-full h-full object-cover" />
                </div>
            </div>
        )}

      <div className="relative w-full h-full max-w-sm max-h-[90vh] aspect-[9/16] bg-slate-800 rounded-lg overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        
        <div className="absolute top-2 left-2 right-2 flex space-x-1 z-20">
            {activeUserStories.map((story, index) => (
                <div key={story.id} className="h-1 flex-1 bg-white/30 rounded-full">
                    <div 
                        className="h-full bg-white rounded-full transition-all duration-100" 
                        style={{ width: `${index < currentStoryInUser ? 100 : (index === currentStoryInUser ? progress : 0)}%` }}
                    />
                </div>
            ))}
        </div>

        <div className="absolute top-5 left-4 right-4 flex items-center justify-between z-20">
            <div className="flex items-center space-x-2">
                <img src={currentStory.user.avatar} className="w-8 h-8 rounded-full" />
                <span className="font-bold text-white text-sm">{currentStory.user.username}</span>
            </div>
            <button onClick={onClose} className="text-white p-1 rounded-full hover:bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
        
        {currentStory.mediaType === 'image' ? (
             <img src={currentStory.mediaUrl} className="w-full h-full object-cover" />
        ) : (
            <video 
                ref={videoRef}
                src={currentStory.mediaUrl} 
                className="w-full h-full object-cover" 
                onTimeUpdate={handleVideoTimeUpdate}
                onEnded={goToNextStory}
                playsInline
                autoPlay
            />
        )}

        <div className="absolute inset-0 flex justify-between z-10">
            <div className="w-1/3 h-full cursor-pointer" onClick={goToPrevStory}></div>
            <div className="w-2/3 h-full cursor-pointer" onClick={goToNextStory}></div>
        </div>
      </div>
       
      {/* Next User card */}
      {nextUser && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 cursor-pointer opacity-50 hover:opacity-100 transition-all duration-300" onClick={(e) => { e.stopPropagation(); goToNextUser(); }}>
                <div className="w-32 h-56 bg-slate-700 rounded-lg overflow-hidden">
                    <img src={nextUser.avatar} className="w-full h-full object-cover" />
                </div>
            </div>
        )}
    </div>
  );
};

export default StoryViewer;
