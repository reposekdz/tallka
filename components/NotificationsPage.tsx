import React, { useState, useMemo } from 'react';
import type { Notification, User } from '../types';
import { mockNotifications } from '../data/mockData';
import { HeartIcon, ProfileIcon, RetallkIcon, VerifiedBadgeIcon } from './IconComponents';

interface NotificationsPageProps {
  onNavigate: (page: 'profile', user: User) => void;
}

const NotificationItem: React.FC<{ notification: Notification; onNavigate: (page: 'profile', user: User) => void; }> = ({ notification, onNavigate }) => {
  const renderIcon = () => {
    switch (notification.type) {
      case 'follow':
        return <ProfileIcon className="w-8 h-8 text-sky-500" />;
      case 'like':
        return <HeartIcon className="w-8 h-8 text-pink-500" />;
      case 'retallk':
        return <RetallkIcon className="w-8 h-8 text-green-500" />;
      case 'mention':
         return <span className="font-bold text-2xl text-purple-500">@</span>;
      case 'quote':
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
      case 'reply':
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
    }
  };

  const renderText = () => {
    const userName = <span className="font-bold hover:underline cursor-pointer" onClick={() => onNavigate('profile', notification.user)}>{notification.user.name}</span>;
    switch (notification.type) {
      case 'follow':
        return <>{userName} followed you</>;
      case 'like':
        return <>{userName} liked your Tallk</>;
      case 'retallk':
        return <>{userName} retalked your Tallk</>;
      case 'reply':
        return <>{userName} replied to your Tallk</>;
       case 'mention':
        return <>{userName} mentioned you in a Tallk</>;
       case 'quote':
        return <>{userName} quoted your Tallk</>;
    }
  };

  return (
    <div className="p-4 flex space-x-4 border-b border-slate-800 hover:bg-slate-900/20 transition-colors duration-200">
      <div className="w-8 flex justify-center items-start pt-2">{renderIcon()}</div>
      <div className="flex-1">
        <img src={notification.user.avatar} alt={notification.user.name} className="w-8 h-8 rounded-full mb-2" />
        <p>{renderText()}</p>
        {notification.tallk && <p className="text-slate-500 mt-1">{notification.tallk.content}</p>}
      </div>
    </div>
  );
};


const NotificationsPage: React.FC<NotificationsPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'verified' | 'mentions'>('all');
  
  const filteredNotifications = useMemo(() => {
    switch(activeTab) {
        case 'verified':
            return mockNotifications.filter(n => n.user.isVerified);
        case 'mentions':
            return mockNotifications.filter(n => n.type === 'mention' || n.type === 'quote');
        case 'all':
        default:
            return mockNotifications;
    }
  }, [activeTab]);

  const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
    <button onClick={onClick} className="flex-1 py-4 text-center hover:bg-slate-900/50 transition-colors duration-200">
        <span className={`font-bold ${isActive ? 'text-white border-b-4 border-sky-500' : 'text-slate-500'} pb-4`}>
            {label}
        </span>
    </button>
  );

  return (
    <div>
      <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-md z-10">
        <div className="p-4 border-b border-slate-800">
            <h1 className="text-xl font-bold">Notifications</h1>
        </div>
        <div className="flex border-b border-slate-800">
            <TabButton label="All" isActive={activeTab === 'all'} onClick={() => setActiveTab('all')} />
            <TabButton label="Verified" isActive={activeTab === 'verified'} onClick={() => setActiveTab('verified')} />
            <TabButton label="Mentions" isActive={activeTab === 'mentions'} onClick={() => setActiveTab('mentions')} />
        </div>
      </div>
      <div>
        {filteredNotifications.map(notification => (
          <NotificationItem key={notification.id} notification={notification} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;