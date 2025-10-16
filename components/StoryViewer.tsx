import React, { useState, useEffect, useRef } from 'react';
import type { Story, User } from '../types';
import { MoreIcon, PauseIcon, PlayIcon, VolumeUpIcon, LikeIcon, ShareIcon } from './IconComponents';

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
  const [isPaused, setIsPaused] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);

  const usersWithStories = storyData.users;

  useEffect(() => {
    if (isOpen) {
        const initialStory = storyData.stories[storyData.startIndex];
        if (!initialStory) {
            onClose();
            return;
        }
        const userIndex = usersWithStories.findIndex(u => u.id === initialStory.user.id);
        const storyIndex = storyData.stories.filter(s => s.user.id === initialStory.user.id).findIndex(s => s.id === initialStory.id);
        
        setCurrentUserIndex(userIndex >= 0 ? userIndex : 0);
        setCurrentStoryInUser(storyIndex >= 0 ? storyIndex : 0);
        setProgress(0);
        setIsPaused(false);
    }
  }, [isOpen, storyData.startIndex, storyData.stories, usersWithStories]);


  const activeUserStories = storyData.stories.filter(s => s.user.id === usersWithStories[currentUserIndex]?.id);
  const currentStory = activeUserStories[currentStoryInUser];

  const goToNextStory = () => {
    if (currentStoryInUser < activeUserStories.length - 1) {
      setCurrentStoryInUser(prev => prev + 1);
    } else {
      goToNextUser();
    }
  };

  const goToPrevStory = () => {
    if (currentStoryInUser > 0) {
      setCurrentStoryInUser(prev => prev - 1);
    } else {
      goToPrevUser();
    }
  };
  
  const goToNextUser = () => {
    if (currentUserIndex < usersWithStories.length - 1) {
      setCurrentUserIndex(prev => prev + 1);
      setCurrentStoryInUser(0);
    } else {
      onClose();
    }
  };

  const goToPrevUser = () => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(prev => prev - 1);
      const prevUserStories = storyData.stories.filter(s => s.user.id === usersWithStories[currentUserIndex - 1]?.id);
      setCurrentStoryInUser(prevUserStories.length - 1);
    }
  };

  const handlePausePlay = () => {
    setIsPaused(prev => !prev);
  }

  useEffect(() => {
    if (!isOpen || !currentStory) return;

    setProgress(0);
    accumulatedTimeRef.current = 0;
    if (timerRef.current) clearInterval(timerRef.current);
    
    const startTimer = () => {
      startTimeRef.current = Date.now();
      
      if (currentStory.mediaType === 'image') {
        const duration = (currentStory.duration || 5) * 1000;
        timerRef.current = window.setInterval(() => {
          const elapsedTime = (Date.now() - startTimeRef.current) + accumulatedTimeRef.current;
          const newProgress = Math.min((elapsedTime / duration) * 100, 100);
          setProgress(newProgress);
          if (newProgress >= 100) {
            goToNextStory();
          }
        }, 50);
      } else if (videoRef.current) {
        videoRef.current.play().catch(e => console.error("Video play failed:", e));
      }
    };

    if (!isPaused) {
        startTimer();
    } else {
        accumulatedTimeRef.current += Date.now() - startTimeRef.current;
        if(videoRef.current) videoRef.current.pause();
    }
    
    return () => {
        if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [currentStoryInUser, currentUserIndex, isOpen, currentStory, isPaused]);
  
   const handleVideoTimeUpdate = () => {
    if (videoRef.current && !isPaused) {
      const { currentTime, duration } = videoRef.current;
      if (duration) {
        setProgress((currentTime / duration) * 100);
      }
    }
  };

  if (!isOpen || !currentStory) return null;

  const renderStoryCard = (user: User, index: number) => {
    const isActive = index === currentUserIndex;
    const isPrev = index === currentUserIndex - 1;
    const isNext = index === currentUserIndex + 1;

    let transform = '';
    if (isPrev) transform = 'translateX(-55%) scale(0.8)';
    if (isNext) transform = 'translateX(55%) scale(0.8)';
    if (isActive) transform = 'scale(1)';

    let opacity = '0.4';
    if (isActive) opacity = '1';

    const firstStory = storyData.stories.find(s => s.user.id === user.id);

    return (
        <div 
            key={user.id}
            className="absolute w-full h-full transition-all duration-500 ease-in-out flex items-center justify-center"
            style={{ transform: `translateX(${(index - currentUserIndex) * 100}%)` }}
        >
          <div 
            className="w-[90%] md:w-full max-w-[24rem] h-full rounded-2xl bg-slate-900 overflow-hidden shadow-2xl relative transition-all duration-500 ease-in-out"
            style={{ transform, opacity }}
            onClick={(e) => {
                e.stopPropagation();
                if(!isActive) setCurrentUserIndex(index);
            }}
          >
              {firstStory && <img src={firstStory.mediaUrl} className="w-full h-full object-cover" alt={`${user.name}'s story`}/>}
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-4 text-white">
                  <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-white" />
                  <p className="font-bold mt-1">{user.name}</p>
                  {user.isSponsored && <p className="text-xs">Sponsored</p>}
              </div>
          </div>
        </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center overflow-hidden" onClick={onClose}>
      
      {/* Navigation Arrows */}
      {currentUserIndex > 0 && <button onClick={(e) => {e.stopPropagation(); goToPrevUser();}} className="absolute left-2 md:left-8 text-white bg-black/30 rounded-full p-2 z-30 hover:bg-black/50"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>}
      {currentUserIndex < usersWithStories.length - 1 && <button onClick={(e) => {e.stopPropagation(); goToNextUser();}} className="absolute right-2 md:right-8 text-white bg-black/30 rounded-full p-2 z-30 hover:bg-black/50"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>}

      {/* Story Cards Container */}
      <div className="relative w-full h-full max-h-[90vh] aspect-[9/16]">
          {usersWithStories.map(renderStoryCard)}
          
          {/* Active Story UI */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
             <div className="w-[90%] md:w-full max-w-[24rem] h-full relative">
                <div className="absolute top-2 left-2 right-2 flex space-x-1 z-20 pointer-events-auto">
                    {activeUserStories.map((story, index) => (
                        <div key={story.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                            <div className="h-full bg-white transition-all duration-100" style={{ width: `${index < currentStoryInUser ? 100 : (index === currentStoryInUser ? progress : 0)}%` }} />
                        </div>
                    ))}
                </div>

                <div className="absolute top-5 left-4 right-4 flex items-center justify-between z-20 pointer-events-auto">
                    <div className="flex items-center space-x-2">
                        <img src={currentStory.user.avatar} className="w-8 h-8 rounded-full" />
                        <span className="font-bold text-white text-sm drop-shadow-md">{currentStory.user.username}</span>
                        <span className="text-white/80 text-sm drop-shadow-md">{currentStory.timestamp}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white">
                        <button onClick={(e) => {e.stopPropagation(); handlePausePlay()}} className="p-1">
                            {isPaused ? <PlayIcon className="w-5 h-5 drop-shadow-md" /> : <PauseIcon className="w-5 h-5 drop-shadow-md" />}
                        </button>
                        <button className="p-1"><VolumeUpIcon className="w-5 h-5 drop-shadow-md" /></button>
                        <button className="p-1"><MoreIcon className="w-5 h-5 drop-shadow-md" /></button>
                    </div>
                </div>

                {currentStory.mediaType === 'video' && (
                    <video ref={videoRef} src={currentStory.mediaUrl} className="w-full h-full object-cover absolute inset-0" onTimeUpdate={handleVideoTimeUpdate} onEnded={goToNextStory} playsInline autoPlay muted={false} />
                )}
                
                <div className="absolute inset-0 flex justify-between z-10 pointer-events-auto">
                    <div className="w-1/3 h-full" onClick={(e) => {e.stopPropagation(); goToPrevStory();}}></div>
                    <div className="w-2/3 h-full" onClick={(e) => {e.stopPropagation(); goToNextStory();}}></div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center space-x-2 pointer-events-auto">
                    <input type="text" placeholder={`Reply to ${currentStory.user.username}...`} className="w-full bg-black/40 border border-white/50 rounded-full px-4 py-2 text-white placeholder-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-white"/>
                    <button className="text-white p-2"><LikeIcon className="w-6 h-6" /></button>
                    <button className="text-white p-2"><ShareIcon className="w-6 h-6" /></button>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default StoryViewer;
