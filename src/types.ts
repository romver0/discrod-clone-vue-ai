export interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  isUnlocked: boolean;
  progress: number;
  requiredProgress: number;
}

export interface User {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'idle' | 'dnd';
  role: Role;
  experience: number;
  level: number;
  achievements: Achievement[];
  streak: number;
  lastActive: Date;
}

export interface Role {
  id: number;
  name: string;
  color: string;
  icon: string;
  requiredLevel: number;
  permissions: string[];
  benefits: string[];
}

export interface Message {
  id: number;
  content: string;
  timestamp: Date;
  user: User;
  attachments?: string[];
  reactions?: Reaction[];
}

export interface Reaction {
  emoji: string;
  count: number;
  users: number[];
}

export interface Channel {
  id: number;
  name: string;
  type: 'text' | 'voice' | 'announcement';
  topic: string;
  messages: Message[];
  isActive?: boolean;
}

export interface Server {
  id: number;
  name: string;
  icon: string;
  channels: Channel[];
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
  channels: Channel[];
}