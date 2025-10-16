import React, { useState } from 'react';
import { mockNotifications } from '../data/mockData';
import { LikeIcon, RetallkIcon, ProfileIcon } from './IconComponents';
import type { Notification } from '../types';

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
    const { type, user, tallk, timestamp } = notification;

    const renderIcon = () => {
        switch (type) {
            case 'like': return <LikeIcon className="w-6 h-6 text-pink-500" />;
            case 'retallk': return <RetallkIcon className="w-6 h-6 text-green-500" />;
            case 'follow': return <ProfileIcon className="w-6 h-6 text-sky-500" />;
            default: return null;
        }
    };

    const renderText = () => {
        switch (type) {
            case 'like': return <><span className="font-bold">{user.name}</span> liked your Tallk</>;
            case 'retallk': return <><span className="font-bold">{user.name}</span> Retallked your Tallk</>;
            case 'follow': return <><span className="font-bold">{user.name}</span> followed you</>;
            case 'reply': return <><span className="font-bold">{user.name}</span> replied to your Tallk</>;
            case 'mention': return <><span className="font-bold">{user.name}</span> mentioned you in a Tallk</>;
            default: return null;
        }
    };

    return (
        <div className="flex p-4 border-b border-slate-800 hover:bg-slate-900/50 cursor-pointer">
            <div className="w-12 mr-4">{renderIcon()}</div>
            <div className="flex-1">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mb-2" />
                <p>{renderText()}</p>
                {tallk && <p className="text-slate-500 mt-1">{tallk.content}</p>}
            </div>
        </div>
    );
};

const NotificationsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('all');

    const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
        <button onClick={onClick} className="flex-1 py-4 text-center hover:bg-slate-900/50 transition-colors duration-200">
          <span className={`font-bold ${isActive ? 'text-white border-b-4 border-sky-500' : 'text-slate-500'} pb-4`}>
            {label}
          </span>
        </button>
      );
    
  return (
    <div>
      <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-md z-10">
        <h1 className="text-xl font-bold p-4">Notifications</h1>
        <div className="flex border-b border-slate-800">
            <TabButton label="All" isActive={activeTab === 'all'} onClick={() => setActiveTab('all')} />
            <TabButton label="Verified" isActive={activeTab === 'verified'} onClick={() => setActiveTab('verified')} />
            <TabButton label="Mentions" isActive={activeTab === 'mentions'} onClick={() => setActiveTab('mentions')} />
        </div>
      </div>
      <div>
        {mockNotifications.map(notification => (
            <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
