import React from 'react';
import { mockLists } from '../data/mockData';
import type { User, UserList } from '../types';
import { ListIcon } from './IconComponents';

interface ListsPageProps {
  onNavigate: (page: 'profile', user: User) => void;
}

const ListItem: React.FC<{ list: UserList }> = ({ list }) => (
    <div className="p-4 flex items-center space-x-4 border-b border-slate-800 hover:bg-slate-900/50 cursor-pointer">
        <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center">
            <ListIcon className="w-8 h-8 text-slate-500" />
        </div>
        <div>
            <h3 className="font-bold">{list.name}</h3>
            <p className="text-sm text-slate-500">{list.description}</p>
            <p className="text-sm text-slate-500">{list.members.length} Members</p>
        </div>
    </div>
);

const ListsPage: React.FC<ListsPageProps> = ({ onNavigate }) => {
  return (
    <div>
      <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-md z-10 p-4 border-b border-slate-800 flex justify-between items-center">
        <div>
            <h1 className="text-xl font-bold">Lists</h1>
            <p className="text-sm text-slate-500">@kigalicoder</p>
        </div>
        <button className="bg-sky-500 text-white font-bold px-4 py-1.5 rounded-full text-sm">Create new List</button>
      </div>
      <div>
        <div className="p-4 border-b border-slate-800">
            <h2 className="text-lg font-bold">Your Lists</h2>
        </div>
        {mockLists.map(list => (
            <ListItem key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
};

export default ListsPage;
