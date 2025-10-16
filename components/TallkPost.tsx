import React, { useState, useRef, useEffect } from 'react';
import type { Tallk, User, Poll, Product } from '../types';
import { ReplyIcon, RetallkIcon, LikeIcon, ShareIcon, BookmarkIcon, MoreIcon, BookmarkFillIcon, PinnedIcon, VerifiedBadgeIcon, AnalyticsIcon, EditIcon, BlockIcon, MuteIcon, ReportIcon, VoiceMessageIcon, ShopIcon } from './IconComponents';

interface TallkPostProps {
  tallk: Tallk;
  onNavigate: (page: 'profile' | 'home' | 'analytics' | 'tallkDetail', data?: User | Tallk) => void;
  isBookmarked: boolean;
  onToggleBookmark: (tallkId: string) => void;
  onReply: (tallk: Tallk) => void;
  isThread?: boolean;
  isDetailView?: boolean;
}

const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);

    if (diffSeconds < 60) return `${diffSeconds}s`;
    const diffMinutes = Math.round(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m`;
    const diffHours = Math.round(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const PollDisplay: React.FC<{ poll: Poll }> = ({ poll }) => {
    const [voted, setVoted] = useState(false);
    return (
        <div className="mt-3 space-y-2">
            {poll.options.map((option, index) => (
                <button key={index} onClick={() => setVoted(true)} disabled={voted} className="w-full text-left relative border border-[var(--border-color)] rounded-lg p-3 hover:bg-[var(--bg-secondary)] disabled:cursor-default">
                    {voted && <div className="absolute top-0 left-0 h-full bg-sky-500/20 rounded-lg" style={{ width: `${(option.votes / poll.totalVotes) * 100}%` }}></div>}
                    <div className="relative flex justify-between">
                       <span className="font-bold">{option.label}</span>
                       {voted && <span className="font-bold">{`${Math.round((option.votes / poll.totalVotes) * 100)}%`}</span>}
                    </div>
                </button>
            ))}
            <p className="text-sm text-[var(--text-secondary)]">{poll.totalVotes} votes</p>
        </div>
    )
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <a href={product.storeUrl} target="_blank" rel="noopener noreferrer" className="mt-3 flex border border-[var(--border-color)] rounded-2xl overflow-hidden hover:bg-[var(--bg-secondary)] transition-colors">
        <img src={product.imageUrl} alt={product.name} className="w-1/3 object-cover" />
        <div className="p-3">
            <p className="font-bold">{product.name}</p>
            <p className="text-lg font-bold mt-1">{product.price}</p>
            <div className="flex items-center text-sm text-[var(--text-secondary)] mt-2">
                <ShopIcon className="w-4 h-4 mr-1"/>
                <span>View Shop</span>
            </div>
        </div>
    </a>
)

const VoiceNotePlayer: React.FC<{ src: string }> = ({ src }) => {
  return (
    <div className="mt-3 p-3 flex items-center space-x-3 bg-[var(--bg-secondary)] rounded-full">
        <button className="p-2 bg-sky-500 rounded-full">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M4.018 15.59A1 1 0 005 15.17V4.83a1 1 0 00-1.447-.894l-2 1A1 1 0 001 6v8a1 1 0 00.553.894l2 1 .465.232zM15.89 8.11l-7-4A1 1 0 008 5.17v9.66a1 1 0 00.89.995l7-1a1 1 0 00.9-.995V9a1 1 0 00-.8-.89z"></path></svg>
        </button>
        <div className="w-full h-1 bg-slate-600 rounded-full">
            <div className="w-1/4 h-full bg-sky-500 rounded-full"></div>
        </div>
        <span className="text-sm text-slate-400">0:15</span>
    </div>
  )
}

const QuoteTallk: React.FC<{ tallk: Tallk, onNavigate: (page: 'profile', user: User) => void; }> = ({ tallk, onNavigate }) => {
    return (
        <div className="mt-2 border border-[var(--border-color)] rounded-2xl p-3 cursor-pointer hover:bg-[var(--bg-secondary)]">
            <div className="flex items-center space-x-2 text-sm">
                <img src={tallk.author.avatar} className="w-5 h-5 rounded-full" />
                <span className="font-bold hover:underline" onClick={(e) => { e.stopPropagation(); onNavigate('profile', tallk.author); }}>{tallk.author.name}</span>
                <span className="text-[var(--text-secondary)]">@{tallk.author.username}</span>
            </div>
            <p className="mt-1 text-sm">{tallk.content}</p>
        </div>
    )
}

// Fix: Updated the `onNavigate` prop type to be compatible with the type passed from the `TallkPost` component.
const TallkContent: React.FC<{ content: string, onNavigate: (page: 'profile' | 'home' | 'analytics' | 'tallkDetail', data?: User | Tallk) => void; }> = ({ content, onNavigate }) => {
    const handlePartClick = (e: React.MouseEvent, part: string) => {
        e.stopPropagation();
        if (part.startsWith('@')) {
            // In a real app, you'd look up the user. Here, we can't.
            // onNavigate('profile', foundUser);
            alert(`Navigating to profile ${part}`);
        } else if (part.startsWith('#')) {
            // onNavigate('explore', { query: part });
            alert(`Searching for ${part}`);
        }
    }

    const parts = content.split(/([#@]\w+)/g);
    return (
        <p className="mt-1 whitespace-pre-wrap text-base">
            {parts.map((part, i) =>
                part.match(/([#@]\w+)/) ? (
                    <span key={i} className="text-sky-400 cursor-pointer hover:underline" onClick={(e) => handlePartClick(e, part)}>{part}</span>
                ) : (
                    part
                )
            )}
        </p>
    );
};

const TallkPost: React.FC<TallkPostProps> = ({ tallk, onNavigate, isBookmarked, onToggleBookmark, onReply, isThread, isDetailView }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(tallk.likes);
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    }
    
    const handleBookmark = (e: React.MouseEvent) => {
      e.stopPropagation();
      onToggleBookmark(tallk.id);
    }
    
    const handleReplyClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onReply(tallk);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMoreMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);
  
    const ActionButton: React.FC<{ icon: React.ReactNode; count?: number; colorClass: string; activeColorClass?: string; onClick?: (e: React.MouseEvent) => void, isActive?: boolean }> = ({ icon, count, colorClass, activeColorClass, onClick, isActive }) => (
        <button onClick={onClick} className={`flex items-center space-x-2 ${colorClass} group transition-colors duration-200`}>
            <div className={`p-2 rounded-full group-hover:bg-opacity-20 ${isActive ? activeColorClass : colorClass.replace('text-', 'bg-')} ${isActive ? '' : 'bg-opacity-0'} group-hover:${activeColorClass}`}>
               {icon}
            </div>
            <span className={`group-hover:${activeColorClass?.replace('bg-', 'text-')} ${isActive ? activeColorClass?.replace('bg-', 'text-') : ''}`}>{count !== undefined && count > 0 && count}</span>
        </button>
    );

  return (
    <div onClick={() => !isDetailView && onNavigate('tallkDetail', tallk)} className={`p-4 flex space-x-4 border-b border-[var(--border-color)] ${!isDetailView && 'hover:bg-[var(--bg-secondary)]/30 transition-colors duration-200 cursor-pointer'}`}>
      <div className="flex flex-col items-center flex-shrink-0">
         <div className={`relative ${tallk.author.hasActiveStory ? 'ring-2 ring-offset-2 ring-offset-[var(--bg-primary)] ring-sky-400 rounded-full' : ''}`}>
           <img src={tallk.author.avatar} alt="Author Avatar" className="w-12 h-12 rounded-full cursor-pointer" onClick={(e) => { e.stopPropagation(); onNavigate('profile', tallk.author); }}/>
         </div>
         {(isThread || isDetailView) && <div className="w-0.5 h-full bg-[var(--border-color)] mt-2"></div>}
      </div>
      <div className="flex-1">
        {tallk.isPinned && <div className="text-[var(--text-secondary)] text-sm flex items-center space-x-2 mb-1"><PinnedIcon/><p>Pinned Tallk</p></div>}
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 flex-wrap">
                <span className="font-bold hover:underline cursor-pointer" onClick={(e) => { e.stopPropagation(); onNavigate('profile', tallk.author); }}>{tallk.author.name}</span>
                {tallk.author.isVerified && <VerifiedBadgeIcon className="w-5 h-5 text-sky-400"/>}
                <span className="text-[var(--text-secondary)]">@{tallk.author.username}</span>
                <span className="text-[var(--text-secondary)]">·</span>
                <span className="text-[var(--text-secondary)] hover:underline cursor-pointer">{formatTime(tallk.createdAt)}</span>
            </div>
            <div className="text-[var(--text-secondary)] relative">
                <button onClick={(e) => { e.stopPropagation(); setShowMoreMenu(!showMoreMenu); }} className="p-1 rounded-full hover:bg-sky-500/20 text-[var(--text-secondary)] hover:text-sky-500"><MoreIcon/></button>
                 {showMoreMenu && (
                    <div ref={menuRef} className="absolute top-8 right-0 w-60 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg shadow-lg z-20">
                        <button className="w-full text-left px-4 py-2 hover:bg-[var(--bg-secondary)] flex items-center space-x-2"><EditIcon /><span>Edit Tallk</span></button>
                        <button onClick={(e) => {e.stopPropagation(); alert(`Muting @${tallk.author.username}`)}} className="w-full text-left px-4 py-2 hover:bg-[var(--bg-secondary)] flex items-center space-x-2"><MuteIcon /><span>Mute @{tallk.author.username}</span></button>
                        <button onClick={(e) => {e.stopPropagation(); alert(`Blocking @${tallk.author.username}`)}} className="w-full text-left px-4 py-2 hover:bg-[var(--bg-secondary)] flex items-center space-x-2 text-red-500"><BlockIcon /><span>Block @{tallk.author.username}</span></button>
                        <button onClick={(e) => {e.stopPropagation(); alert(`Reporting Tallk`)}} className="w-full text-left px-4 py-2 hover:bg-[var(--bg-secondary)] flex items-center space-x-2"><ReportIcon /><span>Report Tallk</span></button>
                    </div>
                )}
            </div>
        </div>
        <TallkContent content={tallk.content} onNavigate={onNavigate}/>
        {tallk.image && <img src={tallk.image} alt="Tallk content" className="mt-3 rounded-2xl border border-[var(--border-color)]" />}
        {tallk.videoUrl && <video src={tallk.videoUrl} controls className="mt-3 rounded-2xl border border-[var(--border-color)] w-full"></video>}
        {tallk.voiceNoteUrl && <VoiceNotePlayer src={tallk.voiceNoteUrl} />}
        {tallk.product && <ProductCard product={tallk.product} />}
        {tallk.poll && <PollDisplay poll={tallk.poll} />}
        {tallk.quoteOf && <QuoteTallk tallk={tallk.quoteOf} onNavigate={onNavigate}/>}

        <div className="flex justify-between mt-4 max-w-md text-[var(--text-secondary)]">
           <ActionButton icon={<ReplyIcon/>} count={tallk.replies.length} colorClass="text-[var(--text-secondary)]" activeColorClass="bg-sky-500 text-sky-500" onClick={handleReplyClick} />
           <ActionButton icon={<RetallkIcon/>} count={tallk.retallks} colorClass="text-[var(--text-secondary)]" activeColorClass="bg-green-500 text-green-500" />
           <ActionButton icon={<LikeIcon className={isLiked ? 'text-pink-500 fill-current' : ''}/>} count={likeCount} colorClass="text-[var(--text-secondary)]" activeColorClass="bg-pink-500 text-pink-500" onClick={handleLike} isActive={isLiked} />
           <ActionButton icon={<AnalyticsIcon />} onClick={(e) => {e.stopPropagation(); onNavigate('analytics', tallk)}} colorClass="text-[var(--text-secondary)]" activeColorClass="bg-sky-500 text-sky-500" />
           <div className="flex items-center">
            <ActionButton icon={isBookmarked ? <BookmarkFillIcon className="text-yellow-500"/> : <BookmarkIcon/>} colorClass="text-[var(--text-secondary)]" activeColorClass="bg-yellow-500 text-yellow-500" onClick={handleBookmark} isActive={isBookmarked} />
            <ActionButton icon={<ShareIcon/>} colorClass="text-[var(--text-secondary)]" activeColorClass="bg-sky-500 text-sky-500" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default TallkPost;