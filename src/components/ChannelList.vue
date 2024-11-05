<script setup lang="ts">
import { ref } from 'vue';
import { useDiscord } from '../composables/useDiscord';

const { activeServer, activeChannel, activeVoiceCall, joinVoiceCall, leaveVoiceCall } = useDiscord();
const expandedCategories = ref<number[]>([1, 2, 3]); // All categories expanded by default

const toggleCategory = (categoryId: number) => {
  const index = expandedCategories.value.indexOf(categoryId);
  if (index === -1) {
    expandedCategories.value.push(categoryId);
  } else {
    expandedCategories.value.splice(index, 1);
  }
};

const setActiveChannel = (channel: any) => {
  if (channel.type === 'voice') {
    if (activeVoiceCall?.value?.id === channel.id) {
      leaveVoiceCall();
    } else {
      joinVoiceCall(channel);
    }
  } else {
    activeChannel.value = channel;
  }
};
</script>

<template>
  <div class="w-60 bg-discord-gray-200 h-screen overflow-y-auto">
    <div class="p-4 border-b border-discord-gray-300">
      <h2 class="text-white font-bold">{{ activeServer.name }}</h2>
    </div>
    
    <div class="p-2">
      <div v-for="category in activeServer.categories" :key="category.id" class="mb-4">
        <div
          @click="toggleCategory(category.id)"
          class="flex items-center p-2 text-gray-300 uppercase text-xs font-bold cursor-pointer hover:text-gray-200 transition-colors duration-200"
        >
          <span class="transform transition-transform duration-200" :class="{ 'rotate-90': expandedCategories.includes(category.id) }">▶</span>
          <span class="ml-1">{{ category.name }}</span>
        </div>
        
        <div v-show="expandedCategories.includes(category.id)" class="space-y-1">
          <div
            v-for="channel in category.channels"
            :key="channel.id"
            @click="setActiveChannel(channel)"
            class="flex items-center p-2 ml-2 rounded cursor-pointer group transition-all duration-200 hover:bg-discord-gray-100 text-gray-400 hover:text-gray-200"
            :class="{ 
              'bg-discord-gray-100 text-white': activeChannel.id === channel.id,
              'text-green-400': channel.type === 'voice' && activeVoiceCall?.id === channel.id 
            }"
          >
            <span class="mr-2" :class="{ 'animate-pulse': channel.type === 'voice' && activeVoiceCall?.id === channel.id }">
              {{ channel.type === 'text' ? '#' : '🔊' }}
            </span>
            {{ channel.name }}
            <span v-if="channel.type === 'voice'" class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {{ activeVoiceCall?.id === channel.id ? 'Leave' : 'Join' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>