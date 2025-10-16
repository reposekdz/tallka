
export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  following: number;
  followers: number;
  joinedDate: string;
  bio: string;
  location?: string;
  website?: string;
  banner?: string;
  hasActiveStory?: boolean;
  verified?: boolean;
  followingIds: Set<string>;
}

export interface Tallk {
  id: string;
  author: User;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  retallks: number;
  replies: Tallk[];
  isPromoted?: boolean;
}

export interface Story {
  id: string;
  user: User;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  duration?: number;
  timestamp: string;
}

export interface Trend {
    name: string;
    tallks: string;
    image?: string;
}

export interface Community {
    id: string;
    name: string;
    description: string;
    banner: string;
    members: number;
}

export interface UserList {
    id: string;
    name: string;
    description: string;
    members: User[];
    owner: User;
}

export interface Moment {
    id: string;
    title: string;
    description: string;
    coverImage: string;
}

export interface Notification {
    id: string;
    type: 'like' | 'retallk' | 'follow' | 'reply' | 'mention';
    user: User;
    tallk?: Tallk;
    timestamp: string;
}

export interface Message {
    id: string;
    sender: User;
    recipient: User;
    text: string;
    timestamp: string;
}

export interface Conversation {
    id: string;
    participants: User[];
    messages: Message[];
    lastMessageTimestamp: string;
}

export interface Space {
    id: string;
    title: string;
    hosts: User[];
    speakers: User[];
    listeners: User[];
    listenerCount: number;
    isRecording: boolean;
}
