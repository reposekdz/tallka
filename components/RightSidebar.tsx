import React from 'react';
import { mockTrends, usersToFollow } from '../data/mockData';
import { MoreIcon } from './IconComponents';
import type { User } from '../types';

interface RightSidebarProps {
  onNavigate: (page: 'profile', user: User) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ onNavigate }) => {
  return (
    <aside className="w-[350px] ml-8 hidden xl:block">
      <div className="sticky top-0 py-4">
        <input
          type="text"
          placeholder="Search Tallka"
          className="w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-full px-4 py-2 placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <div className="bg-[var(--bg-secondary)] rounded-xl mt-4">
          <h2 className="text-xl font-bold p-4">Trends for you</h2>
          {mockTrends.map((trend, index) => (
            <div key={index} className="p-4 hover:bg-[var(--bg-secondary)]/50 transition-colors duration-200 cursor-pointer">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">Trending</p>
                  <p className="font-bold">{trend.name}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{trend.tallks}</p>
                </div>
                <MoreIcon className="w-5 h-5 text-[var(--text-secondary)]" />
              </div>
            </div>
          ))}
           <div className="p-4 text-sky-500 hover:bg-[var(--bg-secondary)]/50 rounded-b-xl cursor-pointer">Show more</div>
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
              <button className="bg-white text-black font-bold px-4 py-1.5 rounded-full">Follow</button>
            </div>
          ))}
          <div className="p-4 text-sky-500 hover:bg-[var(--bg-secondary)]/50 rounded-b-xl cursor-pointer">Show more</div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;