import { ref, computed } from 'vue';
import type { Server, Channel, Message, User, Role, Category, Achievement } from '../types';

export function useDiscord() {
  const roles: Role[] = [
    { 
      id: 1, 
      name: 'Novice Learner', 
      color: '#43b581',
      icon: '🌱',
      requiredLevel: 1,
      permissions: ['read', 'write'],
      benefits: ['Access to basic channels']
    },
    { 
      id: 2, 
      name: 'Active Student', 
      color: '#faa61a',
      icon: '📚',
      requiredLevel: 5,
      permissions: ['read', 'write', 'react'],
      benefits: ['Create study groups', 'Share files']
    },
    { 
      id: 3, 
      name: 'Knowledge Seeker', 
      color: '#f04747',
      icon: '🎓',
      requiredLevel: 10,
      permissions: ['read', 'write', 'react', 'pin'],
      benefits: ['Create events', 'Mentor others']
    },
    { 
      id: 4, 
      name: 'Subject Expert', 
      color: '#7289da',
      icon: '⭐',
      requiredLevel: 20,
      permissions: ['read', 'write', 'react', 'pin', 'moderate'],
      benefits: ['Host workshops', 'Create courses']
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 1,
      name: 'First Step',
      description: 'Send your first message',
      icon: '✉️',
      xpReward: 50,
      isUnlocked: false,
      progress: 0,
      requiredProgress: 1
    },
    {
      id: 2,
      name: 'Active Learner',
      description: 'Maintain a 3-day streak',
      icon: '🔥',
      xpReward: 100,
      isUnlocked: false,
      progress: 0,
      requiredProgress: 3
    },
    {
      id: 3,
      name: 'Voice Champion',
      description: 'Spend 1 hour in voice channels',
      icon: '🎤',
      xpReward: 200,
      isUnlocked: false,
      progress: 0,
      requiredProgress: 60
    }
  ];

  const currentUser = ref<User>({
    id: 1,
    name: 'Current User',
    avatar: '👤',
    status: 'online',
    role: roles[0],
    experience: 0,
    level: 1,
    achievements: achievements,
    streak: 0,
    lastActive: new Date()
  });

  const categories: Category[] = [
    {
      id: 1,
      name: 'Programming',
      channels: [
        { id: 1, name: 'javascript', type: 'text', topic: 'JavaScript Discussion', messages: [] },
        { id: 2, name: 'python', type: 'text', topic: 'Python Learning', messages: [] },
        { id: 3, name: 'code-help', type: 'text', topic: 'Get Help with Code', messages: [] },
        { id: 4, name: 'programming-voice', type: 'voice', topic: 'Voice Discussions', messages: [] }
      ]
    },
    {
      id: 2,
      name: 'Mathematics',
      channels: [
        { id: 5, name: 'algebra', type: 'text', topic: 'Algebra Discussion', messages: [] },
        { id: 6, name: 'calculus', type: 'text', topic: 'Calculus Help', messages: [] },
        { id: 7, name: 'math-voice', type: 'voice', topic: 'Math Tutorial Sessions', messages: [] }
      ]
    },
    {
      id: 3,
      name: 'Languages',
      channels: [
        { id: 8, name: 'english', type: 'text', topic: 'English Practice', messages: [] },
        { id: 9, name: 'spanish', type: 'text', topic: 'Spanish Learning', messages: [] },
        { id: 10, name: 'language-exchange', type: 'voice', topic: 'Language Exchange', messages: [] }
      ]
    }
  ];

  const servers = ref<Server[]>([
    {
      id: 1,
      name: 'EduDiscord',
      icon: '📚',
      channels: [],
      categories
    }
  ]);

  const activeServer = ref<Server>(servers.value[0]);
  const activeChannel = ref<Channel>(categories[0].channels[0]);
  const activeVoiceCall = ref<Channel | null>(null);
  const showAchievement = ref<Achievement | null>(null);

  const checkAchievements = () => {
    currentUser.value.achievements.forEach(achievement => {
      if (!achievement.isUnlocked) {
        switch (achievement.id) {
          case 1: // First Step
            if (achievement.progress >= achievement.requiredProgress) {
              unlockAchievement(achievement);
            }
            break;
          case 2: // Active Learner
            if (currentUser.value.streak >= achievement.requiredProgress) {
              unlockAchievement(achievement);
            }
            break;
          case 3: // Voice Champion
            if (achievement.progress >= achievement.requiredProgress) {
              unlockAchievement(achievement);
            }
            break;
        }
      }
    });
  };

  const unlockAchievement = (achievement: Achievement) => {
    achievement.isUnlocked = true;
    gainExperience(achievement.xpReward);
    showAchievement.value = achievement;
    setTimeout(() => {
      showAchievement.value = null;
    }, 3000);
  };

  const updateStreak = () => {
    const now = new Date();
    const lastActive = new Date(currentUser.value.lastActive);
    const diffDays = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      currentUser.value.streak++;
    } else if (diffDays > 1) {
      currentUser.value.streak = 0;
    }
    currentUser.value.lastActive = now;
  };

  const gainExperience = (amount: number) => {
    currentUser.value.experience += amount;
    const requiredXP = currentUser.value.level * 100;
    
    if (currentUser.value.experience >= requiredXP) {
      currentUser.value.level += 1;
      currentUser.value.experience -= requiredXP;
      
      // Check for role upgrades
      const newRole = roles.findLast(role => role.requiredLevel <= currentUser.value.level);
      if (newRole && newRole.id !== currentUser.value.role.id) {
        currentUser.value.role = newRole;
        showAchievement.value = {
          id: -1,
          name: 'New Role Unlocked!',
          description: `You've achieved the ${newRole.name} role!`,
          icon: newRole.icon,
          xpReward: 0,
          isUnlocked: true,
          progress: 0,
          requiredProgress: 0
        };
        setTimeout(() => {
          showAchievement.value = null;
        }, 3000);
      }
    }
  };

  const sendMessage = (content: string) => {
    if (!activeChannel.value) return;
    
    const newMessage: Message = {
      id: Date.now(),
      content,
      timestamp: new Date(),
      user: currentUser.value,
      reactions: []
    };

    activeChannel.value.messages.push(newMessage);
    
    // Update achievements and streak
    const firstStepAchievement = currentUser.value.achievements.find(a => a.id === 1);
    if (firstStepAchievement) {
      firstStepAchievement.progress++;
    }
    
    updateStreak();
    checkAchievements();
    gainExperience(10);
  };

  const joinVoiceCall = (channel: Channel) => {
    if (channel.type !== 'voice') return;
    activeVoiceCall.value = channel;
    
    // Update Voice Champion achievement progress
    const voiceAchievement = currentUser.value.achievements.find(a => a.id === 3);
    if (voiceAchievement) {
      const updateProgress = setInterval(() => {
        if (activeVoiceCall.value) {
          voiceAchievement.progress++;
          checkAchievements();
        } else {
          clearInterval(updateProgress);
        }
      }, 60000); // Update every minute
    }
    
    gainExperience(20);
  };

  const leaveVoiceCall = () => {
    activeVoiceCall.value = null;
  };

  const nextRoleProgress = computed(() => {
    const nextRole = roles.find(role => role.requiredLevel > currentUser.value.level);
    if (!nextRole) return 100;
    
    const progress = ((currentUser.value.level - currentUser.value.role.requiredLevel) * 100) /
      (nextRole.requiredLevel - currentUser.value.role.requiredLevel);
    return Math.min(100, Math.max(0, progress));
  });

  return {
    currentUser,
    servers,
    activeServer,
    activeChannel,
    activeVoiceCall,
    showAchievement,
    nextRoleProgress,
    sendMessage,
    joinVoiceCall,
    leaveVoiceCall,
    roles
  };
}