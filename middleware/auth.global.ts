export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) return

  const { $auth } = useNuxtApp()
  if (!$auth) return // Firebase not initialized yet
  
  const user = await new Promise((resolve) => {
    const unsubscribe = $auth.onAuthStateChanged((user) => {
      unsubscribe()
      resolve(user)
    })
  })

  if (!user && to.path !== '/login') {
    return navigateTo('/login')
  }

  if (user && to.path === '/login') {
    return navigateTo('/')
  }
})
