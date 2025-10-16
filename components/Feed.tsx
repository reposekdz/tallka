import React, { useState, useEffect } from 'react';
import TallkComposer from './TallkComposer';
import TallkPost from './TallkPost';
import StoriesBar from './StoriesBar';
import { promotedTallk, mockUser, mockStories } from '../data/mockData';
import type { Tallk, User, Story } from '../types';

interface FeedProps {
  tallks: Tallk[];
  currentUser: User;
  onPostTallk: (content: string, image?: string) => void;
  onNavigate: (page: 'profile' | 'home' | 'tallkDetail', data?: User | Tallk) => void;
  bookmarks: Set<string>;
  onToggleBookmark: (tallkId: string) => void;
  onReply: (tallk: Tallk) => void;
  onQuote: (tallk: Tallk) => void;
  onLike: (tallkId: string) => void;
  onOpenStory: (stories: Story[], startIndex: number) => void;
}

const Feed: React.FC<FeedProps> = ({ tallks, currentUser, onPostTallk, onNavigate, bookmarks, onToggleBookmark, onReply, onQuote, onLike, onOpenStory }) => {
  const [activeTab, setActiveTab] = useState<'forYou' | 'following'>('forYou');
  const [newTallksCount, setNewTallksCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
        setNewTallksCount(Math.floor(Math.random() * 3) + 1);
    }, 15000); // show after 15 seconds
    return () => clearTimeout(timer);
  }, [tallks]);

  const handleShowNewTallks = () => {
    setNewTallksCount(0); 
  };
  
  const followingTallks = tallks.filter(t => t.author.id === 'u1' || t.author.id === 'u2');
  const feedTallks = activeTab === 'forYou' ? tallks : followingTallks;
  
  const tallksWithPromo = [...feedTallks];
  if (activeTab === 'forYou' && tallksWithPromo.length > 2) {
      tallksWithPromo.splice(2, 0, promotedTallk);
  }

  const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
    <button onClick={onClick} className="w-1/2 py-4 text-center hover:bg-[var(--bg-secondary)]/50 transition-colors duration-200">
      <span className={`font-bold ${isActive ? 'text-[var(--text-primary)] border-b-4 border-sky-500' : 'text-[var(--text-secondary)]'} pb-4`}>
        {label}
      </span>
    </button>
  );

  return (
    <div>
      <div className="sticky top-0 bg-[var(--bg-primary)] bg-opacity-80 backdrop-blur-md z-10">
        <h1 className="text-xl font-bold p-4">Home</h1>
        <div className="flex border-b border-[var(--border-color)]">
            <TabButton label="For You" isActive={activeTab === 'forYou'} onClick={() => setActiveTab('forYou')} />
            <TabButton label="Following" isActive={activeTab === 'following'} onClick={() => setActiveTab('following')} />
        </div>
      </div>
       <div className="border-b border-[var(--border-color)]">
         <StoriesBar stories={mockStories} onOpenStory={onOpenStory} />
      </div>
      <TallkComposer onPostTallk={onPostTallk} currentUser={currentUser} />
      {newTallksCount > 0 && (
          <div className="text-center py-2 border-y border-[var(--border-color)]">
              <button onClick={handleShowNewTallks} className="text-sky-500 hover:underline">
                  Show {newTallksCount} new Tallks
              </button>
          </div>
      )}
      <div className="border-t border-[var(--border-color)]">
        {tallksWithPromo.map((tallk, index) => (
          <TallkPost 
            key={`${tallk.id}-${index}`} 
            tallk={tallk} 
            currentUser={currentUser}
            onNavigate={onNavigate} 
            isBookmarked={bookmarks.has(tallk.id)}
            onToggleBookmark={onToggleBookmark}
            onReply={onReply}
            onQuote={onQuote}
            onLike={onLike}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
