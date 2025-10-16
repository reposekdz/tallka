import React from 'react';
import type { Tallk, User } from '../types';
import TallkPost from './TallkPost';

interface AnalyticsPageProps {
  tallk: Tallk;
  // Fix: Broaden `onNavigate` type to allow navigating to 'home' and make the user parameter optional.
  onNavigate: (page: 'profile' | 'home', user?: User) => void;
}

const StatCard: React.FC<{ label: string; value: string; icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="bg-slate-900 p-4 rounded-lg flex items-start space-x-3">
        <div className="text-sky-400">{icon}</div>
        <div>
            <p className="text-sm text-slate-400">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ tallk, onNavigate }) => {
  // Dummy data for analytics
  const impressions = 18450;
  const engagements = 743;
  const profileVisits = 98;

  return (
    <div>
       <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-md z-10 p-4 border-b border-slate-800 flex items-center space-x-4">
         <button onClick={() => onNavigate('home')} className="hover:bg-slate-800 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
         </button>
         <h1 className="text-xl font-bold">Tallk Analytics</h1>
      </div>

      <div className="p-4 border-b border-slate-800">
         <div className="flex items-center space-x-3">
            <img src={tallk.author.avatar} alt={tallk.author.name} className="w-10 h-10 rounded-full" />
            <div>
               <p className="font-bold">{tallk.author.name}</p>
               <p className="text-sm text-slate-500">@{tallk.author.username}</p>
            </div>
         </div>
         <p className="mt-3">{tallk.content}</p>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Performance</h2>
        <div className="grid grid-cols-2 gap-4">
            <StatCard label="Impressions" value={impressions.toLocaleString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>} />
            <StatCard label="Engagements" value={engagements.toLocaleString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
            <StatCard label="Likes" value={tallk.likes.toLocaleString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>} />
            <StatCard label="Retallks" value={tallk.retallks.toLocaleString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 12L3 8m4 8l4-8m4 8V4m0 12l4-8m-4 8L7 8" /></svg>} />
            <StatCard label="Replies" value={tallk.replies.length.toLocaleString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>} />
            <StatCard label="Profile Visits" value={profileVisits.toLocaleString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;