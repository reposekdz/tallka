import React, { useState } from 'react';
import { mockConversations, mockUser } from '../data/mockData';
import type { Conversation, User, Message } from '../types';
import { MediaIcon, GifIcon, EmojiIcon, VideoCallIcon, AudioCallIcon, VoiceMessageIcon, MoreIcon } from './IconComponents';

interface MessagesPageProps {
  onNavigate: (page: 'profile', user: User) => void;
}

const VoiceMessageBubble: React.FC<{ url: string }> = ({ url }) => {
    return (
        <div className="flex items-center space-x-2">
            <button className="p-2 bg-white/80 rounded-full">
                 <svg className="w-4 h-4 text-sky-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4.018 15.59A1 1 0 005 15.17V4.83a1 1 0 00-1.447-.894l-2 1A1 1 0 001 6v8a1 1 0 00.553.894l2 1 .465.232zM15.89 8.11l-7-4A1 1 0 008 5.17v9.66a1 1 0 00.89.995l7-1a1 1 0 00.9-.995V9a1 1 0 00-.8-.89z"></path></svg>
            </button>
            <div className="w-32 h-1 bg-white/50 rounded-full"></div>
             <span className="text-xs">0:08</span>
        </div>
    )
}

const MessagesPage: React.FC<MessagesPageProps> = ({ onNavigate }) => {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(mockConversations[0]);

  const ConversationItem: React.FC<{ conv: Conversation; isActive: boolean; onClick: () => void }> = ({ conv, isActive, onClick }) => {
    const otherUser = conv.isGroup ? null : conv.participants.find(p => p.id !== mockUser.id)!;
    const lastMessage = conv.messages[conv.messages.length - 1];
    const displayName = conv.isGroup ? conv.groupName : otherUser!.name;
    const displayUsername = conv.isGroup ? `${conv.participants.length} members` : `@${otherUser!.username}`;
    const displayAvatar = conv.isGroup ? conv.groupAvatar : otherUser!.avatar;

    return (
      <div onClick={onClick} className={`p-4 cursor-pointer border-b border-slate-800 ${isActive ? 'bg-slate-900' : 'hover:bg-slate-900/50'}`}>
        <div className="flex items-center space-x-3">
          <img src={displayAvatar} alt={displayName} className="w-12 h-12 rounded-full" />
          <div className="flex-1 overflow-hidden">
            <div className="flex justify-between">
              <p className="font-bold truncate">{displayName} <span className="font-normal text-slate-500">{displayUsername}</span></p>
              <p className="text-slate-500 text-sm flex-shrink-0">Now</p>
            </div>
            <p className="text-slate-500 text-sm truncate">{lastMessage.voiceMessageUrl ? 'Voice message' : lastMessage.text}</p>
          </div>
        </div>
      </div>
    );
  };

  const ChatView: React.FC<{ conv: Conversation | null }> = ({ conv }) => {
    if (!conv) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center h-full p-8 text-center">
            <h2 className="text-2xl font-bold">Select a message</h2>
            <p className="text-slate-500">Choose from your existing conversations, start a new one, or just keep swimming.</p>
        </div>
      );
    }
    const otherUser = conv.isGroup ? null : conv.participants.find(p => p.id !== mockUser.id)!;
    const displayName = conv.isGroup ? conv.groupName : otherUser!.name;
    const displayUsername = conv.isGroup ? `${conv.participants.length} members` : `@${otherUser!.username}`;

    return (
      <div className="flex-1 flex flex-col">
        <div className="p-3 border-b border-slate-800 sticky top-0 bg-black/80 backdrop-blur-md flex justify-between items-center">
            <div>
                <h2 className="font-bold text-lg">{displayName}</h2>
                <p className="text-sm text-slate-500">{displayUsername}</p>
            </div>
            {!conv.isGroup && (
                <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-slate-800 rounded-full"><AudioCallIcon /></button>
                    <button className="p-2 hover:bg-slate-800 rounded-full"><VideoCallIcon /></button>
                    <button className="p-2 hover:bg-slate-800 rounded-full"><MoreIcon /></button>
                </div>
            )}
        </div>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
             <div className="text-center text-xs text-slate-500 flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <span>Messages are end-to-end encrypted.</span>
            </div>
            {conv.messages.map(msg => (
                <div key={msg.id} className={`flex items-end space-x-2 ${msg.sender.id === mockUser.id ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender.id !== mockUser.id && <img src={msg.sender.avatar} className="w-6 h-6 rounded-full"/> }
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender.id === mockUser.id ? 'bg-sky-500 text-white' : 'bg-slate-800'}`}>
                        {msg.voiceMessageUrl ? <VoiceMessageBubble url={msg.voiceMessageUrl} /> : msg.text}
                    </div>
                </div>
            ))}
        </div>
        <div className="p-2 border-t border-slate-800 flex items-center space-x-1">
            <button className="p-2 rounded-full hover:bg-sky-500/20 text-sky-500"><MediaIcon /></button>
            <button className="p-2 rounded-full hover:bg-sky-500/20 text-sky-500"><GifIcon /></button>
            <button className="p-2 rounded-full hover:bg-sky-500/20 text-sky-500"><EmojiIcon /></button>
            <input type="text" placeholder="Start a new message" className="flex-1 bg-slate-800 rounded-full px-4 py-2 focus:outline-none" />
            <button className="p-2 rounded-full hover:bg-sky-500/20 text-sky-500"><VoiceMessageIcon /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-2/5 border-r border-slate-800 flex flex-col">
        <div className="p-4 border-b border-slate-800">
            <h1 className="text-xl font-bold">Messages</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
            {mockConversations.map(conv => (
                <ConversationItem key={conv.id} conv={conv} isActive={activeConversation?.id === conv.id} onClick={() => setActiveConversation(conv)} />
            ))}
        </div>
      </div>
      <div className="hidden md:flex flex-1">
        <ChatView conv={activeConversation} />
      </div>
    </div>
  );
};

export default MessagesPage;