import React from 'react';
import { mockTrends, usersToFollow } from '../data/mockData';
import { MoreIcon } from './IconComponents';
import type { User, Trend } from '../types';

interface RightSidebarProps {
  onNavigate: (page: 'profile', user: User) => void;
}

const TrendCard: React.FC<{ trend: Trend }> = ({ trend }) => (
    <div 
        className="relative h-24 rounded-2xl overflow-hidden cursor-pointer group p-3 flex flex-col justify-end"
    >
        <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundImage: `url(${trend.image})` }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-white">
            <p className="text-xs">Trending</p>
            <p className="font-bold text-sm leading-tight">{trend.name}</p>
            <p className="text-xs text-gray-300">{trend.tallks}</p>
        </div>
    </div>
);

const RightSidebar: React.FC<RightSidebarProps> = ({ onNavigate }) => {
  return (
    <aside className="w-[350px] ml-8 hidden xl:block">
      <div className="sticky top-0 py-4">
        <input
          type="text"
          placeholder="Search Tallka"
          className="w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-full px-4 py-2 placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="bg-[var(--bg-secondary)] rounded-xl mt-4 p-4">
          <h2 className="text-xl font-bold mb-4">Trends for you</h2>
          <div className="grid grid-cols-2 gap-3">
            {mockTrends.map((trend, index) => (
              <TrendCard key={index} trend={trend} />
            ))}
          </div>
           <div className="pt-4 text-blue-500 hover:bg-[var(--bg-secondary)]/50 rounded-b-xl cursor-pointer">Show more</div>
        </div>

        <div className="bg-[var(--bg-secondary)] rounded-xl mt-4">
          <h2 className="text-xl font-bold p-4">Who to follow</h2>
          {usersToFollow.map((user) => (
            <div key={user.id} className="p-4 flex items-center justify-between hover:bg-[var(--bg-secondary)]/50 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full cursor-pointer" onClick={() => onNavigate('profile', user)}/>
                <div>
                  <p className="font-bold hover:underline cursor-pointer" onClick={() => onNavigate('profile', user)}>{user.name}</p>
                  <p className="text-[var(--text-secondary)]">@{user.username}</p>
                </div>
              </div>
              <button className="bg-white text-black font-bold px-4 py-1.5 rounded-full hover:bg-gray-200 transition-colors">Follow</button>
            </div>
          ))}
          <div className="p-4 text-blue-500 hover:bg-[var(--bg-secondary)]/50 rounded-b-xl cursor-pointer">Show more</div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
