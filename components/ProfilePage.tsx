import React, { useState, useMemo } from 'react';
import type { User, Tallk } from '../types';
import TallkPost from './TallkPost';
import { VerifiedBadgeIcon, CalendarIcon, MoreIcon, TipJarIcon } from './IconComponents';

interface ProfilePageProps {
  user: User;
  userTallks: Tallk[];
  onNavigate: (page: 'profile' | 'tallkDetail', data?: User | Tallk) => void;
  bookmarks: Set<string>;
  onToggleBookmark: (tallkId: string) => void;
  onReply: (tallk: Tallk) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, userTallks, onNavigate, bookmarks, onToggleBookmark, onReply }) => {
  const [activeTab, setActiveTab] = useState<'tallks' | 'replies' | 'media' | 'likes'>('tallks');
  
  const { pinnedTallk, otherTallks } = useMemo(() => {
    const pinned = userTallks.find(t => t.isPinned);
    const others = userTallks.filter(t => !t.isPinned);
    return { pinnedTallk: pinned, otherTallks: others };
  }, [userTallks]);

  const filteredTallks = useMemo(() => {
    switch (activeTab) {
      case 'replies':
        return otherTallks.filter(t => t.replies.length > 0); 
      case 'media':
        return otherTallks.filter(t => !!t.image || !!t.videoUrl);
      case 'likes':
        return []; 
      case 'tallks':
      default:
        return otherTallks;
    }
  }, [activeTab, otherTallks]);
  
  const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
    <button onClick={onClick} className="flex-1 py-4 text-center hover:bg-[var(--bg-secondary)]/50 transition-colors duration-200">
        <span className={`font-bold ${isActive ? 'text-[var(--text-primary)] border-b-4 border-sky-500' : 'text-[var(--text-secondary)]'} pb-4`}>
            {label}
        </span>
    </button>
  );

  return (
    <div>
      <div className="sticky top-0 bg-[var(--bg-primary)] bg-opacity-80 backdrop-blur-md z-10 p-4 border-b border-[var(--border-color)]">
        <h1 className="text-xl font-bold">{user.name}</h1>
        <p className="text-sm text-[var(--text-secondary)]">{userTallks.length} Tallks</p>
      </div>

      <div>
        <div className="h-48 bg-slate-700 relative">
          {user.banner && <img src={user.banner} alt="User banner" className="w-full h-full object-cover" />}
           <div className={`absolute -bottom-16 left-4 ${user.hasActiveStory ? `ring-4 ring-offset-4 ring-offset-[var(--bg-primary)] ring-sky-400 rounded-full` : ''}`}>
             <img src={user.avatar} alt="User avatar" className={`w-32 h-32 rounded-full border-4 border-[var(--bg-primary)]`} />
           </div>
        </div>
        
        <div className="flex justify-end items-center p-4 border-b border-[var(--border-color)] space-x-2">
            <button className="p-2 border border-[var(--text-secondary)] rounded-full hover:bg-[var(--bg-secondary)]"><MoreIcon /></button>
            <button className="p-2 border border-[var(--text-secondary)] rounded-full hover:bg-[var(--bg-secondary)]"><TipJarIcon /></button>
            <button className="bg-sky-500 text-white font-bold py-1.5 px-4 rounded-full">Subscribe</button>
            <button className="border border-[var(--text-secondary)] text-white font-bold py-1.5 px-4 rounded-full">Follow</button>
        </div>

        <div className="p-4 border-b border-[var(--border-color)]">
          <div className="flex items-center space-x-1">
            <h2 className="text-xl font-bold">{user.name}</h2>
            {user.isVerified && <VerifiedBadgeIcon className="w-6 h-6 text-sky-400" />}
          </div>
          <p className="text-[var(--text-secondary)]">@{user.username}</p>
          {user.isProfessional && <p className="text-sm text-[var(--text-secondary)] mt-1">Professional Account</p>}
          <p className="mt-2">{user.bio}</p>
          <div className="flex space-x-4 mt-2 text-[var(--text-secondary)] text-sm flex-wrap">
            {user.location && <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> {user.location}</span>}
            {user.website && <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg> <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">{user.website}</a></span>}
            {user.birthday && <span className="flex items-center"><CalendarIcon className="w-4 h-4 mr-1"/> Born {new Date(user.birthday).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>}
          </div>
          <div className="flex space-x-4 mt-2">
            <span><span className="font-bold text-white">{user.following}</span> <span className="text-[var(--text-secondary)]">Following</span></span>
            <span><span className="font-bold text-white">{user.followers.toLocaleString()}</span> <span className="text-[var(--text-secondary)]">Followers</span></span>
          </div>
        </div>

        <div className="flex border-b border-[var(--border-color)]">
            <TabButton label="Tallks" isActive={activeTab === 'tallks'} onClick={() => setActiveTab('tallks')} />
            <TabButton label="Replies" isActive={activeTab === 'replies'} onClick={() => setActiveTab('replies')} />
            <TabButton label="Media" isActive={activeTab === 'media'} onClick={() => setActiveTab('media')} />
            <TabButton label="Likes" isActive={activeTab === 'likes'} onClick={() => setActiveTab('likes')} />
        </div>

        <div>
          {pinnedTallk && (
              <TallkPost key={pinnedTallk.id} tallk={pinnedTallk} onNavigate={onNavigate} isBookmarked={bookmarks.has(pinnedTallk.id)} onToggleBookmark={onToggleBookmark} onReply={onReply} />
          )}
          {filteredTallks.map(tallk => (
            <TallkPost key={tallk.id} tallk={tallk} onNavigate={onNavigate} isBookmarked={bookmarks.has(tallk.id)} onToggleBookmark={onToggleBookmark} onReply={onReply} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;