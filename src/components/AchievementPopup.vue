<script setup lang="ts">
import { useDiscord } from '../composables/useDiscord';

const { showAchievement } = useDiscord();
</script>

<template>
  <Transition name="achievement">
    <div
      v-if="showAchievement"
      class="fixed top-4 right-4 bg-discord-gray-200 rounded-lg shadow-lg p-4 flex items-center gap-3 z-50"
    >
      <div class="w-12 h-12 rounded-full bg-discord-gray-100 flex items-center justify-center text-2xl">
        {{ showAchievement.icon }}
      </div>
      <div>
        <h3 class="text-white font-bold">{{ showAchievement.name }}</h3>
        <p class="text-gray-400 text-sm">{{ showAchievement.description }}</p>
        <p v-if="showAchievement.xpReward" class="text-green-400 text-xs mt-1">
          +{{ showAchievement.xpReward }} XP
        </p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.achievement-enter-active,
.achievement-leave-active {
  transition: all 0.3s ease;
}

.achievement-enter-from,
.achievement-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>