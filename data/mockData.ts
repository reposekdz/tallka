// data/mockData.ts

import type { User, Tallk, Story, Trend, Community, UserList, Moment, Notification, Conversation, Space, Message } from '../types';

export const mockUser: User = {
  id: 'u1',
  name: 'Fidel Ndugutse',
  username: 'fidel_ndungutse',
  avatar: 'https://i.pravatar.cc/150?u=fidel_ndungutse',
  following: 150,
  followers: 2500,
  joinedDate: 'Joined July 2021',
  bio: 'Just a coder from Kigali. Building things for the web. Follow for tech and random thoughts.',
  location: 'Kigali, Rwanda',
  website: 'kigalicoder.dev',
  banner: 'https://picsum.photos/seed/u1-banner/1500/500',
  hasActiveStory: true,
  verified: true,
  followingIds: new Set(['u2', 'follow2']),
};

export const anotherUser: User = {
  id: 'u2',
  name: 'Boris Bi',
  username: 'boris_bi',
  avatar: 'https://i.pravatar.cc/150?u=boris_bi',
  following: 300,
  followers: 5000,
  joinedDate: 'Joined May 2020',
  bio: 'Design enthusiast and coffee lover.',
  location: 'San Francisco, CA',
  website: 'janedoe.design',
  banner: 'https://picsum.photos/seed/u2-banner/1500/500',
  hasActiveStory: true,
  followingIds: new Set(['u1', 'u3']),
};

export const thirdUser: User = {
  id: 'u3',
  name: 'Heisbare',
  username: 'heisbare',
  avatar: 'https://i.pravatar.cc/150?u=heisbare',
  following: 50,
  followers: 100,
  joinedDate: 'Joined January 2022',
  bio: 'Exploring the world one step at a time.',
  location: 'London, UK',
  banner: 'https://picsum.photos/seed/u3-banner/1500/500',
  hasActiveStory: true,
  verified: true,
  followingIds: new Set(['u1']),
};

export const sponsoredUser: User = {
  id: 'u4',
  name: 'EasySite AI',
  username: 'easysiteai',
  avatar: 'https://i.pravatar.cc/150?u=easysiteai',
  following: 0,
  followers: 150000,
  joinedDate: 'Joined June 2023',
  bio: 'Build your website in seconds with the power of AI. #AI #WebBuilder',
  isSponsored: true,
  hasActiveStory: true,
  followingIds: new Set(),
};


export const mockUsers: User[] = [mockUser, anotherUser, thirdUser, sponsoredUser];

export const usersToFollow: User[] = [
    { ...thirdUser, id: 'follow1', username: 'johnsmith_new', avatar: 'https://i.pravatar.cc/150?u=follow1', followingIds: new Set()},
    { ...anotherUser, id: 'follow2', name: 'AI Art', username: 'ai_art_daily', avatar: 'https://i.pravatar.cc/150?u=follow2', bio: 'Daily AI-generated art.', followingIds: new Set()},
    { ...mockUser, id: 'follow3', name: 'React News', username: 'react_news', avatar: 'https://i.pravatar.cc/150?u=follow3', bio: 'Latest news about React and its ecosystem.', followingIds: new Set()}
];

const reply1: Tallk = {
  id: 't1-r1',
  author: anotherUser,
  content: 'Looks amazing! What tools did you use?',
  timestamp: '2h',
  likes: 15,
  retallks: 2,
  replies: []
};
const reply2: Tallk = {
  id: 't1-r2',
  author: thirdUser,
  content: 'Wow, incredible work! So inspiring.',
  timestamp: '1h',
  likes: 8,
  retallks: 1,
  replies: []
};
const reply3: Tallk = {
  id: 't1-r3',
  author: mockUser,
  content: 'Thanks! I used Figma for the design and React for the implementation.',
  timestamp: '30m',
  likes: 25,
  retallks: 5,
  replies: []
};

export const mockTallks: Tallk[] = [
  {
    id: 't1',
    author: mockUser,
    content: 'Just launched my new project! It\'s a social media app for developers called Tallka. Check it out and let me know what you think! #webdev #react #typescript',
    image: 'https://picsum.photos/seed/tallk1/600/400',
    timestamp: '4h',
    likes: 156,
    retallks: 32,
    replies: [reply1, reply2, reply3]
  },
  {
    id: 't2',
    author: anotherUser,
    content: 'What should be the next big feature for design tools in 2024?',
    timestamp: '8h',
    likes: 543,
    retallks: 128,
    replies: [],
    poll: {
      options: [
        { id: 1, text: 'AI-powered automation', votes: 482 },
        { id: 2, text: 'Real-time collaboration', votes: 621 },
        { id: 3, text: 'Better prototyping tools', votes: 310 },
      ],
      endsAt: '1d',
    }
  },
  {
    id: 't3',
    author: thirdUser,
    content: 'Exploring the beautiful landscapes of New Zealand. #travel #nature',
    image: 'https://picsum.photos/seed/tallk3/600/400',
    timestamp: '1d',
    likes: 1024,
    retallks: 256,
    replies: []
  },
  {
    id: 't4',
    author: mockUser,
    content: 'Just a quick thought: the Gemini API is incredibly powerful for adding intelligent features to apps. I\'m experimenting with a "summarize thread" feature.',
    timestamp: '2d',
    likes: 98,
    retallks: 15,
    replies: []
  },
];

