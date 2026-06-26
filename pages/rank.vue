<template>
  <div class="px-margin py-stack-md max-w-4xl mx-auto md:px-0">
    <!-- Header Section -->
    <div class="mb-stack-lg mt-stack-md">
      <h2 class="font-display-lg text-display-lg text-on-surface glow-text mb-unit uppercase">GLOBAL RANKING</h2>
      <p class="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest">Sistem Evaluasi Kekuatan Hunter</p>
    </div>

    <!-- Current User Status Panel -->
    <div class="glass-panel rounded-lg p-stack-md mb-stack-lg relative overflow-hidden group">
      <div class="absolute inset-0 bg-gradient-to-r from-primary-container/10 to-transparent opacity-50"></div>
      <div class="absolute top-0 right-0 w-32 h-32 bg-primary-container/20 rounded-full blur-[50px] -mr-16 -mt-16 pointer-events-none"></div>
      
      <div class="flex items-center justify-between relative z-10">
        <div class="flex items-center gap-gutter">
          <div class="w-16 h-16 hexagon bg-surface-container-highest border-2 border-outline-variant flex items-center justify-center relative shadow-[0_0_15px_rgba(156,163,175,0.3)]">
            <span class="font-headline-lg text-headline-lg" :class="getRankColorClass(state.profile.rank)">{{ state.profile.rank.charAt(0) }}</span>
            <div class="absolute -bottom-2 bg-surface px-2 border border-outline-variant rounded text-[10px] text-on-surface-variant font-label-mono tracking-wider">RANK</div>
          </div>
          <div>
            <div class="font-label-mono text-[10px] text-primary-container mb-1 uppercase">Posisi Anda: #{{ userRankPosition }}</div>
            <h3 class="font-headline-lg-mobile text-lg md:text-headline-lg-mobile text-on-surface">{{ state.profile.name }}</h3>
            <div class="text-sm text-on-surface-variant mt-1 flex items-center gap-2">
              <span class="material-symbols-outlined text-sm">trending_up</span>
              <span class="text-xs">Membutuhkan {{ state.profile.maxExp - state.profile.exp }} EXP untuk Rank Berikutnya</span>
            </div>
          </div>
        </div>
        <div class="hidden md:flex flex-col items-end">
          <div class="font-label-mono text-[10px] text-on-surface-variant mb-2">TOTAL EXP</div>
          <div class="font-display-lg text-4xl text-primary-container glow-text">{{ state.profile.exp.toLocaleString() }}</div>
        </div>
      </div>
    </div>

    <!-- Leaderboard List -->
    <div class="space-y-unit relative">
      <!-- Loading State -->
      <div v-if="isLoading" class="absolute inset-0 z-10 flex justify-center items-center bg-background/50 backdrop-blur-sm min-h-[200px]">
        <span class="material-symbols-outlined animate-spin text-[40px] text-primary-container">refresh</span>
      </div>

      <div v-for="(hunter, index) in leaderboard" :key="hunter.id" 
           class="glass-panel p-stack-sm flex items-center justify-between hover:bg-surface-container-high/50 transition-colors border-l-4"
           :class="getRankBorderClass(hunter.profile.rank)">
        <div class="flex items-center gap-stack-md">
          <div class="w-8 text-center font-label-mono text-label-mono text-on-surface-variant">#{{ index + 1 }}</div>
          
          <div class="w-10 h-10 hexagon bg-surface flex items-center justify-center border"
               :class="getRankBorderClass(hunter.profile.rank) + ' ' + getRankShadowClass(hunter.profile.rank)">
            <span class="font-bold text-lg" :class="getRankColorClass(hunter.profile.rank)">{{ hunter.profile.rank.charAt(0) }}</span>
          </div>
          
          <div class="flex items-center gap-3">
             <div class="w-10 h-10 bg-surface-container-highest rounded-sm flex items-center justify-center border border-surface-bright">
               <span class="material-symbols-outlined text-on-surface-variant">person</span>
            </div>
            <div>
              <div class="font-bold text-on-surface flex items-center gap-2">
                {{ hunter.profile.name }}
                <span v-if="hunter.id === currentUser?.uid" class="font-label-mono text-[8px] bg-primary-container/20 text-primary-container px-1 py-0.5 rounded">YOU</span>
              </div>
              <div class="font-label-mono text-[10px] text-on-surface-variant">{{ hunter.profile.hunterClass || 'UNKNOWN CLASS' }}</div>
            </div>
          </div>
        </div>
        <div class="font-label-mono text-label-mono hidden sm:block" :class="getRankColorClass(hunter.profile.rank)">
          EXP: {{ hunter.profile.exp.toLocaleString() }}
        </div>
      </div>
      
      <div v-if="leaderboard.length > 0" class="py-stack-sm flex justify-center">
        <span class="material-symbols-outlined text-on-surface-variant opacity-50">more_vert</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const { state, initLocalStorage, fetchLeaderboard } = useHunterState()
const { $auth } = useNuxtApp()

const leaderboard = ref([])
const isLoading = ref(true)
const currentUser = ref(null)

onMounted(async () => {
  initLocalStorage()
  
  if ($auth) {
    currentUser.value = $auth.currentUser
  }
  
  leaderboard.value = await fetchLeaderboard()
  isLoading.value = false
})

const userRankPosition = computed(() => {
  const index = leaderboard.value.findIndex(h => h.id === currentUser.value?.uid)
  if (index !== -1) return index + 1
  return state.value.profile.position.toLocaleString() // Fallback
})

const totalStats = computed(() => {
  return Object.values(state.value.stats).reduce((a, b) => a + b, 0)
})

// Helper functions for rank colors
const getRankColorClass = (rank) => {
  if (rank.includes('S')) return 'text-amber-500'
  if (rank.includes('A')) return 'text-red-500'
  if (rank.includes('B')) return 'text-purple-500'
  if (rank.includes('C')) return 'text-blue-500'
  if (rank.includes('D')) return 'text-green-500'
  return 'text-gray-400'
}

const getRankBorderClass = (rank) => {
  if (rank.includes('S')) return 'border-amber-500/50'
  if (rank.includes('A')) return 'border-red-500/50'
  if (rank.includes('B')) return 'border-purple-500/50'
  if (rank.includes('C')) return 'border-blue-500/50'
  if (rank.includes('D')) return 'border-green-500/50'
  return 'border-gray-400/50'
}

const getRankShadowClass = (rank) => {
  if (rank.includes('S')) return 'shadow-[0_0_10px_rgba(245,158,11,0.2)]'
  if (rank.includes('A')) return 'shadow-[0_0_10px_rgba(239,68,68,0.2)]'
  if (rank.includes('B')) return 'shadow-[0_0_10px_rgba(168,85,247,0.2)]'
  if (rank.includes('C')) return 'shadow-[0_0_10px_rgba(59,130,246,0.2)]'
  if (rank.includes('D')) return 'shadow-[0_0_10px_rgba(34,197,94,0.2)]'
  return 'shadow-[0_0_10px_rgba(156,163,175,0.2)]'
}
</script>
