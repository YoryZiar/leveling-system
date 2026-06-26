<template>
  <div class="px-margin py-stack-md max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter">
    <!-- Stats Radar Chart Section -->
    <section class="md:col-span-5 flex flex-col gap-stack-md">
      <div class="bg-[#1a1a1a] hud-border p-6 relative">
        <div class="absolute top-0 right-0 bg-surface-container-highest px-3 py-1 border-b border-l border-outline-variant font-label-mono text-label-mono text-primary-container">
          LV. {{ state.profile.level }}
        </div>
        <h2 class="font-headline-lg-mobile text-headline-lg-mobile text-primary-container uppercase mb-6 tracking-tighter">Statistik Fisik</h2>
        
        <div class="relative w-full aspect-square max-w-[300px] mx-auto">
          <canvas ref="radarCanvas"></canvas>
        </div>
        
        <div class="mt-8 flex flex-col gap-4">
          <div v-for="(val, key) in state.stats" :key="key" class="flex justify-between items-center border-b border-outline-variant pb-2">
            <span class="font-label-mono text-label-mono text-on-surface-variant uppercase">{{ getStatLabel(key) }}</span>
            <span class="font-label-mono text-label-mono text-primary-container">{{ Number(val).toFixed(1) }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills List Section -->
    <section class="md:col-span-7 flex flex-col gap-stack-md">
      <div class="flex items-center justify-between mb-2">
        <h2 class="font-headline-lg-mobile text-headline-lg-mobile text-primary-container uppercase tracking-tighter">Skill Aktif & Pasif</h2>
        <span class="font-label-mono text-[10px] text-on-surface-variant border border-outline-variant px-2 py-1">{{ state.skills?.filter(s => s.isUnlocked).length || 0 }} TERBUKA</span>
      </div>

      <!-- Skill List -->
      <div v-for="skill in state.skills" :key="skill.id" 
           class="bg-[#1a1a1a] hud-border p-5 transition-colors duration-300 relative group overflow-hidden"
           :class="{'hover:border-primary-container/50': skill.isUnlocked, 'opacity-50 border-outline-variant/30': !skill.isUnlocked}">
        
        <div v-if="skill.isUnlocked" class="absolute inset-0 bg-gradient-to-r from-primary-container/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        <div class="relative z-10 flex gap-4">
          <div class="w-16 h-16 shrink-0 border flex items-center justify-center"
               :class="{'border-primary-container bg-surface-container-low shadow-[0_0_10px_rgba(0,210,255,0.2)]': skill.type === 'Aktif' && skill.isUnlocked,
                        'border-outline-variant bg-surface-container-lowest': skill.type === 'Pasif' || !skill.isUnlocked}">
            <span class="material-symbols-outlined text-[32px]"
                  :class="{'text-primary-container': skill.type === 'Aktif' && skill.isUnlocked,
                           'text-on-surface-variant': skill.type === 'Pasif' && skill.isUnlocked,
                           'text-outline-variant': !skill.isUnlocked}"
                  style="font-variation-settings: 'FILL' 1;">{{ skill.icon }}</span>
          </div>
          
          <div class="flex-1">
            <div class="flex justify-between items-start mb-1">
              <h3 class="font-headline-lg-mobile text-lg text-on-surface uppercase tracking-tight"
                  :class="{'text-outline-variant': !skill.isUnlocked}">{{ skill.name }}</h3>
              <span v-if="skill.isUnlocked" class="font-label-mono text-[10px] px-1"
                    :class="{'text-primary-container border border-primary-container/30 bg-primary-container/10': skill.type === 'Aktif',
                             'text-on-surface-variant border border-outline-variant bg-surface-container-highest': skill.type === 'Pasif'}">LV. {{ skill.level }}</span>
            </div>
            
            <p v-if="skill.isUnlocked" class="font-label-mono text-[10px] mb-2"
               :class="{'text-primary-container/70': skill.type === 'Aktif',
                        'text-on-surface-variant/70': skill.type === 'Pasif'}">
              {{ skill.type.toUpperCase() }} <span v-if="skill.manaCost">| MANA: {{ skill.manaCost }}</span>
            </p>
            <p v-else class="font-label-mono text-[10px] text-outline-variant mb-1">PERSYARATAN BELUM TERPENUHI</p>
            
            <p class="text-sm leading-relaxed"
               :class="{'text-on-surface-variant': skill.isUnlocked, 'text-outline-variant/70': !skill.isUnlocked}">{{ skill.desc }}</p>
            
            <div v-if="skill.isUnlocked" class="mt-4 w-full h-1 bg-surface-container-highest">
              <div class="h-full"
                   :class="{'bg-primary-container shadow-[0_0_8px_rgba(0,210,255,0.8)]': skill.type === 'Aktif',
                            'bg-on-surface-variant': skill.type === 'Pasif'}"
                   :style="{ width: `${(skill.exp / skill.maxExp) * 100}%` }"></div>
            </div>
            <p v-if="skill.isUnlocked" class="font-label-mono text-[10px] text-right mt-1 text-on-surface-variant">EXP: {{ skill.exp }}/{{ skill.maxExp }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Chart, RadialLinearScale, RadarController, PointElement, LineElement, Filler, Tooltip } from 'chart.js'

Chart.register(RadialLinearScale, RadarController, PointElement, LineElement, Filler, Tooltip)

const { state, initLocalStorage } = useHunterState()
const radarCanvas = ref(null)
let chartInstance = null

const getStatLabel = (key) => {
  const labels = {
    str: 'STR (Kekuatan)',
    agi: 'AGI (Kelincahan)',
    end: 'VIT (Vitalitas)',
    int: 'INT (Kecerdasan)',
    per: 'PER (Persepsi)'
  }
  return labels[key] || key
}

onMounted(() => {
  initLocalStorage()
  initChart()
})

const initChart = () => {
  if (chartInstance) chartInstance.destroy()
  if (!radarCanvas.value) return

  Chart.defaults.color = '#859399'
  Chart.defaults.font.family = "'JetBrains Mono', monospace"

  chartInstance = new Chart(radarCanvas.value, {
    type: 'radar',
    data: {
      labels: ['STR', 'AGI', 'VIT', 'INT', 'PER'],
      datasets: [{
        label: 'Stats',
        data: [state.value.stats.str, state.value.stats.agi, state.value.stats.end, state.value.stats.int, state.value.stats.per],
        backgroundColor: 'rgba(0, 210, 255, 0.2)',
        borderColor: '#00d2ff',
        pointBackgroundColor: '#051424',
        pointBorderColor: '#00d2ff',
        pointHoverBackgroundColor: '#00d2ff',
        pointHoverBorderColor: '#fff',
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          angleLines: { color: '#3c494e' },
          grid: { color: '#3c494e', circular: true },
          pointLabels: {
            color: '#a5e7ff',
            font: { size: 12, weight: 'bold' }
          },
          ticks: {
            display: false,
            min: 0,
            max: Math.max(...Object.values(state.value.stats)) + 20
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1c2b3c',
          titleColor: '#00d2ff',
          bodyColor: '#d4e4fa',
          borderColor: '#3c494e',
          borderWidth: 1,
          cornerRadius: 0,
          displayColors: false
        }
      }
    }
  })
}

watch(() => state.value.stats, () => {
  if (chartInstance) {
    chartInstance.data.datasets[0].data = [state.value.stats.str, state.value.stats.agi, state.value.stats.end, state.value.stats.int, state.value.stats.per]
    chartInstance.options.scales.r.ticks.max = Math.max(...Object.values(state.value.stats)) + 20
    chartInstance.update()
  }
}, { deep: true })
</script>
