import React from 'react';
import type { Story, User } from '../types';

interface StoriesBarProps {
  stories: Story[];
  onOpenStory: (stories: Story[], startIndex: number, users: User[]) => void;
  usersWithStories: User[];
}

const StoriesBar: React.FC<StoriesBarProps> = ({ stories, onOpenStory, usersWithStories }) => {
  
  const storiesByUser = stories.reduce((acc, story) => {
    if (!acc[story.user.id]) {
      acc[story.user.id] = [];
    }
    acc[story.user.id].push(story);
    return acc;
  }, {} as Record<string, Story[]>);

  const handleStoryClick = (userId: string) => {
    const userStories = storiesByUser[userId];
    if (userStories && userStories.length > 0) {
      const globalStartIndex = stories.findIndex(s => s.id === userStories[0].id);
      onOpenStory(stories, globalStartIndex, usersWithStories);
    }
  };

  return (
    <div className="p-4">
      <div className="flex space-x-3 overflow-x-auto pb-2 -mb-2">
        {usersWithStories.map((user) => (
          <div key={user.id} onClick={() => handleStoryClick(user.id)} className="flex-shrink-0 w-28 h-48 rounded-xl overflow-hidden relative cursor-pointer group">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute top-2 left-2 p-0.5 border-2 rounded-full fb-border-blue">
                <img src={user.avatar} className="w-8 h-8 rounded-full" />
            </div>
            <p className="absolute bottom-2 left-2 text-white font-bold text-sm">{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesBar;
