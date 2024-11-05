<script setup lang="ts">
import { useDiscord } from '../composables/useDiscord';

const { servers, activeServer } = useDiscord();

const setActiveServer = (serverId: number) => {
  const server = servers.value.find(s => s.id === serverId);
  if (server) {
    activeServer.value = server;
  }
};
</script>

<template>
  <div class="w-[72px] bg-discord-gray-300 h-screen flex flex-col items-center pt-3 gap-2">
    <div
      v-for="server in servers"
      :key="server.id"
      @click="setActiveServer(server.id)"
      class="w-12 h-12 rounded-full bg-discord-gray-100 flex items-center justify-center cursor-pointer hover:rounded-2xl transition-all duration-200"
      :class="{ 'rounded-2xl': activeServer.id === server.id }"
    >
      {{ server.icon }}
    </div>
  </div>
</template>