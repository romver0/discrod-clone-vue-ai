<script setup lang="ts">
import { computed } from 'vue';
import { useDiscord } from '../composables/useDiscord';

const { currentUser, nextRoleProgress } = useDiscord();

const progressToNextLevel = computed(() => {
  const requiredXP = currentUser.value.level * 100;
  return (currentUser.value.experience / requiredXP) * 100;
});

const unlockedAchievements = computed(() => {
  return currentUser.value.achievements.filter(a => a.isUnlocked);
});

const nextRole = computed(() => {
  const roles = useDiscord().roles;
  return roles.find(role => role.requiredLevel > currentUser.value.level);
});
</script>

<template>
  <div class="bg-gradient-to-br from-discord-gray-300 to-discord-gray-200 p-4 border-t border-discord-gray-200 backdrop-blur-sm">
    <!-- User Profile Section -->
    <div class="flex items-start space-x-3">
      <div class="relative group">
        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-[2px] cursor-pointer transform transition-all duration-300 hover:scale-105">
          <div class="w-full h-full rounded-full bg-discord-gray-100 flex items-center justify-center text-xl">
            {{ currentUser.avatar }}
          </div>
        </div>
        <div class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-discord-gray-300"></div>
      </div>
      
      <div class="flex-1">
        <!-- Username and Role -->
        <div class="flex items-center space-x-2 mb-1">
          <h3 class="text-white font-bold text-lg">{{ currentUser.name }}</h3>
          <span 
            class="px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all duration-300 hover:scale-105 cursor-pointer"
            :style="{ 
              background: `linear-gradient(135deg, ${currentUser.role.color}88, ${currentUser.role.color}44)`,
              border: `1px solid ${currentUser.role.color}`
            }"
          >
            {{ currentUser.role.icon }}
            {{ currentUser.role.name }}
          </span>
        </div>

        <!-- Level and Streak -->
        <div class="flex items-center gap-3 mb-2">
          <div class="text-sm text-gray-300 flex items-center gap-1">
            <span class="text-xs px-1.5 py-0.5 rounded bg-discord-gray-100">Level {{ currentUser.level }}</span>
          </div>
          <div class="text-sm text-gray-300 flex items-center gap-1">
            <span class="animate-pulse">🔥</span>
            <span class="text-xs px-1.5 py-0.5 rounded bg-discord-gray-100">{{ currentUser.streak }} day streak</span>
          </div>
        </div>

        <!-- XP Progress -->
        <div class="relative mb-3">
          <div class="w-full h-2 bg-discord-gray-100 rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
              :style="{ width: `${progressToNextLevel}%` }"
            ></div>
          </div>
          <span class="absolute right-0 -top-4 text-xs text-gray-400">
            {{ Math.round(progressToNextLevel) }}%
          </span>
        </div>

        <!-- Next Role Progress -->
        <div v-if="nextRole" class="mb-3">
          <div class="flex justify-between text-xs text-gray-400 mb-1">
            <span class="flex items-center gap-1">
              {{ nextRole.icon }}
              Next: {{ nextRole.name }}
            </span>
            <span>Level {{ nextRole.requiredLevel }}</span>
          </div>
          <div class="relative w-full h-1 bg-discord-gray-100 rounded-full overflow-hidden">
            <div 
              class="h-full rounded-full transition-all duration-300 ease-out"
              :style="{ 
                width: `${nextRoleProgress}%`,
                background: `linear-gradient(90deg, ${nextRole.color}88, ${nextRole.color})`
              }"
            ></div>
          </div>
        </div>

        <!-- Achievements -->
        <div class="flex flex-wrap gap-1.5">
          <div 
            v-for="achievement in unlockedAchievements" 
            :key="achievement.id"
            class="group relative"
          >
            <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-gray-700 to-gray-600 p-[1px] cursor-pointer hover:from-blue-500 hover:to-purple-500 transition-all duration-300">
              <div class="w-full h-full rounded-lg bg-discord-gray-100 flex items-center justify-center text-sm hover:scale-105 transition-transform duration-200">
                {{ achievement.icon }}
              </div>
            </div>
            <!-- Tooltip -->
            <div class="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {{ achievement.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.from-discord-gray-300 {
  --tw-gradient-from: #2f3136;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgb(47 49 54 / 0));
}

.to-discord-gray-200 {
  --tw-gradient-to: #36393f;
}
</style></content>