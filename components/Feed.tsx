import React, { useState, useEffect } from 'react';
import TallkComposer from './TallkComposer';
import TallkPost from './TallkPost';
import { promotedTallk, mockUser } from '../data/mockData';
import type { Tallk, User } from '../types';

interface FeedProps {
  tallks: Tallk[];
  onPostTallk: (content: string, image?: string) => void;
  onNavigate: (page: 'profile' | 'home' | 'tallkDetail', data?: User | Tallk) => void;
  bookmarks: Set<string>;
  onToggleBookmark: (tallkId: string) => void;
  onReply: (tallk: Tallk) => void;
}

const Feed: React.FC<FeedProps> = ({ tallks, onPostTallk, onNavigate, bookmarks, onToggleBookmark, onReply }) => {
  const [activeTab, setActiveTab] = useState<'forYou' | 'following'>('forYou');
  const [newTallksCount, setNewTallksCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
        setNewTallksCount(Math.floor(Math.random() * 3) + 1);
    }, 15000); // show after 15 seconds
    return () => clearTimeout(timer);
  }, [tallks]);

  const handleShowNewTallks = () => {
    // This is a simulation. In a real app, you'd fetch and prepend new tallks.
    const newTallk: Tallk = {
      id: `t-new-${Date.now()}`,
      author: { ...mockUser, name: "Fresh Poster", username:"freshposter", avatar: "https://picsum.photos/seed/new/200/200"},
      content: `This is a brand new Tallk that just appeared! #${Math.random().toString(36).substring(7)}`,
      createdAt: new Date().toISOString(),
      likes: 0,
      retallks: 0,
      replies: [],
    };
    // Prepend new tallk to existing ones
    // onPostTallk is not used here to avoid clearing the composer
    // In a real app, this state would be managed differently.
    // This is just to demonstrate the "Show new Tallks" button.
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
      <TallkComposer onPostTallk={onPostTallk} />
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
            onNavigate={onNavigate} 
            isBookmarked={bookmarks.has(tallk.id)}
            onToggleBookmark={onToggleBookmark}
            onReply={onReply}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;