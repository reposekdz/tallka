import React, { useState } from 'react';
import type { Tallk, User } from '../types';
import { ReplyIcon, RetallkIcon, LikeIcon, ShareIcon, BookmarkIcon, AnalyticsIcon, MoreIcon } from './IconComponents';

interface TallkPostProps {
  tallk: Tallk;
  currentUser: User;
  onNavigate: (page: 'profile' | 'tallkDetail' | 'analytics', data?: User | Tallk) => void;
  isBookmarked: boolean;
  onToggleBookmark: (tallkId: string) => void;
  onReply: (tallk: Tallk) => void;
  onQuote: (tallk: Tallk) => void;
  onLike: (tallkId: string) => void;
  isDetailView?: boolean;
  isThread?: boolean;
}

const TallkPost: React.FC<TallkPostProps> = ({ tallk, currentUser, onNavigate, isBookmarked, onToggleBookmark, onReply, onQuote, onLike, isDetailView, isThread }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(tallk.likes);

    const handleLike = () => {
        onLike(tallk.id);
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    };

    const formatTimestamp = (timestamp: string) => {
        // In a real app, this would be a proper date formatting function
        return `· ${timestamp}`;
    }
    
    const renderContent = (content: string) => {
        const parts = content.split(/([#@]\w+)/g);
        return parts.map((part, index) => {
            if (part.startsWith('#') || part.startsWith('@')) {
                return <span key={index} className="text-sky-500 cursor-pointer hover:underline">{part}</span>;
            }
            return part;
        });
    };

    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

    const ActionButton: React.FC<{ icon: React.ReactNode; count?: number; colorClass: string; hoverBgClass: string; onClick: (e: React.MouseEvent) => void; }> = ({ icon, count, colorClass, hoverBgClass, onClick }) => (
        <button onClick={onClick} className={`flex items-center space-x-2 ${colorClass} group`}>
            <div className={`p-2 rounded-full ${hoverBgClass} transition-colors duration-200`}>
                {icon}
            </div>
            {count !== undefined && <span className="text-sm group-hover:text-inherit">{count > 0 ? count : ''}</span>}
        </button>
    );

  return (
    <div className={`p-4 border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)]/30 transition-colors duration-200 cursor-pointer ${isDetailView ? '' : ' '}`} onClick={() => !isDetailView && onNavigate('tallkDetail', tallk)}>
       {isThread && <div className="ml-6 border-l-2 border-[var(--border-color)] h-8"></div>}
      <div className="flex space-x-4">
        <div className="flex-shrink-0" onClick={(e) => { stopPropagation(e); onNavigate('profile', tallk.author)}}>
          <img src={tallk.author.avatar} alt={tallk.author.name} className="w-12 h-12 rounded-full" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1" onClick={(e) => { stopPropagation(e); onNavigate('profile', tallk.author)}}>
              <span className="font-bold hover:underline">{tallk.author.name}</span>
              <span className="text-[var(--text-secondary)]">@{tallk.author.username}</span>
              <span className="text-[var(--text-secondary)]">{formatTimestamp(tallk.timestamp)}</span>
            </div>
            <div className="text-[var(--text-secondary)]" onClick={stopPropagation}><MoreIcon className="w-5 h-5"/></div>
          </div>
          <div className="mt-1">{renderContent(tallk.content)}</div>
          {tallk.image && (
            <div className="mt-2 pr-4">
                <img src={tallk.image} alt="Tallk image" className="rounded-2xl border border-[var(--border-color)] w-full object-cover" />
            </div>
          )}
          {tallk.isPromoted && <p className="text-xs text-[var(--text-secondary)] mt-2">Promoted</p>}
          <div className={`flex justify-between items-center mt-3 max-w-md ${isDetailView ? 'border-y border-[var(--border-color)] py-2' : ''}`}>
             <ActionButton icon={<ReplyIcon className="w-5 h-5"/>} count={tallk.replies.length} colorClass="text-[var(--text-secondary)]" hoverBgClass="group-hover:bg-sky-500/10" onClick={(e) => { stopPropagation(e); onReply(tallk); }} />
             <ActionButton icon={<RetallkIcon className="w-5 h-5"/>} count={tallk.retallks} colorClass="text-[var(--text-secondary)]" hoverBgClass="group-hover:bg-green-500/10" onClick={(e) => { stopPropagation(e); onQuote(tallk); }} />
             <ActionButton icon={<LikeIcon className={`w-5 h-5 ${isLiked ? 'text-pink-500 fill-current' : ''}`}/>} count={likeCount} colorClass={isLiked ? "text-pink-500" : "text-[var(--text-secondary)]"} hoverBgClass="group-hover:bg-pink-500/10" onClick={(e) => { stopPropagation(e); handleLike(); }} />
             <div className="flex items-center">
                 <ActionButton icon={<BookmarkIcon className={`w-5 h-5 ${isBookmarked ? 'text-sky-500 fill-current' : ''}`}/>} colorClass={isBookmarked ? "text-sky-500" : "text-[var(--text-secondary)]"} hoverBgClass="group-hover:bg-sky-500/10" onClick={(e) => { stopPropagation(e); onToggleBookmark(tallk.id); }} />
                 <ActionButton icon={<ShareIcon className="w-5 h-5"/>} colorClass="text-[var(--text-secondary)]" hoverBgClass="group-hover:bg-sky-500/10" onClick={stopPropagation} />
                 {tallk.author.id === currentUser.id && <ActionButton icon={<AnalyticsIcon className="w-5 h-5"/>} colorClass="text-[var(--text-secondary)]" hoverBgClass="group-hover:bg-sky-500/10" onClick={(e) => { stopPropagation(e); onNavigate('analytics', tallk); }} />}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TallkPost;
