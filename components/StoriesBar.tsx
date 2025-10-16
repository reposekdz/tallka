import React from 'react';
import type { Story } from '../types';

interface StoriesBarProps {
  stories: Story[];
  onOpenStory: (stories: Story[], startIndex: number) => void;
}

const StoriesBar: React.FC<StoriesBarProps> = ({ stories, onOpenStory }) => {
  // Group stories by user
  const storiesByUser = stories.reduce((acc, story) => {
    if (!acc[story.user.id]) {
      acc[story.user.id] = { user: story.user, stories: [] };
    }
    acc[story.user.id].stories.push(story);
    return acc;
  }, {} as Record<string, { user: any; stories: Story[] }>);

  const uniqueUserStories = Object.values(storiesByUser);

  const handleStoryClick = (userId: string) => {
    // Find all stories for this user and the starting index
    const userStoryGroup = storiesByUser[userId];
    if (userStoryGroup) {
      // Find the index of the first story of this user in the global stories array
      const globalStartIndex = stories.findIndex(s => s.id === userStoryGroup.stories[0].id);
      onOpenStory(stories, globalStartIndex);
    }
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4 overflow-x-auto pb-2 -mb-2">
        {uniqueUserStories.map(({ user }) => (
          <div key={user.id} onClick={() => handleStoryClick(user.id)} className="flex flex-col items-center space-y-1 cursor-pointer flex-shrink-0">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 p-0.5">
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full border-2 border-[var(--bg-primary)] object-cover" />
              </div>
            </div>
            <p className="text-xs w-16 truncate text-center">{user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesBar;
