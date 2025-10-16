import React from 'react';
import { HomeIcon, ExploreIcon, NotificationsIcon, MessagesIcon, ProfileIcon, TallkaIcon, MoreIcon, BookmarkIcon, CommunitiesIcon, SpacesIcon, PremiumIcon, SettingsIcon, ListIcon, MomentsIcon } from './IconComponents';
import type { User } from '../types';

type Page = 'home' | 'explore' | 'notifications' | 'messages' | 'profile' | 'bookmarks' | 'communities' | 'spaces' | 'premium' | 'settings' | 'lists' | 'moments';

interface SidebarProps {
  onNavigate: (page: Page, user?: User) => void;
  currentUser: User;
  onCompose: () => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; onClick?: () => void }> = ({ icon, label, onClick }) => (
  <button onClick={onClick} className="flex items-center space-x-4 p-3 rounded-full hover:bg-[var(--bg-secondary)] transition-colors duration-200 w-full text-left">
    {icon}
    <span className="text-xl hidden lg:inline">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, currentUser, onCompose }) => {
  return (
    <header className="w-[88px] lg:w-[275px] h-screen flex flex-col justify-between p-2 sticky top-0">
      <div className="flex flex-col items-start space-y-1">
        <div className="p-3 text-sky-400">
            <TallkaIcon className="w-8 h-8"/>
        </div>
        <NavItem icon={<HomeIcon className="w-7 h-7" />} label="Home" onClick={() => onNavigate('home')} />
        <NavItem icon={<ExploreIcon className="w-7 h-7" />} label="Explore" onClick={() => onNavigate('explore')} />
        <NavItem icon={<NotificationsIcon className="w-7 h-7" />} label="Notifications" onClick={() => onNavigate('notifications')} />
        <NavItem icon={<MessagesIcon className="w-7 h-7" />} label="Messages" onClick={() => onNavigate('messages')} />
        <NavItem icon={<BookmarkIcon className="w-7 h-7" />} label="Bookmarks" onClick={() => onNavigate('bookmarks')} />
        <NavItem icon={<ListIcon className="w-7 h-7" />} label="Lists" onClick={() => onNavigate('lists')} />
        <NavItem icon={<MomentsIcon className="w-7 h-7" />} label="Moments" onClick={() => onNavigate('moments')} />
        <NavItem icon={<CommunitiesIcon className="w-7 h-7" />} label="Communities" onClick={() => onNavigate('communities')} />
        <NavItem icon={<SpacesIcon className="w-7 h-7" />} label="Spaces" onClick={() => onNavigate('spaces')} />
        <NavItem icon={<PremiumIcon className="w-7 h-7" />} label="Premium" onClick={() => onNavigate('premium')} />
        <NavItem icon={<ProfileIcon className="w-7 h-7" />} label="Profile" onClick={() => onNavigate('profile', currentUser)} />
        <NavItem icon={<SettingsIcon className="w-7 h-7" />} label="Settings" onClick={() => onNavigate('settings')} />
        
        <button onClick={onCompose} className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-full mt-4 w-full text-lg hidden lg:block">
          Tallk
        </button>
        <button onClick={onCompose} className="bg-sky-500 hover:bg-sky-600 text-white font-bold p-3 rounded-full mt-4 lg:hidden">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
        </button>
      </div>
      <div className="mb-4">
        <button className="flex items-center w-full p-2 rounded-full hover:bg-[var(--bg-secondary)] transition-colors duration-200">
          <div className={`relative ${currentUser.hasActiveStory ? 'ring-2 ring-offset-2 ring-offset-[var(--bg-primary)] ring-sky-400 rounded-full' : ''}`}>
             <img src={currentUser.avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
          </div>
          <div className="ml-3 hidden lg:block text-left">
            <p className="font-bold text-sm">{currentUser.name}</p>
            <p className="text-[var(--text-secondary)] text-sm">@{currentUser.username}</p>
          </div>
          <div className="ml-auto hidden lg:block">
            <MoreIcon className="w-5 h-5"/>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Sidebar;