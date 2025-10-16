import React, { useState } from 'react';
import type { Tallk, User } from '../types';
import TallkPost from './TallkPost';
import { MoreIcon } from './IconComponents';

interface ProfilePageProps {
  user: User;
  tallks: Tallk[];
  currentUser: User;
  onNavigate: (page: 'profile' | 'tallkDetail' | 'home', data?: User | Tallk) => void;
  onEditProfile: () => void;
  bookmarks: Set<string>;
  onToggleBookmark: (tallkId: string) => void;
  onReply: (tallk: Tallk) => void;
  onQuote: (tallk: Tallk) => void;
  onLike: (tallkId: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, tallks, currentUser, onNavigate, onEditProfile, bookmarks, onToggleBookmark, onReply, onQuote, onLike }) => {
  const [activeTab, setActiveTab] = useState('tallks');
  const userTallks = tallks.filter(t => t.author.id === user.id);

  const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
    <button onClick={onClick} className="flex-1 py-4 text-center hover:bg-[var(--bg-secondary)]/50 transition-colors duration-200">
      <span className={`font-bold ${isActive ? 'text-[var(--text-primary)] border-b-4 border-sky-500' : 'text-[var(--text-secondary)]'} pb-4`}>
        {label}
      </span>
    </button>
  );

  return (
    <div>
       <div className="sticky top-0 bg-[var(--bg-primary)] bg-opacity-80 backdrop-blur-md z-10 p-4 border-b border-[var(--border-color)] flex items-center space-x-4">
         <button onClick={() => onNavigate('home')} className="hover:bg-[var(--bg-secondary)] rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
         </button>
         <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-sm text-[var(--text-secondary)]">{userTallks.length} Tallks</p>
         </div>
      </div>

      <div>
        <div className="h-48 bg-slate-700 relative">
            {user.banner && <img src={user.banner} alt="User banner" className="w-full h-full object-cover" />}
        </div>
        <div className="p-4">
            <div className="flex justify-between items-start">
                <div className="-mt-20">
                     <img src={user.avatar} alt="User avatar" className="w-32 h-32 rounded-full border-4 border-[var(--bg-primary)]" />
                </div>
                {currentUser.id === user.id ? (
                    <button onClick={onEditProfile} className="border border-[var(--border-color)] font-bold px-4 py-1.5 rounded-full">Edit profile</button>
                ) : (
                    <div className="flex space-x-2">
                        <button className="border border-[var(--border-color)] p-2 rounded-full"><MoreIcon className="w-5 h-5"/></button>
                        <button className="bg-white text-black font-bold px-4 py-1.5 rounded-full">Follow</button>
                    </div>
                )}
            </div>
            <div className="mt-2">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-[var(--text-secondary)]">@{user.username}</p>
            </div>
            <p className="mt-2">{user.bio}</p>
            <div className="flex space-x-4 text-[var(--text-secondary)] mt-2 text-sm">
                <span>{user.location}</span>
                <span><a href={user.website} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">{user.website}</a></span>
                <span>{user.joinedDate}</span>
            </div>
            <div className="flex space-x-4 mt-2">
                <span><span className="font-bold">{user.following}</span> Following</span>
                <span><span className="font-bold">{user.followers}</span> Followers</span>
            </div>
        </div>
      </div>
      
      <div className="border-b border-[var(--border-color)] flex">
        <TabButton label="Tallks" isActive={activeTab === 'tallks'} onClick={() => setActiveTab('tallks')} />
        <TabButton label="Replies" isActive={activeTab === 'replies'} onClick={() => setActiveTab('replies')} />
        <TabButton label="Media" isActive={activeTab === 'media'} onClick={() => setActiveTab('media')} />
        <TabButton label="Likes" isActive={activeTab === 'likes'} onClick={() => setActiveTab('likes')} />
      </div>

      <div>
        {userTallks.map(tallk => (
             <TallkPost 
                key={tallk.id} 
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

export default ProfilePage;
