<script setup lang="ts">
import { ref } from 'vue';
import { format } from 'date-fns';
import { useDiscord } from '../composables/useDiscord';

const { activeChannel, sendMessage } = useDiscord();
const newMessage = ref('');

const handleSendMessage = () => {
  if (newMessage.value.trim()) {
    sendMessage(newMessage.value);
    newMessage.value = '';
  }
};
</script>

<template>
  <div class="flex-1 bg-discord-gray-100 flex flex-col">
    <div class="p-4 border-b border-discord-gray-300">
      <h2 class="text-white font-bold flex items-center">
        <span class="mr-2">#</span>
        {{ activeChannel.name }}
      </h2>
    </div>
    
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <div
        v-for="message in activeChannel.messages"
        :key="message.id"
        class="flex items-start gap-4"
      >
        <div class="w-10 h-10 rounded-full bg-discord-gray-200 flex items-center justify-center">
          {{ message.user.avatar }}
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="font-bold text-white">{{ message.user.name }}</span>
            <span class="text-xs text-gray-400">{{ format(message.timestamp, 'HH:mm') }}</span>
          </div>
          <p class="text-gray-300">{{ message.content }}</p>
        </div>
      </div>
    </div>
    
    <div class="p-4">
      <div class="bg-gray-700 rounded-lg p-4">
        <input
          v-model="newMessage"
          @keyup.enter="handleSendMessage"
          type="text"
          placeholder="Message #general"
          class="w-full bg-transparent text-white outline-none"
        />
      </div>
    </div>
  </div>
</template>