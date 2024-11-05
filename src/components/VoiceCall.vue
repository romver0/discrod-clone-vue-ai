<script setup lang="ts">
import { ref } from 'vue';
import { useDiscord } from '../composables/useDiscord';

const { activeVoiceCall, leaveVoiceCall } = useDiscord();
const isMuted = ref(false);
const isDeafened = ref(false);
const isVideoOn = ref(false);
const isScreenSharing = ref(false);

const connectedUsers = [
  { id: 1, name: 'Current User', avatar: '👤', isSpeaking: true, isMuted: false },
  { id: 2, name: 'Math Tutor', avatar: '👨‍🏫', isSpeaking: false, isMuted: true },
];

const toggleMute = () => {
  isMuted.value = !isMuted.value;
};

const toggleDeafen = () => {
  isDeafened.value = !isDeafened.value;
  if (isDeafened.value) {
    isMuted.value = true;
  }
};

const toggleVideo = () => {
  isVideoOn.value = !isVideoOn.value;
};

const toggleScreenShare = () => {
  isScreenSharing.value = !isScreenSharing.value;
};
</script>

<template>
  <div v-if="activeVoiceCall" 
    class="fixed bottom-4 right-4 bg-discord-gray-200 rounded-lg shadow-lg p-4 w-80 transform transition-all duration-300 ease-in-out">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-2">
        <span class="text-green-400">🔊</span>
        <span class="text-white font-medium">{{ activeVoiceCall.name }}</span>
      </div>
      <button 
        @click="leaveVoiceCall"
        class="p-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200"
      >
        <span class="text-white">✕</span>
      </button>
    </div>

    <!-- Connected Users -->
    <div class="mb-4 space-y-2">
      <div v-for="user in connectedUsers" 
        :key="user.id"
        class="flex items-center justify-between bg-discord-gray-300 rounded p-2"
      >
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 rounded-full bg-discord-gray-100 flex items-center justify-center">
            {{ user.avatar }}
          </div>
          <span class="text-white text-sm">{{ user.name }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <span v-if="user.isSpeaking" class="text-green-400 text-xs">
            🎤
          </span>
          <span v-if="user.isMuted" class="text-red-400 text-xs">
            🔇
          </span>
        </div>
      </div>
    </div>
    
    <!-- Controls -->
    <div class="flex justify-center space-x-4">
      <button 
        @click="toggleMute"
        class="p-2 rounded-full transition-colors duration-200"
        :class="isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-discord-gray-300 hover:bg-discord-gray-100'"
      >
        <span class="text-white">{{ isMuted ? '🔇' : '🎤' }}</span>
      </button>
      
      <button 
        @click="toggleDeafen"
        class="p-2 rounded-full transition-colors duration-200"
        :class="isDeafened ? 'bg-red-500 hover:bg-red-600' : 'bg-discord-gray-300 hover:bg-discord-gray-100'"
      >
        <span class="text-white">{{ isDeafened ? '🔇' : '🔊' }}</span>
      </button>
      
      <button 
        @click="toggleVideo"
        class="p-2 rounded-full transition-colors duration-200"
        :class="isVideoOn ? 'bg-green-500 hover:bg-green-600' : 'bg-discord-gray-300 hover:bg-discord-gray-100'"
      >
        <span class="text-white">🎥</span>
      </button>
      
      <button 
        @click="toggleScreenShare"
        class="p-2 rounded-full transition-colors duration-200"
        :class="isScreenSharing ? 'bg-green-500 hover:bg-green-600' : 'bg-discord-gray-300 hover:bg-discord-gray-100'"
      >
        <span class="text-white">🖥️</span>
      </button>
    </div>
  </div>
</template>