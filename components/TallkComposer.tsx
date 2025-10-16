import React, { useState } from 'react';
import type { Tallk, User } from '../types';
import { ImageIcon, GIFIcon, PollIcon, EmojiIcon, ScheduleIcon, LocationIcon } from './IconComponents';

interface TallkComposerProps {
  currentUser: User;
  onPostTallk: (content: string, image?: string) => void;
  replyingTo?: Tallk;
}

const TallkComposer: React.FC<TallkComposerProps> = ({ currentUser, onPostTallk, replyingTo }) => {
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      onPostTallk(content.trim());
      setContent('');
    }
  };

  const handleFocus = () => setIsFocused(true);

  return (
    <div className="p-4 border-b border-[var(--border-color)]">
        <div className="flex space-x-4">
            <img src={currentUser.avatar} alt="User Avatar" className="w-12 h-12 rounded-full" />
            <div className="flex-1">
                {replyingTo && (
                    <p className="text-sm text-[var(--text-secondary)] mb-1">
                        Replying to <span className="text-sky-500">@{replyingTo.author.username}</span>
                    </p>
                )}
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onFocus={handleFocus}
                    placeholder={replyingTo ? "Tallk your reply" : "What's happening?!"}
                    className="w-full bg-transparent text-xl placeholder-[var(--text-secondary)] focus:outline-none resize-none"
                    rows={content.length > 50 || isFocused ? 3 : 1}
                />
                 {(isFocused || content) && <div className="border-b border-[var(--border-color)] my-2"></div>}
                <div className="flex items-center justify-between mt-2">
                    <div className="flex space-x-2 text-sky-500">
                        <button className="p-2 hover:bg-sky-500/10 rounded-full"><ImageIcon className="w-5 h-5" /></button>
                        <button className="p-2 hover:bg-sky-500/10 rounded-full"><GIFIcon className="w-5 h-5" /></button>
                        <button className="p-2 hover:bg-sky-500/10 rounded-full"><PollIcon className="w-5 h-5" /></button>
                        <button className="p-2 hover:bg-sky-500/10 rounded-full"><EmojiIcon className="w-5 h-5" /></button>
                        <button className="p-2 hover:bg-sky-500/10 rounded-full"><ScheduleIcon className="w-5 h-5" /></button>
                        <button className="p-2 hover:bg-sky-500/10 rounded-full"><LocationIcon className="w-5 h-5" /></button>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={!content.trim()}
                        className="bg-sky-500 text-white font-bold px-4 py-1.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Tallk
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default TallkComposer;
