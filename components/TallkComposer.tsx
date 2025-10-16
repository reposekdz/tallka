import React, { useState } from 'react';
import { MediaIcon, GifIcon, PollIcon, EmojiIcon, ScheduleIcon, LocationIcon, VideoIcon, DraftsIcon, MagicIcon, VoiceMessageIcon } from './IconComponents';
import type { Tallk, User } from '../types';
import { GoogleGenAI } from "@google/genai";

interface TallkComposerProps {
  onPostTallk: (content: string, image?: string, poll?: string[], quoteOf?: Tallk) => void;
  currentUser: User;
  replyingTo?: Tallk | null;
  quoting?: Tallk | null;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const TallkComposer: React.FC<TallkComposerProps> = ({ onPostTallk, currentUser, replyingTo, quoting }) => {
  const [content, setContent] = useState('');
  const [showPoll, setShowPoll] = useState(false);
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const characterLimit = 280;
  
  const handleSubmit = () => {
    if (content.trim() || quoting) {
      const finalPollOptions = showPoll ? pollOptions.filter(opt => opt.trim() !== '') : undefined;
      onPostTallk(content, undefined, finalPollOptions, quoting || undefined);
      setContent('');
      setShowPoll(false);
      setPollOptions(['', '']);
    }
  };

  const handleGenerateTallk = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const fullPrompt = `You are a social media expert. Write a short, engaging social media post (under 280 characters) about the following topic. Use relevant hashtags. Topic: "${aiPrompt}"`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
      });
      setContent(response.text.trim());
      setShowAIPrompt(false);
      setAiPrompt('');
    } catch (error) {
      console.error("Error generating Tallk:", error);
      alert("Sorry, I couldn't generate a Tallk right now. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const QuotedTallkPreview: React.FC<{ tallk: Tallk }> = ({ tallk }) => (
    <div className="mt-2 border border-[var(--border-color)] rounded-2xl p-3">
        <div className="flex items-center space-x-2 text-sm">
            <img src={tallk.author.avatar} className="w-5 h-5 rounded-full" />
            <span className="font-bold">{tallk.author.name}</span>
            <span className="text-[var(--text-secondary)]">@{tallk.author.username}</span>
        </div>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">{tallk.content}</p>
    </div>
  );

  const ComposerIconButton: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => (
    <button onClick={onClick} className="p-2 rounded-full hover:bg-sky-500/10 text-sky-500 transition-colors duration-200">
      {children}
    </button>
  );

  return (
    <div className="p-4 flex space-x-4">
      <img src={currentUser.avatar} alt="User Avatar" className="w-12 h-12 rounded-full" />
      <div className="flex-1">
        {replyingTo && (
            <p className="text-sm text-[var(--text-secondary)] mb-2">
                Replying to <span className="text-sky-500">@{replyingTo.author.username}</span>
            </p>
        )}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={replyingTo ? "Tallk your reply!" : (quoting ? "Add a comment!" : "What's happening?")}
          className="w-full bg-transparent text-xl placeholder-[var(--text-secondary)] focus:outline-none resize-none"
          rows={quoting ? 2 : 4}
          maxLength={characterLimit}
          autoFocus={!replyingTo}
        />
        {quoting && <QuotedTallkPreview tallk={quoting} />}
        {showAIPrompt && !replyingTo && (
            <div className="mt-4 space-y-2 border border-[var(--border-color)] rounded-lg p-2">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Help me write a Tallk about..."
                  className="w-full bg-[var(--bg-secondary)] rounded-md p-2"
                  autoFocus
                  onKeyDown={(e) => { if (e.key === 'Enter' && !isGenerating) handleGenerateTallk(); }}
                />
                <button
                  onClick={handleGenerateTallk}
                  disabled={isGenerating || !aiPrompt.trim()}
                  className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-4 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-32"
                >
                  {isGenerating ? "..." : 'Generate'}
                </button>
              </div>
            </div>
          )}
        <div className="flex items-center justify-between mt-2">
          <div className="flex space-x-1 text-sky-500">
            <ComposerIconButton><MediaIcon /></ComposerIconButton>
            <ComposerIconButton><VideoIcon /></ComposerIconButton>
            <ComposerIconButton><GifIcon /></ComposerIconButton>
            {!replyingTo && <ComposerIconButton><PollIcon /></ComposerIconButton>}
            <ComposerIconButton><EmojiIcon /></ComposerIconButton>
            {!replyingTo && <ComposerIconButton><VoiceMessageIcon /></ComposerIconButton>}
            {/* FIX: Moved onClick from MagicIcon to ComposerIconButton */}
            {!replyingTo && <ComposerIconButton onClick={() => setShowAIPrompt(!showAIPrompt)}><MagicIcon/></ComposerIconButton>}
          </div>
          <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-2">
                <span className="text-sm text-[var(--text-secondary)]">
                  {characterLimit - content.length}
                </span>
             </div>
             <button
                onClick={handleSubmit}
                disabled={!content.trim() && !quoting}
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-4 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
             >
                {replyingTo ? 'Reply' : 'Tallk'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TallkComposer;