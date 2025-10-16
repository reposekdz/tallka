import React from 'react';
import { mockTrends, mockSpaces, mockMoments } from '../data/mockData';
import { MoreIcon, SpacesIcon } from './IconComponents';
import type { Space, Moment, User } from '../types';

interface ExplorePageProps {
  onNavigate: (page: 'profile' | 'moments', data?: User | Moment) => void;
}

const SpaceItem: React.FC<{space: Space}> = ({ space }) => (
    <div className="p-4 hover:bg-slate-900/20 transition-colors duration-200 cursor-pointer">
        <div className="flex items-center text-sm text-slate-500 space-x-2">
            <SpacesIcon className="w-4 h-4 text-purple-400"/>
            <span>{space.isRecorded ? 'Recorded' : 'Live'}</span>
        </div>
        <h3 className="font-bold mt-1">{space.title}</h3>
        <div className="flex items-center space-x-2 mt-2">
            {space.hosts.slice(0, 2).map(host => (
                 <img key={host.id} src={host.avatar} alt={host.name} className="w-6 h-6 rounded-full"/>
            ))}
            <span className="text-sm text-slate-500">{space.listeners.toLocaleString()} listening</span>
        </div>
    </div>
);

const MomentItem: React.FC<{moment: Moment}> = ({ moment }) => (
    <div className="p-4 hover:bg-slate-900/20 transition-colors duration-200 cursor-pointer flex space-x-4">
        <div className="flex-1">
            <p className="text-sm text-slate-500">Moment · LIVE</p>
            <h3 className="font-bold mt-1">{moment.title}</h3>
        </div>
        <img src={moment.coverImage} alt={moment.title} className="w-24 h-24 rounded-2xl object-cover"/>
    </div>
);


const ExplorePage: React.FC<ExplorePageProps> = ({ onNavigate }) => {
  return (
    <div>
      <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-md z-10 p-2 border-b border-slate-800">
         <div className="relative">
            <input
            type="text"
            placeholder="Search Tallka"
            className="w-full bg-slate-900 text-white rounded-full pl-10 pr-4 py-2 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
         </div>
      </div>
      <div className="border-b border-slate-800">
        <img src="https://picsum.photos/seed/explore/600/200" alt="Explore header" className="w-full h-auto" />
      </div>

       <div className="border-b border-slate-800">
        <h2 className="text-xl font-bold p-4">Moments to follow</h2>
        {mockMoments.map(moment => <MomentItem key={moment.id} moment={moment} />)}
         <div className="p-4 text-sky-500 hover:bg-slate-900/20 cursor-pointer">Show more</div>
      </div>
      
      <div className="border-b border-slate-800">
        <h2 className="text-xl font-bold p-4">Spaces happening now</h2>
        {mockSpaces.slice(0, 2).map(space => <SpaceItem key={space.id} space={space} />)}
         <div className="p-4 text-sky-500 hover:bg-slate-900/20 cursor-pointer">Show more</div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold p-4">Trends for you</h2>
        {mockTrends.map((trend, index) => (
          <div key={index} className="p-4 hover:bg-slate-900/20 transition-colors duration-200 cursor-pointer">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-500">Trending</p>
                <p className="font-bold">{trend.name}</p>
                <p className="text-sm text-slate-500">{trend.tallks}</p>
              </div>
              <MoreIcon className="w-5 h-5 text-slate-500" />
            </div>
          </div>
        ))}
        <div className="p-4 text-sky-500 hover:bg-slate-900/20 cursor-pointer">Show more</div>
      </div>
    </div>
  );
};

export default ExplorePage;