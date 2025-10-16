import React from 'react';
import type { Tallk, User } from '../types';
import TallkPost from './TallkPost';
import TallkComposer from './TallkComposer';

interface TallkDetailPageProps {
  tallk: Tallk;
  onNavigate: (page: 'profile' | 'home' | 'tallkDetail', data?: User | Tallk) => void;
  bookmarks: Set<string>;
  onToggleBookmark: (tallkId: string) => void;
  onReply: (tallk: Tallk) => void;
  onPostReply: (content: string, parentTallkId: string) => void;
}

const TallkDetailPage: React.FC<TallkDetailPageProps> = ({ tallk, onNavigate, bookmarks, onToggleBookmark, onReply, onPostReply }) => {
  return (
    <div>
      <div className="sticky top-0 bg-[var(--bg-primary)] bg-opacity-80 backdrop-blur-md z-10 p-4 border-b border-[var(--border-color)] flex items-center space-x-4">
         <button onClick={() => onNavigate('home')} className="hover:bg-[var(--bg-secondary)] rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
         </button>
         <h1 className="text-xl font-bold">Thread</h1>
      </div>
      
      <TallkPost 
        tallk={tallk}
        onNavigate={onNavigate}
        isBookmarked={bookmarks.has(tallk.id)}
        onToggleBookmark={onToggleBookmark}
        onReply={onReply}
        isDetailView={true}
      />
      
      <TallkComposer onPostTallk={(content) => onPostReply(content, tallk.id)} replyingTo={tallk} />

      <div className="border-t border-[var(--border-color)]">
        {tallk.replies.map(reply => (
          <TallkPost 
            key={reply.id} 
            tallk={reply} 
            onNavigate={onNavigate} 
            isBookmarked={bookmarks.has(reply.id)}
            onToggleBookmark={onToggleBookmark}
            onReply={onReply}
            isThread={true}
          />
        ))}
      </div>
    </div>
  );
};

export default TallkDetailPage;