<template>
  <header class="fixed top-0 w-full z-50 border-b border-outline-variant bg-surface-container-low/80 backdrop-blur-md shadow-[0_0_15px_rgba(0,210,255,0.2)]">
    <div class="flex justify-between items-center px-margin py-stack-md w-full max-w-[1200px] mx-auto">
      <div class="flex items-center gap-stack-sm">
        <div class="w-10 h-10 rounded-full border border-primary-container overflow-hidden hud-glow bg-surface-container-high flex items-center justify-center">
          <span class="material-symbols-outlined text-primary-container">person</span>
        </div>
        <span class="font-headline-lg-mobile text-headline-lg-mobile uppercase tracking-tighter text-primary">HUNTER STATUS</span>
      </div>
      
      <!-- Desktop Navigation -->
      <nav class="hidden md:flex gap-8">
        <NuxtLink to="/" class="font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors duration-300" exact-active-class="text-primary border-b-2 border-primary-container pb-1 text-glow">STATUS</NuxtLink>
        <NuxtLink to="/quests" class="font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors duration-300" active-class="text-primary border-b-2 border-primary-container pb-1 text-glow">QUESTS</NuxtLink>
        <NuxtLink to="/skills" class="font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors duration-300" active-class="text-primary border-b-2 border-primary-container pb-1 text-glow">SKILLS</NuxtLink>
        <NuxtLink to="/rank" class="font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors duration-300" active-class="text-primary border-b-2 border-primary-container pb-1 text-glow">RANK</NuxtLink>
      </nav>

      <div class="hidden md:flex font-label-mono text-label-mono text-primary tracking-widest items-center gap-4">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-error animate-pulse"></span>
          SISTEM ONLINE
        </div>
        <button @click="handleLogout" class="flex items-center justify-center p-2 rounded hover:bg-error/10 hover:text-error transition-colors duration-300 text-on-surface-variant group" title="Logout">
          <span class="material-symbols-outlined text-[18px] group-hover:text-error transition-colors">logout</span>
        </button>
      </div>
      
      <div class="md:hidden flex items-center gap-2">
        <button @click="handleLogout" class="scale-95 transition-all duration-300 hover:text-error text-on-surface-variant p-1">
          <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 0;">logout</span>
        </button>
        <button class="scale-95 transition-all duration-300 hover:text-primary text-on-surface-variant p-1">
          <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 0;">settings</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { signOut } from 'firebase/auth'

const router = useRouter()
const { $auth } = useNuxtApp()

const handleLogout = async () => {
  if ($auth) {
    try {
      await signOut($auth)
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }
}
</script>
