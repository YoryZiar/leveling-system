<template>
  <div class="px-margin py-stack-md max-w-5xl mx-auto w-full flex flex-col gap-stack-lg">
    
    <!-- Penalty Banner -->
    <div v-if="state.profile.penaltyMessage" class="bg-error/10 border border-error p-stack-md rounded-sm relative overflow-hidden group">
      <div class="absolute inset-0 bg-error/5 group-hover:bg-error/10 transition-colors"></div>
      <div class="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div class="flex items-start gap-3">
          <span class="material-symbols-outlined text-error text-[24px]">gavel</span>
          <div>
            <h3 class="font-headline-lg-mobile text-error uppercase tracking-widest mb-1 glow-text">PENALTY ZONE ACTIVATED</h3>
            <p class="font-body-md text-error/80 text-sm leading-relaxed">{{ state.profile.penaltyMessage }}</p>
          </div>
        </div>
        <button @click="clearPenalty" class="whitespace-nowrap px-4 py-2 border border-error text-error font-label-mono text-xs uppercase hover:bg-error hover:text-surface transition-colors active:scale-95 duration-100">
          AKUI KEKALAHAN
        </button>
      </div>
    </div>

    <!-- Timer Warning Banner -->
    <section class="bg-error-container/20 border border-error/50 p-stack-md rounded flex flex-col sm:flex-row justify-between items-center gap-4 glow-active shadow-[0_0_15px_rgba(255,180,171,0.1)]">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-error animate-pulse text-[32px]">warning</span>
        <div>
          <h2 class="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-error uppercase tracking-tight">HUKUMAN MENANTI</h2>
          <p class="font-label-mono text-label-mono text-error/80 mt-1">Selesaikan sebelum batas waktu untuk menghindari zona penalti.</p>
        </div>
      </div>
      <div class="flex flex-col items-end">
        <span class="font-label-mono text-label-mono text-on-surface-variant mb-1">SISA WAKTU</span>
        <div class="font-label-mono text-display-lg text-primary-container tracking-widest glow-text">
          {{ formattedTimer }}
        </div>
      </div>
    </section>

    <!-- Quest Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
      <!-- Left Column: Tasks -->
      <div class="col-span-1 lg:col-span-2 flex flex-col gap-stack-md">
        <div class="flex justify-between items-end border-b border-outline-variant pb-2 mb-2">
          <h3 class="font-headline-lg-mobile text-headline-lg-mobile uppercase text-on-surface tracking-tighter">PERSIAPAN FISIK</h3>
          <span class="font-label-mono text-label-mono text-primary-container">PERINGATAN SISTEM</span>
        </div>
        
        <QuestCard v-for="quest in state.quests" :key="quest.id" :quest="quest" />
      </div>

      <!-- Right Column: Rewards -->
      <div class="col-span-1 flex flex-col gap-stack-md">
        <div class="hud-border bg-surface-container-low p-stack-md rounded h-full flex flex-col">
          <h3 class="font-headline-lg-mobile text-[20px] md:text-headline-lg-mobile uppercase text-primary tracking-tighter border-b border-outline-variant pb-2 mb-4 glow-text">HADIAH PENYELESAIAN</h3>
          
          <div class="flex flex-col gap-4 flex-grow">
            <div class="flex items-center gap-4 bg-surface-container p-3 rounded-sm border border-outline-variant/50" :class="{'border-primary-container': allQuestsCompleted && !state.rewardsClaimed}">
              <div class="w-10 h-10 bg-primary-container/10 border border-primary-container/30 flex items-center justify-center text-primary-container">
                <span class="font-label-mono text-label-mono">XP</span>
              </div>
              <div>
                <p class="font-label-mono text-[10px] text-on-surface-variant">EXPERIENCE POINTS</p>
                <p class="font-headline-lg-mobile text-lg text-on-surface">+{{ state.dailyRewards?.exp || 100 }} XP</p>
              </div>
            </div>
            
            <div class="flex items-center gap-4 bg-surface-container p-3 rounded-sm border border-outline-variant/50" :class="{'border-yellow-500': allQuestsCompleted && !state.rewardsClaimed}">
              <div class="w-10 h-10 bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-500">
                <span class="material-symbols-outlined">monetization_on</span>
              </div>
              <div>
                <p class="font-label-mono text-[10px] text-on-surface-variant">MATA UANG SISTEM</p>
                <p class="font-headline-lg-mobile text-lg text-on-surface">+{{ state.dailyRewards?.gold || 500 }} G</p>
              </div>
            </div>
          </div>
          
          <button 
            @click="handleClaim"
            :disabled="!allQuestsCompleted || state.rewardsClaimed"
            class="w-full mt-6 bg-surface-container border py-4 font-headline-lg-mobile text-lg md:text-headline-lg-mobile uppercase tracking-widest transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            :class="allQuestsCompleted && !state.rewardsClaimed ? 'border-primary-container text-primary-container glow-box hover:bg-primary-container hover:text-surface' : 'border-outline-variant text-on-surface-variant'"
          >
            {{ state.rewardsClaimed ? 'HADIAH DIKLAIM' : 'KLAIM HADIAH' }}
          </button>
          <p v-if="!allQuestsCompleted" class="text-center mt-2 font-label-mono text-[10px] text-error/60">SELESAIKAN SEMUA TUGAS TERLEBIH DAHULU</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { state, allQuestsCompleted, claimRewards, initLocalStorage, checkAndResetDailyQuests } = useHunterState()

onMounted(() => {
  initLocalStorage()
  startMidnightTimer()
})

const timerHours = ref(0)
const timerMinutes = ref(0)
const timerSeconds = ref(0)

const formattedTimer = computed(() => {
  const h = timerHours.value.toString().padStart(2, '0')
  const m = timerMinutes.value.toString().padStart(2, '0')
  const s = timerSeconds.value.toString().padStart(2, '0')
  return `${h}:${m}:${s}`
})

let interval = null
const startMidnightTimer = () => {
  if (interval) clearInterval(interval)
  
  const updateTimer = async () => {
    const now = new Date()
    const midnight = new Date()
    midnight.setHours(24, 0, 0, 0)
    
    const diff = midnight - now
    if (diff <= 0) {
      // Midnight reached! Reset and potentially trigger penalty.
      timerHours.value = 0
      timerMinutes.value = 0
      timerSeconds.value = 0
      clearInterval(interval)
      
      await checkAndResetDailyQuests()
      // Restart the timer for the next day
      startMidnightTimer()
      return
    }
    
    timerHours.value = Math.floor((diff / (1000 * 60 * 60)) % 24)
    timerMinutes.value = Math.floor((diff / 1000 / 60) % 60)
    timerSeconds.value = Math.floor((diff / 1000) % 60)
  }
  
  updateTimer()
  interval = setInterval(updateTimer, 1000)
}

onUnmounted(() => {
  if (interval) clearInterval(interval)
})

const handleClaim = () => {
  claimRewards()
}
</script>
