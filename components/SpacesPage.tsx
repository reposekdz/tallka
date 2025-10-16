import React from 'react';
import { mockSpaces } from '../data/mockData';
import type { Space } from '../types';
import { MoreIcon } from './IconComponents';

const SpaceCard: React.FC<{ space: Space }> = ({ space }) => (
    <div className="p-4 border-2 border-purple-500 rounded-2xl space-y-2 cursor-pointer hover:bg-purple-500/10">
        <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                <span className="text-sm font-semibold text-purple-400">LIVE</span>
                {space.isRecording && <div className="w-2 h-2 rounded-full bg-red-500"></div>}
            </div>
            <MoreIcon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold">{space.title}</h3>
        <div className="flex -space-x-2">
            {[...space.hosts, ...space.speakers].slice(0, 3).map(user => (
                <img key={user.id} src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full border-2 border-slate-900" />
            ))}
        </div>
        <p className="text-sm text-slate-400">{space.listenerCount} listening</p>
    </div>
);

const SpacesPage: React.FC = () => {
  return (
    <div>
        <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-md z-10 p-4 border-b border-slate-800">
            <h1 className="text-xl font-bold">Spaces</h1>
        </div>
        <div className="p-4 space-y-4">
             {mockSpaces.map(space => (
                <SpaceCard key={space.id} space={space} />
             ))}
        </div>
    </div>
  );
};

export default SpacesPage;
