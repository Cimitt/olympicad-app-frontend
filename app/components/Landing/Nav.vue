<template>
  <nav 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6',
      isScrolled ? 'py-3 bg-white/80 backdrop-blur-lg shadow-sm' : 'py-6 bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300">
          <NuxtImg src="/smk.png" class="w-7 h-7" alt="Logo" />
        </div>
        <span class="font-bold text-xl tracking-tight text-slate-900">
          LMS<span class="text-indigo-600">MUHDA</span>
        </span>
      </NuxtLink>

      <div class="hidden md:flex items-center gap-8">
        <NuxtLink 
          v-for="item in navLinks" 
          :key="item.path" 
          :to="item.path"
          class="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors relative group"
        >
          {{ item.name }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
        </NuxtLink>
      </div>

      <div class="hidden md:flex">
        <NuxtLink to="/login">
          <Button class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-indigo-100 hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all duration-300">
            Masuk ke Platform
          </Button>
        </NuxtLink>
      </div>

      <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden text-slate-900 p-2">
        <svg v-if="!isMobileMenuOpen" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
        </svg>
        <svg v-else class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isMobileMenuOpen" class="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-5 shadow-2xl md:hidden">
        <NuxtLink 
          v-for="item in navLinks" 
          :key="item.path" 
          :to="item.path"
          @click="isMobileMenuOpen = false"
          class="text-base font-semibold text-slate-700 hover:text-indigo-600"
        >
          {{ item.name }}
        </NuxtLink>
        <hr class="border-slate-100" />
        <NuxtLink to="/login" @click="isMobileMenuOpen = false">
          <Button class="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold">
            Masuk ke Platform
          </Button>
        </NuxtLink>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Button from '../ui/button/Button.vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Beranda', path: '#home' },
  { name: 'Tentnag', path: '#about' },
  { name: 'Bagaimana', path: '#how' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>