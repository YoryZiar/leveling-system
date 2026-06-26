<template>
  <div class="bg-surface text-on-surface font-body-md min-h-screen flex flex-col pb-[80px] md:pb-0 pt-[80px] relative overflow-hidden">
    <div class="fixed inset-0 hud-scanline z-0 pointer-events-none opacity-50"></div>
    <TopAppBar />
    
    <main class="flex-1 w-full max-w-[1200px] mx-auto relative z-10">
      <slot />
    </main>
    
    <BottomNavBar />
  </div>
</template>

<script setup>
</script>
