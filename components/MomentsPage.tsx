import React from 'react';
import { mockMoments } from '../data/mockData';
import type { User, Moment } from '../types';
import { MomentsIcon } from './IconComponents';

interface MomentsPageProps {
  onNavigate: (page: 'profile', user: User) => void;
}

const MomentCard: React.FC<{ moment: Moment }> = ({ moment }) => (
    <div className="border-b border-slate-800 hover:bg-slate-900/50 cursor-pointer">
        <div className="h-48 bg-slate-700 relative" style={{ backgroundImage: `url(${moment.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent p-4 flex flex-col justify-end">
                <h3 className="font-bold text-xl">{moment.title}</h3>
                <p className="text-sm text-slate-300">{moment.description}</p>
            </div>
        </div>
    </div>
);

const MomentsPage: React.FC<MomentsPageProps> = ({ onNavigate }) => {
  return (
    <div>
      <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-md z-10 p-4 border-b border-slate-800">
        <h1 className="text-xl font-bold">Moments</h1>
      </div>
      <div>
        <div className="p-4">
            <h2 className="text-lg font-bold">Today's Moments</h2>
        </div>
        {mockMoments.map(moment => (
            <MomentCard key={moment.id} moment={moment}/>
        ))}
      </div>
    </div>
  );
};

export default MomentsPage;
