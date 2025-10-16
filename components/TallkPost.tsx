import React, { useState } from 'react';
import type { Tallk, User, Poll, PollOption } from '../types';
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

const PollDisplay: React.FC<{ poll: Poll }> = ({ poll }) => {
    const [votedOption, setVotedOption] = useState<number | null>(null);
    const [pollData, setPollData] = useState(poll);

    const totalVotes = pollData.options.reduce((acc, option) => acc + option.votes, 0);

    const handleVote = (optionId: number) => {
        if (votedOption) return;
        setVotedOption(optionId);
        // In a real app, this would be an API call. Here we just update local state.
        setPollData(prevData => ({
            ...prevData,
            options: prevData.options.map(opt => 
                opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
            ),
        }));
    };
    
    return (
        <div className="mt-3 pr-4 space-y-2">
            {pollData.options.map(option => {
                const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                const isVotedFor = votedOption === option.id;
                
                return (
                    <button key={option.id} onClick={() => handleVote(option.id)} disabled={!!votedOption} className="w-full text-left">
                        {votedOption ? (
                            <div className="relative border border-[var(--border-color)] rounded-md p-2">
                                <div className="absolute top-0 left-0 h-full bg-sky-500/20 rounded-md" style={{ width: `${percentage}%` }}></div>
                                <div className="relative flex justify-between">
                                    <span className={`font-semibold ${isVotedFor ? 'text-[var(--text-primary)]' : ''}`}>{option.text}</span>
                                    <span>{percentage}%</span>
                                </div>
                            </div>
                        ) : (
                            <div className="border border-[var(--border-color)] rounded-md p-2 hover:bg-[var(--bg-secondary)]">
                                <span className="font-semibold">{option.text}</span>
                            </div>
                        )}
                    </button>
                );
            })}
            <div className="text-sm text-[var(--text-secondary)]">
                <span>{totalVotes.toLocaleString()} votes</span>
                <span className="mx-1">·</span>
                <span>Poll ends in {pollData.endsAt}</span>
            </div>
        </div>
    );
};


const TallkPost: React.FC<TallkPostProps> = ({ tallk, currentUser, onNavigate, isBookmarked, onToggleBookmark, onReply, onQuote, onLike, isDetailView, isThread }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(tallk.likes);

    const handleLike = () => {
        onLike(tallk.id);
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    };

    const formatTimestamp = (timestamp: string) => {
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
    <div className={`p-4 border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)]/30 transition-colors duration-200 cursor-pointer`} onClick={() => !isDetailView && onNavigate('tallkDetail', tallk)}>
       {isThread && <div className="ml-6 border-l-2 border-[var(--border-color)] h-8"></div>}
      <div className="flex space-x-4">
        <div className="flex-shrink-0" onClick={(e) => { stopPropagation(e); onNavigate('profile', tallk.author)}}>
          <img src={tallk.author.avatar} alt={tallk.author.name} className="w-12 h-12 rounded-full" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1" onClick={(e) => { stopPropagation(e); onNavigate('profile', tallk.author)}}>
              <span className="font-bold hover:underline">{tallk.author.name}</span>
              {tallk.author.verified && <svg className="w-4 h-4 ml-1 text-sky-500" fill="currentColor" viewBox="0 0 24 24"><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39-.2-2.9-1.59-3.66-1.39-.76-3.08-.36-4.15.82-.63-.26-1.3-.44-2- .51-1.39-.13-2.79.43-3.66 1.59-.76 1.39-.36 3.08.82 4.15-.26.63-.44 1.3-.51 2-.13 1.39.43 2.79 1.59 3.66.76 1.39 2.33 2.16 3.66 1.59 1.39-.76 2.16-2.33 1.59-3.66.26-.63.44-1.3.51-2 .13-1.39-.43-2.79-1.59-3.66-.56-.99-1.63-1.59-2.81-1.59-.3 0-.59.05-.87.14l.01.01-1.3 2.89-2.9-1.3.01.01c-.87-.39-1.84-.2-2.58.48-.99.99-.99 2.6 0 3.59l3.29 3.29 1.29 1.29c.18.18.43.29.71.29.28 0 .53-.11.71-.29l6.29-6.29c.99-.99.99-2.6 0-3.59-.74-.78-1.71-.98-2.58-.49z" /></svg>}
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
          {tallk.poll && <PollDisplay poll={tallk.poll} />}
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