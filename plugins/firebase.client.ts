import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  
  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId
  }

  // Only initialize if we have the config (to prevent crashes if .env is missing)
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== 'YOUR_API_KEY') {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const db = getFirestore(app)

    return {
      provide: {
        auth,
        db
      }
    }
  }
})
