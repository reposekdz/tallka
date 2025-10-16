import type { User, Tallk, Notification, Community, Space, Conversation, Message, UserList, Moment } from '../types';

export const mockUser: User = {
  id: 'u1',
  name: 'Kigali Coder',
  username: 'kigalicoder',
  avatar: 'https://picsum.photos/seed/user1/200/200',
  banner: 'https://picsum.photos/seed/banner1/1500/500',
  bio: 'Passionate React developer from Rwanda 🇷🇼. Building cool things with TypeScript and Tailwind CSS.',
  location: 'Kigali, Rwanda',
  website: 'github.com',
  birthday: '1995-05-15',
  following: 150,
  followers: 1200,
  isVerified: false,
  isProfessional: true,
};

export const anotherUser: User = {
  id: 'u2',
  name: 'Jane Doe',
  username: 'janedoe',
  avatar: 'https://picsum.photos/seed/user2/200/200',
  banner: 'https://picsum.photos/seed/banner2/1500/500',
  bio: 'UX/UI Designer crafting beautiful and intuitive digital experiences.',
  location: 'Nairobi, Kenya',
  website: 'dribbble.com',
  birthday: '1998-11-20',
  following: 300,
  followers: 5400,
  isVerified: false,
  hasActiveStory: true,
};

export const usersToFollow: User[] = [
    {
        id: 'u3',
        name: 'Tech Enthusiast',
        username: 'techenthusiast',
        avatar: 'https://picsum.photos/seed/user3/200/200',
        following: 50,
        followers: 10000,
        isVerified: false,
    },
    {
        id: 'u4',
        name: 'React News',
        username: 'reactnews',
        avatar: 'https://picsum.photos/seed/user4/200/200',
        following: 1,
        followers: 250000,
        isVerified: true,
        isProfessional: true,
        hasActiveStory: true,
    },
    {
        id: 'u5',
        name: 'Rwandan Explorer',
        username: 'rwandanexplorer',
        avatar: 'https://picsum.photos/seed/user5/200/200',
        following: 500,
        followers: 8500,
        isVerified: false,
    }
];

const mockReplies: Tallk[] = [
    {
        id: 'tr1',
        author: mockUser,
        content: "Totally agree! It's a fantastic tool for designers.",
        createdAt: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
        likes: 15,
        retallks: 2,
        replies: [],
    },
    {
        id: 'tr2',
        author: usersToFollow[0],
        content: "This is a game changer! Downloading now.",
        createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
        likes: 8,
        retallks: 1,
        replies: [],
    }
];

export const promotedTallk: Tallk = {
    id: 'promo1',
    author: {
        id: 'promo-user',
        name: 'Tallka Ads',
        username: 'tallkaads',
        avatar: 'https://picsum.photos/seed/ad/200/200',
        following: 0,
        followers: 0,
        isVerified: true,
    },
    content: "Launch your brand into the stratosphere with Tallka Ads. Reach millions of engaged users and grow your business today. Click to learn more!",
    image: 'https://picsum.photos/seed/promo-img/600/400',
    createdAt: new Date().toISOString(),
    likes: 500,
    retallks: 120,
    replies: [],
};


export const mockTallks: Tallk[] = [
  {
    id: 't-pinned',
    author: mockUser,
    content: "Excited to announce I'll be speaking at #DevConAfrica next month! Come say hi if you're there. I'll be talking about the future of frontend development. #WebDev",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    likes: 582,
    retallks: 120,
    replies: [],
    isPinned: true,
  },
   {
    id: 't-video',
    author: usersToFollow[2],
    content: "A breathtaking view of the Nyungwe National Park canopy walk. The beauty of Rwanda is endless. #VisitRwanda 🇷🇼",
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    likes: 789,
    retallks: 210,
    replies: [],
  },
  {
    id: 't1',
    author: anotherUser,
    content: "Just launched a new UI kit for Figma! So excited to see what you all create with it. Check it out! #UI #Design #Figma @kigalicoder",
    image: 'https://picsum.photos/seed/tallk1/600/400',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    likes: 125,
    retallks: 45,
    replies: mockReplies,
  },
  {
    id: 't-shop',
    author: usersToFollow[1],
    content: "Introducing the official React 19 merch! Get your exclusive T-shirts and mugs now. Limited stock available.",
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    likes: 950,
    retallks: 320,
    replies: [],
    product: {
      name: 'React 19 Official Tee',
      price: '$29.99',
      imageUrl: 'https://picsum.photos/seed/product1/600/400',
      storeUrl: '#',
    }
  },
  {
    id: 't-poll',
    author: usersToFollow[0],
    content: "What's your favorite state management library in React for large-scale applications?",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    likes: 320,
    retallks: 90,
    replies: [],
    poll: {
        options: [
            { label: 'Redux Toolkit', votes: 150 },
            { label: 'Zustand', votes: 280 },
            { label: 'Jotai / Recoil', votes: 120 },
            { label: 'Context API', votes: 80 }
        ],
        totalVotes: 630
    }
  },
   {
    id: 't-thread-1',
    author: mockUser,
    content: "Building this Tallka app is a great learning experience. Loving the combination of React and Tailwind CSS for rapid prototyping! 🚀 #ReactJS #TailwindCSS (1/2)",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    likes: 88,
    retallks: 12,
    replies: [],
    threadId: 'thread1',
  },
  {
    id: 't-thread-2',
    author: mockUser,
    content: "The component-based architecture of React makes it so scalable, and Tailwind's utility-first approach is a game-changer for styling. Highly recommend this stack! (2/2)",
    createdAt: new Date(Date.now() - 1000 * 60 * 29).toISOString(),
    likes: 45,
    retallks: 5,
    replies: [],
    threadId: 'thread1',
  },
  {
    id: 't-quote',
    author: mockUser,
    content: "This is huge for the React ecosystem!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    likes: 42,
    retallks: 8,
    replies: [],
    quoteOf: {
      id: 't3',
      author: usersToFollow[1],
      content: "React 19 is just around the corner! Who's excited for the new compiler and automatic memoization features?",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      likes: 1200,
      retallks: 450,
      replies: [],
    }
  },
  {
    id: 't-voice',
    author: anotherUser,
    content: "Just had a quick thought on design systems...",
    voiceNoteUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    likes: 95,
    retallks: 15,
    replies: [],
  },
];


