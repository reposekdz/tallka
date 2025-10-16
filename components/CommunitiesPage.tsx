import React from 'react';
import { mockCommunities } from '../data/mockData';
import type { Community } from '../types';

const CommunityCard: React.FC<{ community: Community }> = ({ community }) => (
    <div className="border-b border-slate-800 p-4 hover:bg-slate-900/50 cursor-pointer">
        <div className="h-24 bg-slate-700 rounded-lg" style={{ backgroundImage: `url(${community.banner})`, backgroundSize: 'cover' }}></div>
        <h3 className="font-bold text-lg mt-2">{community.name}</h3>
        <p className="text-slate-500 text-sm mt-1">{community.description}</p>
        <p className="text-slate-500 text-sm mt-2">{community.members.toLocaleString()} members</p>
    </div>
);

const CommunitiesPage: React.FC = () => {
  return (
    <div>
      <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-md z-10 p-4 border-b border-slate-800">
        <h1 className="text-xl font-bold">Communities</h1>
      </div>
      <div>
        <div className="p-4">
            <h2 className="text-lg font-bold">Discover new Communities</h2>
        </div>
        {mockCommunities.map(community => (
            <CommunityCard key={community.id} community={community}/>
        ))}
      </div>
    </div>
  );
};

export default CommunitiesPage;