export const promotedTallk: Tallk = {
    ...mockTallks[2],
    id: 'promo1',
    isPromoted: true,
};

export const mockTrends: Trend[] = [
  { name: '#ReactConf2024', tallks: '12.5K Tallks', image: 'https://picsum.photos/seed/trend1/200/100' },
  { name: 'Gemini API', tallks: '8,765 Tallks', image: 'https://picsum.photos/seed/trend2/200/100' },
  { name: 'TailwindCSS', tallks: '5,123 Tallks', image: 'https://picsum.photos/seed/trend3/200/100' },
  { name: '#WebDev', tallks: '22K Tallks', image: 'https://picsum.photos/seed/trend4/200/100' },
];

export const mockStories: Story[] = [
  { id: 's1', user: mockUser, mediaUrl: 'https://picsum.photos/seed/story1/450/800', mediaType: 'image', duration: 7, timestamp: 'Now' },
  { id: 's2', user: mockUser, mediaUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', mediaType: 'video', timestamp: 'Now' },
  { id: 's3', user: anotherUser, mediaUrl: 'https://picsum.photos/seed/story3/450/800', mediaType: 'image', duration: 5, timestamp: 'Now' },
  { id: 's4', user: thirdUser, mediaUrl: 'https://picsum.photos/seed/story4/450/800', mediaType: 'image', duration: 6, timestamp: 'Now' },
  { id: 's5', user: sponsoredUser, mediaUrl: 'https://picsum.photos/seed/story5/450/800', mediaType: 'image', duration: 8, timestamp: 'Sponsored' },
];

export const mockCommunities: Community[] = [
  { id: 'c1', name: 'React Developers', description: 'A community for all things React. Share your projects, ask questions, and connect with other developers.', banner: 'https://picsum.photos/seed/comm1/1500/500', members: 125000 },
  { id: 'c2', name: 'UI/UX Designers', description: 'Share your work, get feedback, and discuss the latest trends in UI/UX design.', banner: 'https://picsum.photos/seed/comm2/1500/500', members: 89000 },
];

export const mockLists: UserList[] = [
    { id: 'l1', name: 'Tech Peeps', description: 'People I follow for tech news and insights.', members: [anotherUser, thirdUser], owner: mockUser },
    { id: 'l2', name: 'Design Inspirations', description: 'Amazing designers to follow.', members: [anotherUser], owner: mockUser },
];

export const mockMoments: Moment[] = [
    { id: 'm1', title: 'The Launch of Tallka', description: 'See the highlights from the launch of the new social media app for developers.', coverImage: 'https://picsum.photos/seed/moment1/600/800' },
    { id: 'm2', title: 'A Trip to the Mountains', description: 'A collection of beautiful photos from a recent hiking trip.', coverImage: 'https://picsum.photos/seed/moment2/600/800' },
];

export const mockNotifications: Notification[] = [
    { id: 'n1', type: 'like', user: anotherUser, tallk: mockTallks[0], timestamp: '2h' },
    { id: 'n2', type: 'follow', user: thirdUser, timestamp: '5h' },
    { id: 'n3', type: 'retallk', user: anotherUser, tallk: mockTallks[3], timestamp: '1d' },
    { id: 'n4', type: 'reply', user: thirdUser, tallk: mockTallks[0], timestamp: '1d' },
    { id: 'n5', type: 'mention', user: anotherUser, tallk: mockTallks[1], timestamp: '2d' },
];

const conversationMessages: Message[] = [
    { id: 'msg1', sender: anotherUser, recipient: mockUser, text: 'Hey, saw your new project. Looks great!', timestamp: '10m' },
    { id: 'msg2', sender: mockUser, recipient: anotherUser, text: 'Thanks so much! Appreciate you checking it out.', timestamp: '9m' },
    { id: 'msg3', sender: anotherUser, recipient: mockUser, text: 'Of course! I had a quick question about the tech stack.', timestamp: '8m' },
];

export const mockConversations: Conversation[] = [
    { id: 'conv1', participants: [mockUser, anotherUser], messages: conversationMessages, lastMessageTimestamp: '8m' },
    { id: 'conv2', participants: [mockUser, thirdUser], messages: [{ id: 'msg4', sender: thirdUser, recipient: mockUser, text: 'Loved your photos from New Zealand!', timestamp: '1h' }], lastMessageTimestamp: '1h' },
];

export const mockSpaces: Space[] = [
    { id: 'sp1', title: 'Tech Talk: The Future of Frontend', hosts: [mockUser], speakers: [anotherUser], listeners: [thirdUser], listenerCount: 125, isRecording: true, ticketed: true },
    { id: 'sp2', title: 'AMA with a Senior Designer', hosts: [anotherUser], speakers: [], listeners: [], listenerCount: 340, isRecording: false },
];