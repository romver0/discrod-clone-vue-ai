<script setup lang="ts">
import { computed } from 'vue';
import { useDiscord } from '../composables/useDiscord';

const { currentUser, activeServer } = useDiscord();

const onlineMembers = computed(() => [
  {
    id: 1,
    name: 'Current User',
    avatar: '👤',
    status: 'online',
    role: currentUser.value.role
  },
  {
    id: 2,
    name: 'Math Tutor',
    avatar: '👨‍🏫',
    status: 'online',
    role: { name: 'Subject Expert', color: '#7289da' }
  },
  {
    id: 3,
    name: 'Language Helper',
    avatar: '👩‍🏫',
    status: 'idle',
    role: { name: 'Knowledge Seeker', color: '#f04747' }
  }
]);

const offlineMembers = computed(() => [
  {
    id: 4,
    name: 'Coding Buddy',
    avatar: '👨‍💻',
    status: 'offline',
    role: { name: 'Active Student', color: '#faa61a' }
  },
  {
    id: 5,
    name: 'Study Partner',
    avatar: '👩‍💻',
    status: 'offline',
    role: { name: 'Novice Learner', color: '#43b581' }
  }
]);

const statusIcon = (status: string) => {
  switch (status) {
    case 'online': return '🟢';
    case 'idle': return '🌙';
    case 'dnd': return '⛔';
    default: return '⚫';
  }
};
</script>

<template>
  <div class="w-60 bg-discord-gray-200 border-l border-discord-gray-300">
    <div class="p-4 border-b border-discord-gray-300">
      <h2 class="text-white font-bold text-sm">Members — {{ onlineMembers.length + offlineMembers.length }}</h2>
    </div>
    
    <div class="p-2 overflow-y-auto h-[calc(100vh-56px)]">
      <!-- Online Members -->
      <div class="mb-4">
        <div class="text-xs text-gray-400 font-semibold px-2 mb-2">
          ONLINE — {{ onlineMembers.length }}
        </div>
        <div 
          v-for="member in onlineMembers" 
          :key="member.id"
          class="flex items-center p-2 rounded hover:bg-discord-gray-100 cursor-pointer group"
        >
          <div class="relative">
            <div class="w-8 h-8 rounded-full bg-discord-gray-100 flex items-center justify-center">
              {{ member.avatar }}
            </div>
            <span class="absolute -bottom-1 -right-1 text-xs">{{ statusIcon(member.status) }}</span>
          </div>
          <div class="ml-2">
            <span 
              class="text-sm font-medium"
              :style="{ color: member.role.color }"
            >
              {{ member.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- Offline Members -->
      <div>
        <div class="text-xs text-gray-400 font-semibold px-2 mb-2">
          OFFLINE — {{ offlineMembers.length }}
        </div>
        <div 
          v-for="member in offlineMembers" 
          :key="member.id"
          class="flex items-center p-2 rounded hover:bg-discord-gray-100 cursor-pointer group opacity-50"
        >
          <div class="relative">
            <div class="w-8 h-8 rounded-full bg-discord-gray-100 flex items-center justify-center">
              {{ member.avatar }}
            </div>
            <span class="absolute -bottom-1 -right-1 text-xs">{{ statusIcon(member.status) }}</span>
          </div>
          <div class="ml-2">
            <span 
              class="text-sm font-medium"
              :style="{ color: member.role.color }"
            >
              {{ member.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>