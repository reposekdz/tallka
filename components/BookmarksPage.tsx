import React from 'react';
import TallkPost from './TallkPost';
import type { Tallk, User } from '../types';

interface BookmarksPageProps {
  bookmarkedTallks: Tallk[];
  onNavigate: (page: 'profile' | 'tallkDetail', data?: User | Tallk) => void;
  bookmarks: Set<string>;
  onToggleBookmark: (tallkId: string) => void;
  onReply: (tallk: Tallk) => void;
}

const BookmarksPage: React.FC<BookmarksPageProps> = ({ bookmarkedTallks, onNavigate, bookmarks, onToggleBookmark, onReply }) => {
  return (
    <div>
      <div className="sticky top-0 bg-[var(--bg-primary)] bg-opacity-80 backdrop-blur-md z-10 p-4 border-b border-[var(--border-color)]">
        <h1 className="text-xl font-bold">Bookmarks</h1>
        <p className="text-sm text-[var(--text-secondary)]">@{mockUser.username}</p>
      </div>
      <div>
        {bookmarkedTallks.length > 0 ? (
          bookmarkedTallks.map(tallk => (
            <TallkPost 
              key={tallk.id} 
              tallk={tallk} 
              onNavigate={onNavigate} 
              isBookmarked={bookmarks.has(tallk.id)}
              onToggleBookmark={onToggleBookmark}
              onReply={onReply}
            />
          ))
        ) : (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold">Save Tallks for later</h2>
            <p className="text-[var(--text-secondary)] mt-2">Don’t let the good ones fly away! Bookmark Tallks to easily find them again in the future.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const mockUser = {
  username: 'kigalicoder'
};

export default BookmarksPage;