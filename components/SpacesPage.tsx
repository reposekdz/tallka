import React from 'react';
import { mockSpaces } from '../data/mockData';
import type { Space, User } from '../types';
import { SpacesIcon } from './IconComponents';

interface SpacesPageProps {
  onNavigate: (page: 'profile', user: User) => void;
}

const SpaceCard: React.FC<{ space: Space; onNavigate: (page: 'profile', user: User) => void; }> = ({ space, onNavigate }) => (
  <div className="p-4 border-b border-slate-800 cursor-pointer hover:bg-slate-900/50 transition-colors duration-200">
    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="flex items-center text-sm space-x-2">
        <SpacesIcon className="w-5 h-5" />
        <span className="font-bold">{space.isRecorded ? 'RECORDED' : 'LIVE'}</span>
      </div>
      <h3 className="font-bold text-2xl mt-2">{space.title}</h3>
      <div className="mt-4">
        <p className="text-xs uppercase font-bold opacity-70">Hosts</p>
        <div className="flex items-center space-x-2 mt-1">
            {space.hosts.map(host => (
              <div key={host.id} onClick={(e) => { e.stopPropagation(); onNavigate('profile', host)}} className="flex items-center space-x-2 hover:underline">
                <img src={host.avatar} alt={host.name} className="w-8 h-8 rounded-full" />
                <span className="text-sm font-bold">{host.name}</span>
              </div>
            ))}
        </div>
      </div>
       {space.speakers && space.speakers.length > 0 && (
         <div className="mt-2">
            <p className="text-xs uppercase font-bold opacity-70">Speakers</p>
            <div className="flex items-center space-x-2 mt-1">
                {space.speakers.map(speaker => (
                  <div key={speaker.id} onClick={(e) => { e.stopPropagation(); onNavigate('profile', speaker)}} className="flex items-center space-x-2 hover:underline">
                    <img src={speaker.avatar} alt={speaker.name} className="w-6 h-6 rounded-full" />
                  </div>
                ))}
            </div>
        </div>
       )}
      <p className="text-sm mt-2 opacity-80">{space.listeners.toLocaleString()} listening</p>
    </div>
  </div>
);

const SpacesPage: React.FC<SpacesPageProps> = ({ onNavigate }) => {
  return (
    <div>
      <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-md z-10 p-4 border-b border-slate-800 flex justify-between items-center">
        <h1 className="text-xl font-bold">Spaces</h1>
        <button className="bg-purple-500 text-white font-bold px-4 py-1.5 rounded-full text-sm">Host a Space</button>
      </div>
      <div>
        <div className="p-4">
          <h2 className="text-lg font-bold">Happening Now</h2>
        </div>
        {mockSpaces.map(space => (
          <SpaceCard key={space.id} space={space} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
};

export default SpacesPage;