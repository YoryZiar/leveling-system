<template>
  <nav class="md:hidden fixed bottom-0 left-0 w-full h-[80px] flex justify-around items-center px-4 border-t border-outline-variant bg-surface-container-highest shadow-[0_-4px_20px_rgba(0,210,255,0.15)] z-50">
    <NuxtLink to="/" class="flex flex-col items-center justify-center text-on-surface-variant opacity-60 pt-2 hover:opacity-100 hover:text-primary transition-all active:scale-90 w-full h-full" exact-active-class="text-primary-container opacity-100 shadow-[0_0_12px_rgba(0,210,255,0.4)] border-t-2 border-primary-container">
      <span class="material-symbols-outlined mb-1">person</span>
      <span class="font-label-mono text-[10px] uppercase font-bold">STATUS</span>
    </NuxtLink>
    <NuxtLink to="/quests" class="flex flex-col items-center justify-center text-on-surface-variant opacity-60 pt-2 hover:opacity-100 hover:text-primary transition-all active:scale-90 w-full h-full" active-class="text-primary-container opacity-100 shadow-[0_0_12px_rgba(0,210,255,0.4)] border-t-2 border-primary-container">
      <span class="material-symbols-outlined mb-1">assignment</span>
      <span class="font-label-mono text-[10px] uppercase font-bold">QUESTS</span>
    </NuxtLink>
    <NuxtLink to="/skills" class="flex flex-col items-center justify-center text-on-surface-variant opacity-60 pt-2 hover:opacity-100 hover:text-primary transition-all active:scale-90 w-full h-full" active-class="text-primary-container opacity-100 shadow-[0_0_12px_rgba(0,210,255,0.4)] border-t-2 border-primary-container">
      <span class="material-symbols-outlined mb-1">bolt</span>
      <span class="font-label-mono text-[10px] uppercase font-bold">SKILLS</span>
    </NuxtLink>
    <NuxtLink to="/rank" class="flex flex-col items-center justify-center text-on-surface-variant opacity-60 pt-2 hover:opacity-100 hover:text-primary transition-all active:scale-90 w-full h-full" active-class="text-primary-container opacity-100 shadow-[0_0_12px_rgba(0,210,255,0.4)] border-t-2 border-primary-container">
      <span class="material-symbols-outlined mb-1">military_tech</span>
      <span class="font-label-mono text-[10px] uppercase font-bold">RANK</span>
    </NuxtLink>
  </nav>
</template>

<script setup>
</script>
