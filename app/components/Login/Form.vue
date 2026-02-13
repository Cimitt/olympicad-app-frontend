<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)
const { login, getCurrentUser } = useAuth()

const handleLogin = async (e: Event) => {
  e.preventDefault()
  loading.value = true
  errorMessage.value = ''

  const { error } = await login({
    username: username.value,
    password: password.value
  })

  if (error.value) {
    errorMessage.value = "Username atau password salah"
    loading.value = false
    return
  }

   const { data: userData } = await getCurrentUser()

  if (!userData.value) {
    errorMessage.value = "Gagal mengambil data user"
    loading.value = false
    return
  }

  switch (userData.value.role) {
    case 'teacher':
      return navigateTo('/guru')
    case 'student':
      return navigateTo('/siswa')
  }

  loading.value = false
}
</script>

<template>
  <form 
  :class="cn('flex flex-col gap-6')"
  @submit.prevent="handleLogin"
>
  <FieldGroup>
    <div class="flex flex-col items-center gap-1 text-center">
      <h1 class="text-2xl font-bold">
        Masuk ke akun Anda
      </h1>
      <p class="text-muted-foreground text-sm text-balance">
        masukkan username dan kata sandi Anda untuk melanjutkan
      </p>
    </div>

    <Field>
      <FieldLabel for="username">
        Username
      </FieldLabel>
      <Input
        id="username"
        v-model="username"
        type="text"
        placeholder="username"
        required
      />
    </Field>

    <Field>
      <FieldLabel for="password">
        Password
      </FieldLabel>
      <Input
        id="password"
        v-model="password"
        type="password"
        required
      />
    </Field>

    <p v-if="errorMessage" class="text-sm text-red-500">
      {{ errorMessage }}
    </p>

    <Field>
      <Button type="submit" :disabled="loading">
        {{ loading ? 'Memproses...' : 'Masuk' }}
      </Button>
    </Field>
  </FieldGroup>
</form>

</template>
