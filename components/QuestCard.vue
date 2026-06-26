<template>
  <NuxtLink :to="`/exercise/${quest.id}`" class="block">
    <div class="bg-[#1a1a1a] border border-[#334155] p-stack-md flex flex-col gap-3 rounded hover:border-primary-container/50 transition-colors relative overflow-hidden" :class="{'glow-active border-primary-container': isCompleted}">
      <div class="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,210,255,0.05)] pointer-events-none"></div>
      
      <div class="flex justify-between items-center relative z-10">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-primary-container">{{ quest.icon }}</span>
          <span class="font-headline-lg-mobile text-lg md:text-headline-lg-mobile uppercase text-on-surface" :class="{'glow-text text-primary-container': isCompleted}">{{ quest.title }}</span>
        </div>
        <span v-if="isCompleted" class="font-label-mono text-label-mono text-primary-container bg-primary-container/10 px-2 py-1 border border-primary-container/50">SELESAI</span>
      </div>
      
      <div class="flex justify-between items-end mt-2 relative z-10">
        <span class="font-label-mono text-label-mono" :class="isCompleted ? 'text-primary-container' : 'text-on-surface-variant'">PROGRES</span>
        <span class="font-headline-lg-mobile text-lg md:text-headline-lg-mobile" :class="isCompleted ? 'text-primary-container glow-text' : 'text-primary-container'">{{ quest.current }} / {{ quest.target }} <span class="text-xs">{{ quest.unit?.toUpperCase() || 'X' }}</span></span>
      </div>
      
      <div class="h-1 bg-surface-container-high w-full mt-1 relative z-10">
        <div class="h-full bg-primary-container transition-all duration-300" :class="{'progress-bar-fill': isCompleted}" :style="{ width: `${progressPercent}%` }"></div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  quest: {
    type: Object,
    required: true
  }
})

const progressPercent = computed(() => {
  return (props.quest.current / props.quest.target) * 100
})

const isCompleted = computed(() => {
  return props.quest.current >= props.quest.target
})
</script>
