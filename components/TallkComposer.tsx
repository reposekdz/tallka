import React, { useState } from 'react';
import { mockUser } from '../data/mockData';
import { MediaIcon, GifIcon, PollIcon, EmojiIcon, ScheduleIcon, LocationIcon, VideoIcon, DraftsIcon, MagicIcon } from './IconComponents';
import type { Tallk } from '../types';
import { GoogleGenAI } from "@google/genai";

interface TallkComposerProps {
  onPostTallk: (content: string, image?: string, poll?: string[]) => void;
  replyingTo?: Tallk | null;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const TallkComposer: React.FC<TallkComposerProps> = ({ onPostTallk, replyingTo }) => {
  const [content, setContent] = useState('');
  const [showPoll, setShowPoll] = useState(false);
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const characterLimit = 280;

  const handlePollOptionChange = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const addPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, '']);
    }
  };
  
  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      const newOptions = [...pollOptions];
      newOptions.splice(index, 1);
      setPollOptions(newOptions);
    }
  };

  const handleSubmit = () => {
    if (content.trim()) {
      const finalPollOptions = showPoll ? pollOptions.filter(opt => opt.trim() !== '') : undefined;
      onPostTallk(content, undefined, finalPollOptions);
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

  const ComposerIconButton: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => (
    <button onClick={onClick} className="p-2 rounded-full hover:bg-sky-500/10 text-sky-500 transition-colors duration-200">
      {children}
    </button>
  );

  return (
    <div className="p-4 flex space-x-4 border-b border-[var(--border-color)]">
      <img src={mockUser.avatar} alt="User Avatar" className="w-12 h-12 rounded-full" />
      <div className="flex-1">
        {replyingTo && (
            <p className="text-sm text-[var(--text-secondary)] mb-2">
                Replying to <span className="text-sky-500">@{replyingTo.author.username}</span>
            </p>
        )}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={replyingTo ? "Tallk your reply!" : "What's happening?"}
          className="w-full bg-transparent text-xl placeholder-[var(--text-secondary)] focus:outline-none resize-none"
          rows={3}
          maxLength={characterLimit}
          autoFocus={!replyingTo}
        />
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
                  {isGenerating ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    'Generate'
                  )}
                </button>
              </div>
            </div>
          )}
        {showPoll && !replyingTo && (
          <div className="mt-4 space-y-2 border border-[var(--border-color)] rounded-lg p-2">
            {pollOptions.map((option, index) => (
               <div key={index} className="flex items-center space-x-2">
                 <input
                   type="text"
                   value={option}
                   onChange={(e) => handlePollOptionChange(index, e.target.value)}
                   placeholder={`Choice ${index + 1}`}
                   className="w-full bg-[var(--bg-secondary)] rounded-md p-2"
                   maxLength={25}
                 />
                 {index > 1 && (
                    <button onClick={() => removePollOption(index)} className="text-[var(--text-secondary)] hover:text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                    </button>
                  )}
               </div>
            ))}
            {pollOptions.length < 4 && <button onClick={addPollOption} className="text-sky-500 text-sm p-1">Add choice</button>}
          </div>
        )}
        <div className="flex items-center justify-between mt-2">
          <div className="flex space-x-1 text-sky-500">
            <ComposerIconButton><MediaIcon /></ComposerIconButton>
            <ComposerIconButton><VideoIcon /></ComposerIconButton>
            <ComposerIconButton><GifIcon /></ComposerIconButton>
            {!replyingTo && <ComposerIconButton onClick={() => setShowPoll(!showPoll)}><PollIcon /></ComposerIconButton>}
            <ComposerIconButton><EmojiIcon /></ComposerIconButton>
            {!replyingTo && <ComposerIconButton><ScheduleIcon /></ComposerIconButton>}
            <ComposerIconButton><LocationIcon /></ComposerIconButton>
            {!replyingTo && <ComposerIconButton onClick={() => setShowAIPrompt(!showAIPrompt)}><MagicIcon /></ComposerIconButton>}
          </div>
          <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-2">
                <span className="text-sm text-[var(--text-secondary)]">
                  {characterLimit - content.length}
                </span>
                {!replyingTo && 
                    <button className="text-[var(--text-secondary)] hover:text-sky-500">
                      <DraftsIcon />
                    </button>
                }
             </div>
             <button
                onClick={handleSubmit}
                disabled={!content.trim()}
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