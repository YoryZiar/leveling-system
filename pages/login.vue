<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-margin relative overflow-hidden">
    <!-- Grid Background -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#122131_1px,transparent_1px),linear-gradient(to_bottom,#122131_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

    <div class="glass-panel w-full max-w-md p-stack-lg flex flex-col items-center justify-center relative z-10 text-center hud-border before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-primary-container/5 before:to-transparent before:pointer-events-none">
      
      <div class="w-20 h-20 hexagon bg-surface-container-high border border-primary-container flex items-center justify-center mb-stack-md hud-glow">
        <span class="material-symbols-outlined text-[40px] text-primary-container">admin_panel_settings</span>
      </div>

      <h1 class="font-display-lg text-display-lg text-on-surface uppercase glow-text tracking-tighter mb-unit">SYSTEM LOGIN</h1>
      <p class="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest mb-stack-lg">Identifikasi Player Diperlukan</p>

      <button 
        @click="signInWithGoogle" 
        :disabled="isLoading"
        class="w-full bg-surface-container border border-primary-container py-4 px-6 flex items-center justify-center gap-4 hover:bg-primary-container/10 transition-colors duration-300 group disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
      >
        <div class="absolute left-0 top-0 bottom-0 w-1 bg-primary-container scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"></div>
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="w-6 h-6 grayscale group-hover:grayscale-0 transition-all duration-300" />
        <span class="font-headline-lg-mobile text-lg text-primary-container uppercase tracking-widest">Login via Google</span>
        <span v-if="isLoading" class="material-symbols-outlined animate-spin text-primary-container absolute right-4">refresh</span>
      </button>

      <p v-if="errorMsg" class="mt-4 font-label-mono text-xs text-error border border-error/30 bg-error-container/20 p-2 w-full">{{ errorMsg }}</p>
      
      <div class="mt-stack-lg w-full h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent opacity-50"></div>
      <p class="mt-4 font-label-mono text-[10px] text-on-surface-variant">SISTEM HANYA MENERIMA PLAYER YANG TERDAFTAR.</p>
    </div>
  </div>
</template>

<script setup>
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

definePageMeta({
  layout: false // Hide top and bottom nav bars on login page
})

const { $auth } = useNuxtApp()
const router = useRouter()
const isLoading = ref(false)
const errorMsg = ref('')

const signInWithGoogle = async () => {
  if (!$auth) {
    errorMsg.value = "Sistem Firebase belum siap. Cek konfigurasi .env."
    return
  }
  
  isLoading.value = true
  errorMsg.value = ''
  
  try {
    const provider = new GoogleAuthProvider()
    await signInWithPopup($auth, provider)
    router.push('/')
  } catch (error) {
    console.error('Login error:', error)
    errorMsg.value = error.message || 'Gagal terhubung ke sistem.'
  } finally {
    isLoading.value = false
  }
}
</script>
