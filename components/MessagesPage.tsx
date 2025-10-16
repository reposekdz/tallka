import React from 'react';
import { mockConversations, mockUser } from '../data/mockData';
import type { Conversation } from '../types';
import { SettingsIcon } from './IconComponents';

const ConversationItem: React.FC<{ conversation: Conversation }> = ({ conversation }) => {
    const otherUser = conversation.participants.find(p => p.id !== mockUser.id)!;
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    return (
        <div className="flex p-4 border-b border-slate-800 hover:bg-slate-900/50 cursor-pointer">
            <img src={otherUser.avatar} alt={otherUser.name} className="w-12 h-12 rounded-full mr-4" />
            <div className="flex-1">
                <div className="flex justify-between">
                    <div>
                        <span className="font-bold">{otherUser.name}</span>
                        <span className="text-slate-500 ml-1">@{otherUser.username}</span>
                    </div>
                    <span className="text-slate-500">{conversation.lastMessageTimestamp}</span>
                </div>
                <p className="text-slate-500">{lastMessage.text}</p>
            </div>
        </div>
    );
};


const MessagesPage: React.FC = () => {
  return (
    <div>
      <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-md z-10 p-4 border-b border-slate-800 flex justify-between items-center">
        <h1 className="text-xl font-bold">Messages</h1>
        <SettingsIcon className="w-6 h-6" />
      </div>
      <div>
        {mockConversations.map(conv => (
            <ConversationItem key={conv.id} conversation={conv} />
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;
