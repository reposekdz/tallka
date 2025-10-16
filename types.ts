export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  banner?: string;
  bio?: string;
  location?: string;
  website?: string;
  birthday?: string;
  following: number;
  followers: number;
  isVerified?: boolean;
  isProfessional?: boolean;
  hasActiveStory?: boolean;
  likedTallkIds?: string[];
}

export interface Poll {
  options: {
    label: string;
    votes: number;
  }[];
  totalVotes: number;
}

export interface Product {
  name: string;
  price: string;
  imageUrl: string;
  storeUrl: string;
}

export interface Tallk {
  id: string;
  author: User;
  content: string;
  image?: string;
  videoUrl?: string;
  voiceNoteUrl?: string;
  createdAt: string;
  likes: number;
  retallks: number;
  replies: Tallk[];
  poll?: Poll;
  quoteOf?: Tallk;
  isPinned?: boolean;
  product?: Product;
  threadId?: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'retallk' | 'reply' | 'follow' | 'mention' | 'quote';
  user: User;
  tallk?: Tallk;
  createdAt: string;
}

export interface Community {
  id: string;
  name: string;
  banner: string;
  description: string;
  members: number;
}

export interface Space {
  id: string;
  title: string;
  hosts: User[];
  speakers?: User[];
  listeners: number;
  tags: string[];
  isRecorded?: boolean;
}

export interface Message {
  id: string;
  sender: User;
  text: string;
  timestamp: string;
  voiceMessageUrl?: string;
}

export interface Conversation {
  id: string;
  participants: User[];
  messages: Message[];
  isGroup?: boolean;
  groupName?: string;
  groupAvatar?: string;
}

export interface UserList {
    id: string;
    name: string;
    description: string;
    members: User[];
    isPrivate: boolean;
}

export interface Moment {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    tallks: Tallk[];
}

export interface Story {
  id: string;
  user: User;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  duration: number; // in seconds
}
