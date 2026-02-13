export default defineNuxtRouteMiddleware(async () => {
  const { isAuthenticated, getCurrentUser } = useAuth()

  if (!isAuthenticated.value) return

  const { data } = await getCurrentUser()

  if (!data.value) return

  switch (data.value.role) {
    case 'teacher':
      return navigateTo('/guru')
    case 'student':
      return navigateTo('/siswa')
  }
})
