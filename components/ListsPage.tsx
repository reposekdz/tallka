import React, { useState } from 'react';
import { mockLists } from '../data/mockData';
import type { User, UserList, Tallk } from '../types';
import { ListIcon } from './IconComponents';
import TallkPost from './TallkPost';

interface ListsPageProps {
  onNavigate: (page: 'profile' | 'tallkDetail', data?: User | Tallk) => void;
  userLists: UserList[];
  tallks: Tallk[];
  currentUser: User;
  bookmarks: Set<string>;
  onToggleBookmark: (tallkId: string) => void;
  onReply: (tallk: Tallk) => void;
  onQuote: (tallk: Tallk) => void;
  onLike: (tallkId: string) => void;
}

const ListsPage: React.FC<ListsPageProps> = ({ onNavigate, userLists, tallks, currentUser, bookmarks, onToggleBookmark, onReply, onQuote, onLike }) => {
  const [selectedList, setSelectedList] = useState<UserList | null>(null);

  const ListItem: React.FC<{ list: UserList, onSelectList: (list: UserList) => void }> = ({ list, onSelectList }) => (
    <div onClick={() => onSelectList(list)} className="p-4 flex items-center space-x-4 border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)]/50 cursor-pointer">
        <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center">
            <ListIcon className="w-8 h-8 text-slate-500" />
        </div>
        <div>
            <h3 className="font-bold">{list.name}</h3>
            <p className="text-sm text-[var(--text-secondary)]">{list.owner.name} · @{list.owner.username}</p>
        </div>
    </div>
  );
  
  const ListView: React.FC = () => {
    const listMemberIds = new Set(selectedList?.members.map(m => m.id));
    const listTallks = tallks.filter(t => listMemberIds.has(t.author.id));

    return (
        <div>
            <div className="sticky top-0 bg-[var(--bg-primary)] bg-opacity-80 backdrop-blur-md z-10 p-4 border-b border-[var(--border-color)] flex items-center space-x-4">
                 <button onClick={() => setSelectedList(null)} className="hover:bg-[var(--bg-secondary)] rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                 </button>
                 <div>
                    <h1 className="text-xl font-bold">{selectedList?.name}</h1>
                    <p className="text-sm text-[var(--text-secondary)]">@{currentUser.username}</p>
                 </div>
            </div>
            {listTallks.map(tallk => (
                <TallkPost 
                    key={tallk.id}
                    tallk={tallk}
                    currentUser={currentUser}
                    onNavigate={onNavigate}
                    isBookmarked={bookmarks.has(tallk.id)}
                    onToggleBookmark={onToggleBookmark}
                    onReply={onReply}
                    onQuote={onQuote}
                    onLike={onLike}
                />
            ))}
        </div>
    );
  };
  
  if (selectedList) {
      return <ListView />;
  }

  return (
    <div>
      <div className="sticky top-0 bg-[var(--bg-primary)] bg-opacity-80 backdrop-blur-md z-10 p-4 border-b border-[var(--border-color)] flex justify-between items-center">
        <div>
            <h1 className="text-xl font-bold">Lists</h1>
            <p className="text-sm text-[var(--text-secondary)]">@{currentUser.username}</p>
        </div>
        <button className="fb-bg-blue text-white font-bold px-4 py-1.5 rounded-full text-sm fb-hover-bg-blue">Create new List</button>
      </div>
      <div>
        <div className="p-4 border-b border-[var(--border-color)]">
            <h2 className="text-lg font-bold">Your Lists</h2>
        </div>
        {userLists.map(list => (
            <ListItem key={list.id} list={list} onSelectList={setSelectedList} />
        ))}
      </div>
    </div>
  );
};

export default ListsPage;