export const mockNotifications: Notification[] = [
    { id: 'n1', type: 'follow', user: anotherUser, createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString() },
    { id: 'n2', type: 'like', user: usersToFollow[0], tallk: mockTallks[1], createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
    { id: 'n6', type: 'quote', user: mockUser, tallk: mockTallks[3], createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString() },
    { id: 'n5', type: 'mention', user: anotherUser, tallk: mockTallks[0], createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString() },
    { id: 'n3', type: 'retallk', user: usersToFollow[1], tallk: mockTallks[1], createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
    { id: 'n4', type: 'reply', user: anotherUser, tallk: mockTallks[1], createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
];

export const mockTrends = [
    { name: '#Kigali', tallks: '12.5K Tallks' },
    { name: '#VisitRwanda', tallks: '8,9K Tallks' },
    { name: '#ReactJS', tallks: '125K Tallks' },
    { name: 'TailwindCSS', tallks: '78K Tallks' },
    { name: '#TechInAfrica', tallks: '5,2K Tallks' },
];

export const mockCommunities: Community[] = [
    { id: 'c1', name: 'React Developers', banner: 'https://picsum.photos/seed/comm1/600/200', description: 'A community for all things React. Share your projects, ask questions, and connect with other developers.', members: 125000 },
    { id: 'c2', name: 'UI/UX Designers of Africa', banner: 'https://picsum.photos/seed/comm2/600/200', description: 'Connecting designers across the continent to share inspiration, resources, and opportunities.', members: 45000 },
    { id: 'c3', name: 'Rwanda Photography', banner: 'https://picsum.photos/seed/comm3/600/200', description: 'Showcasing the beauty of Rwanda through the lens of local and international photographers.', members: 12000 },
];

export const mockSpaces: Space[] = [
    { id: 's1', title: 'Live from #DevConAfrica: The Future of Frontend', hosts: [usersToFollow[1]], speakers: [mockUser], listeners: 1200, tags: ['React', 'Frontend', 'Tech'] },
    { id: 's2', title: 'Chill Friday: Tech Chat & Music', hosts: [mockUser, anotherUser], listeners: 350, tags: ['Tech', 'Community'] },
    { id: 's3', title: 'Startup Pitch Night', hosts: [usersToFollow[0]], listeners: 890, tags: ['Startups', 'VC', 'Business'], isRecorded: true },
];

export const mockConversations: Conversation[] = [
    {
        id: 'conv1',
        participants: [mockUser, anotherUser],
        messages: [
            { id: 'm1', sender: anotherUser, text: 'Hey! Loved your recent tallk on Tailwind. Great insights!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()},
            { id: 'm2', sender: mockUser, text: 'Thanks so much! Glad you enjoyed it. Your new UI kit looks amazing too!', timestamp: new Date(Date.now() - 1000 * 60 * 58).toISOString()},
            { id: 'm2-voice', sender: anotherUser, text: '', voiceMessageUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString()}
        ]
    },
    {
        id: 'conv2',
        participants: [mockUser, usersToFollow[2]],
        messages: [
            { id: 'm3', sender: usersToFollow[2], text: 'That photo of Lake Kivu is stunning!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()},
        ]
    },
    {
        id: 'conv3',
        participants: [mockUser, anotherUser, usersToFollow[0]],
        isGroup: true,
        groupName: 'Project Team',
        groupAvatar: 'https://picsum.photos/seed/group1/200/200',
        messages: [
             { id: 'm4', sender: usersToFollow[0], text: 'Hey team, how is the project going?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()},
             { id: 'm5', sender: mockUser, text: 'Making good progress! Should have an update soon.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()},
        ]
    }
];

export const mockLists: UserList[] = [
    { id: 'l1', name: 'Dev Relations', description: 'People in devrel and community', members: [anotherUser, usersToFollow[0]], isPrivate: false},
    { id: 'l2', name: 'Design Inspirations', description: '', members: [anotherUser], isPrivate: true },
];

export const mockMoments: Moment[] = [
    { id: 'm1', title: 'Highlights from the #TechInAfrica Summit', description: 'The best moments and insights from this year\'s biggest tech event in Africa.', coverImage: 'https://picsum.photos/seed/moment1/600/800', tallks: [mockTallks[0], mockTallks[4]] }
];