import React from 'react';
import type { Tallk, User } from '../types';
import TallkPost from './TallkPost';
import TallkComposer from './TallkComposer';
import { SummarizeIcon } from './IconComponents';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

interface TallkDetailPageProps {
  tallk: Tallk;
  currentUser: User;
  onNavigate: (page: 'profile' | 'home' | 'tallkDetail' | 'analytics', data?: User | Tallk) => void;
  bookmarks: Set<string>;
  onToggleBookmark: (tallkId: string) => void;
  onReply: (tallk: Tallk) => void;
  onQuote: (tallk: Tallk) => void;
  onLike: (tallkId: string) => void;
  onPostReply: (content: string, parentTallkId: string) => void;
}

const TallkDetailPage: React.FC<TallkDetailPageProps> = ({ tallk, currentUser, onNavigate, bookmarks, onToggleBookmark, onReply, onQuote, onLike, onPostReply }) => {
  
  const handleSummarize = async () => {
    alert("Summarizing thread... this might take a moment.");
    try {
        const threadContent = [tallk.content, ...tallk.replies.map(r => `${r.author.username}: ${r.content}`)].join("\n---\n");
        const prompt = `You are a helpful assistant. Summarize the following social media thread into a few clear and concise bullet points. The first post is from the original author, and subsequent posts are replies. Original author: ${tallk.author.username}\n\nTHREAD:\n${threadContent}`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        alert(`AI Summary of the thread:\n\n${response.text}`);
    } catch (error) {
        console.error("Error summarizing thread:", error);
        alert("Sorry, could not summarize the thread at this time.");
    }
  };

  return (
    <div>
      <div className="sticky top-0 bg-[var(--bg-primary)] bg-opacity-80 backdrop-blur-md z-10 p-4 border-b border-[var(--border-color)] flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <button onClick={() => onNavigate('home')} className="hover:bg-[var(--bg-secondary)] rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
            <h1 className="text-xl font-bold">Thread</h1>
        </div>
        {tallk.replies.length > 2 && (
            <button onClick={handleSummarize} className="flex items-center space-x-2 text-sm bg-sky-500/20 text-sky-400 font-semibold px-3 py-1.5 rounded-full hover:bg-sky-500/30">
                <SummarizeIcon className="w-4 h-4" />
                <span>Summarize</span>
            </button>
        )}
      </div>
      
      <TallkPost 
        tallk={tallk}
        currentUser={currentUser}
        onNavigate={onNavigate}
        isBookmarked={bookmarks.has(tallk.id)}
        onToggleBookmark={onToggleBookmark}
        onReply={onReply}
        onQuote={onQuote}
        onLike={onLike}
        isDetailView={true}
      />
      
      <TallkComposer onPostTallk={(content) => onPostReply(content, tallk.id)} replyingTo={tallk} currentUser={currentUser} />

      <div className="border-t border-[var(--border-color)]">
        {tallk.replies.map(reply => (
          <TallkPost 
            key={reply.id} 
            tallk={reply} 
            currentUser={currentUser}
            onNavigate={onNavigate} 
            isBookmarked={bookmarks.has(reply.id)}
            onToggleBookmark={onToggleBookmark}
            onReply={onReply}
            onQuote={onQuote}
            onLike={onLike}
            isThread={true}
          />
        ))}
      </div>
    </div>
  );
};

export default TallkDetailPage;
