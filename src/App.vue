<script setup lang="ts">
import ServerList from './components/ServerList.vue';
import ChannelList from './components/ChannelList.vue';
import ChatArea from './components/ChatArea.vue';
import MembersList from './components/MembersList.vue';
import UserInfo from './components/UserInfo.vue';
import VoiceCall from './components/VoiceCall.vue';
import AchievementPopup from './components/AchievementPopup.vue';
</script>

<template>
  <div class="flex h-screen">
    <ServerList />
    <div class="flex flex-col w-60">
      <div class="flex-1">
        <ChannelList />
      </div>
      <UserInfo />
    </div>
    <div class="flex-1 flex">
      <ChatArea />
      <MembersList />
    </div>
    <VoiceCall />
    <AchievementPopup />
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.rotate-90 {
  transform: rotate(90deg);
}
</style>