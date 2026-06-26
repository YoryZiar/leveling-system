<template>
  <div class="flex-1 flex flex-col relative z-10 px-margin py-stack-lg max-w-4xl mx-auto w-full h-full min-h-[80vh]">
    <!-- Top Navigation Anchor (Shared Component Schema) -->
    <header class="w-full top-0 sticky flex justify-between items-center mb-6 z-50">
      <NuxtLink to="/quests" class="text-on-surface-variant hover:text-primary transition-colors active:scale-95 duration-100 flex items-center justify-center p-unit">
        <span class="material-symbols-outlined text-[24px]">arrow_back</span>
      </NuxtLink>
      <div class="font-headline-lg-mobile text-headline-lg-mobile uppercase tracking-widest text-primary flex items-center justify-center">
        QUEST LOG: DAILY TRIALS
      </div>
      <div class="w-6"></div> <!-- Spacer for balance -->
    </header>

    <div v-if="quest">
      <!-- Exercise Header -->
      <div class="flex flex-col items-center mb-stack-lg text-center">
        <div class="inline-flex items-center justify-center bg-surface-container-high hud-border px-stack-md py-unit mb-stack-sm">
          <span class="font-label-mono text-label-mono text-primary uppercase tracking-widest">TRAINING</span>
        </div>
        <h1 class="font-display-lg text-[40px] md:text-display-lg text-on-surface uppercase glow-text tracking-tighter">{{ quest.title }}</h1>
        
        <!-- Illustration / Description Card -->
        <div class="mt-stack-md p-stack-md bg-surface-container-highest hud-border text-left w-full max-w-sm flex gap-3 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-primary-container"></div>
          <span class="material-symbols-outlined text-primary text-[28px] shrink-0" style="font-variation-settings: 'FILL' 1;">info</span>
          <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            {{ quest.description || 'Lakukan dengan form yang benar untuk menghindari cedera.' }}
          </p>
        </div>
      </div>

      <!-- Rep Counter HUD -->
      <div class="flex-1 flex flex-col items-center justify-center relative my-stack-lg cursor-pointer select-none" @click="incrementRep">
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <svg class="stroke-primary" height="300" viewBox="0 0 100 100" width="300">
            <polygon fill="none" points="50,5 95,25 95,75 50,95 5,75 5,25" stroke-width="0.5"></polygon>
          </svg>
        </div>
        
        <div class="relative z-10 text-center hover:scale-105 transition-transform active:scale-95 duration-100">
          <div class="font-display-lg text-[120px] md:text-[180px] leading-none text-primary glow-text font-bold tracking-tighter transition-all duration-100">
            {{ currentReps }}
          </div>
          <div class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface-variant mt-unit">/ {{ quest.target }} <span class="text-sm font-label-mono">{{ quest.unit?.toUpperCase() || 'X' }}</span></div>
        </div>

        <!-- Progress Bar -->
        <div class="w-full max-w-xs mt-stack-lg h-2 bg-surface-container-high hud-border relative overflow-hidden">
          <div class="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-container to-surface-tint glow-box transition-all duration-300" :style="{ width: `${progressPercent}%` }"></div>
        </div>
      </div>

      <!-- Real-time Stats Bento Grid -->
      <div class="grid grid-cols-2 gap-stack-md mb-stack-lg w-full">
        <div class="bg-surface-container-high hud-border p-stack-md flex flex-col relative overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-error-container"></div>
          <div class="flex items-center gap-unit text-on-surface-variant mb-unit">
            <span class="material-symbols-outlined text-[16px] text-error" style="font-variation-settings: 'FILL' 1;">favorite</span>
            <span class="font-label-mono text-label-mono uppercase">HEART RATE</span>
          </div>
          <div class="flex items-baseline gap-unit">
            <span class="font-headline-lg text-[24px] md:text-headline-lg text-error glow-text" :class="{'animate-pulse': isExercising}">{{ heartRate }}</span>
            <span class="font-label-mono text-label-mono text-on-surface-variant">BPM</span>
          </div>
        </div>
        
        <div class="bg-surface-container-high hud-border p-stack-md flex flex-col relative overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-primary-container"></div>
          <div class="flex items-center gap-unit text-on-surface-variant mb-unit">
            <span class="material-symbols-outlined text-[16px] text-primary" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
            <span class="font-label-mono text-label-mono uppercase">CALORIES</span>
          </div>
          <div class="flex items-baseline gap-unit">
            <span class="font-headline-lg text-[24px] md:text-headline-lg text-primary glow-text">{{ calories.toFixed(1) }}</span>
            <span class="font-label-mono text-label-mono text-on-surface-variant">KCAL</span>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <button 
        @click="completeExercise"
        class="w-full bg-primary-container text-on-primary-fixed font-headline-lg-mobile text-[20px] md:text-headline-lg-mobile uppercase py-stack-md glow-box active:scale-[0.98] transition-transform duration-100 flex items-center justify-center gap-unit relative overflow-hidden group">
        <span class="relative z-10 flex items-center gap-unit tracking-widest font-bold">
          <span class="material-symbols-outlined text-[28px]" style="font-variation-settings: 'FILL' 1;">done_all</span>
          SELESAI
        </span>
        <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      </button>
    </div>
    <div v-else class="flex items-center justify-center h-full text-on-surface-variant font-label-mono text-xl">
      QUEST NOT FOUND
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const { state, finishExercise, initLocalStorage } = useHunterState()

const questId = route.params.id
const quest = computed(() => state.value.quests.find(q => q.id === questId))

const currentReps = ref(0)
const heartRate = ref(75)
const calories = ref(0)
let hrInterval = null
const isExercising = ref(false)

onMounted(() => {
  initLocalStorage()
  if (quest.value) {
    currentReps.value = quest.value.current
  }
  
  hrInterval = setInterval(() => {
    if (isExercising.value && heartRate.value < 145) {
      heartRate.value += Math.floor(Math.random() * 5)
    } else if (!isExercising.value && heartRate.value > 75) {
      heartRate.value -= Math.floor(Math.random() * 3)
    } else if (isExercising.value) {
        heartRate.value += Math.floor(Math.random() * 6) - 3 // Fluctuate around peak
    }
    
    if(isExercising.value) {
        calories.value += 0.2
    }
  }, 1000)
})

onUnmounted(() => {
  if (hrInterval) clearInterval(hrInterval)
})

let exerciseTimeout = null
const incrementRep = () => {
  if (!quest.value) return
  if (currentReps.value < quest.value.target) {
    currentReps.value++
    isExercising.value = true
    
    if (exerciseTimeout) clearTimeout(exerciseTimeout)
    exerciseTimeout = setTimeout(() => {
      isExercising.value = false
    }, 2000)
  }
}

const progressPercent = computed(() => {
  if (!quest.value) return 0
  return (currentReps.value / quest.value.target) * 100
})

const completeExercise = () => {
  finishExercise(questId, currentReps.value)
  router.push('/quests')
}
</script>
