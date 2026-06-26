<template>
  <div class="p-stack-md flex flex-col gap-stack-lg max-w-4xl mx-auto">
    
    <!-- Penalty Banner -->
    <div v-if="state.profile.penaltyMessage" class="bg-error/10 border border-error p-stack-md rounded-sm relative overflow-hidden group">
      <div class="absolute inset-0 bg-error/5 group-hover:bg-error/10 transition-colors"></div>
      <div class="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div class="flex items-start gap-3">
          <span class="material-symbols-outlined text-error text-[24px]">gavel</span>
          <div>
            <h3 class="font-headline-lg-mobile text-error uppercase tracking-widest mb-1 glow-text">PERINGATAN SISTEM</h3>
            <p class="font-body-md text-error/80 text-sm leading-relaxed">{{ state.profile.penaltyMessage }}</p>
          </div>
        </div>
        <button @click="clearPenalty" class="whitespace-nowrap px-4 py-2 border border-error text-error font-label-mono text-xs uppercase hover:bg-error hover:text-surface transition-colors active:scale-95 duration-100">
          AKUI KEKALAHAN
        </button>
      </div>
    </div>

    <!-- Profile & Level Badge -->
    <section class="bg-surface-container hud-border p-stack-md flex flex-col items-center justify-center relative overflow-hidden group w-full">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-container/10 via-transparent to-transparent opacity-50"></div>
      
      <div class="relative w-32 h-32 mb-stack-md">
        <svg class="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] opacity-50 text-primary-container" viewBox="0 0 100 100">
          <polygon fill="none" points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" stroke="currentColor" stroke-width="1"></polygon>
        </svg>
        <div class="absolute inset-2 bg-surface-dim flex items-center justify-center border border-primary-container hud-glow rotate-45">
          <div class="-rotate-45 text-center">
            <div class="font-label-mono text-label-mono text-on-surface-variant mb-1">LEVEL</div>
            <div class="font-display-lg text-display-lg text-primary-container hud-text-glow">{{ state.profile.level }}</div>
          </div>
        </div>
      </div>
      
      <h2 class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface text-center uppercase tracking-tight">{{ state.profile.name }}</h2>
      <div class="font-label-mono text-label-mono text-error uppercase tracking-widest mt-unit border border-error px-2 py-1 rounded">{{ state.profile.hunterClass }}</div>
    </section>

    <!-- Rank & Class Info -->
    <section class="bg-surface-container hud-border p-stack-md flex flex-col justify-between w-full">
      <div class="flex justify-between items-start mb-stack-lg border-b border-outline-variant pb-stack-md">
        <div>
          <div class="font-label-mono text-label-mono text-on-surface-variant mb-unit">RANK SEKARANG</div>
          <div class="font-display-lg text-[32px] md:text-display-lg text-on-surface">{{ state.profile.rank }}</div>
        </div>
        <div class="text-right">
          <div class="font-label-mono text-label-mono text-on-surface-variant mb-unit">GOLD</div>
          <div class="font-headline-lg-mobile text-headline-lg-mobile text-yellow-500 uppercase glow-text">{{ state.profile.gold }} G</div>
        </div>
      </div>
      
      <div>
        <div class="flex justify-between items-end mb-unit font-label-mono text-label-mono">
          <span class="text-on-surface-variant">PENGALAMAN (EXP)</span>
          <span class="text-primary-container">{{ state.profile.exp }} / {{ state.profile.maxExp }}</span>
        </div>
        <div class="w-full h-4 bg-surface-dim border border-outline-variant relative overflow-hidden">
          <div class="absolute top-0 left-0 h-full bg-primary-container hud-glow transition-all duration-500" :style="{ width: `${(state.profile.exp / state.profile.maxExp) * 100}%` }">
            <div class="absolute top-0 right-0 h-full w-4 bg-white/50 blur-sm"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats HUD -->
    <section class="bg-surface-container hud-border p-stack-md w-full">
      <div class="flex justify-between items-center mb-stack-md">
        <h3 class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface uppercase border-l-4 border-primary-container pl-unit">Status Fisik</h3>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <div v-for="(val, key) in state.stats" :key="key" class="bg-surface-dim border border-outline-variant p-stack-sm flex items-center justify-between group hover:border-primary-container transition-colors">
          <div class="flex items-center gap-stack-sm">
            <span class="material-symbols-outlined text-primary-container" style="font-variation-settings: 'FILL' 1;">{{ getIcon(key) }}</span>
            <span class="font-label-mono text-label-mono text-on-surface-variant uppercase">{{ key }}</span>
          </div>
          <div class="flex items-center gap-stack-sm">
            <span class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">{{ Number(val).toFixed(1) }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { state, initLocalStorage, clearPenalty } = useHunterState()

onMounted(() => {
  initLocalStorage()
})

const getIcon = (key) => {
  const icons = {
    str: 'fitness_center',
    agi: 'directions_run',
    end: 'shield',
    per: 'visibility',
    int: 'psychology'
  }
  return icons[key] || 'star'
}
</script>
