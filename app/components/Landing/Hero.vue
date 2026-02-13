<template>
  <section class="relative w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden" id="home">
    
    <div class="pt-10 md:pt-15"></div>

    <div class="container mx-auto px-4 py-12 lg:py-16">
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        
        <!-- left content -->
        <div class="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">

          <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            <NuxtImg src="/smk.png" class="h-8 w-8" />
            SMK Muhammadiyah 2 Klaten Utara
          </div>

          <div class="space-y-4">
            <h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
              Platform Pembelajaran Digital
              <span class="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                untuk Guru & Siswa
              </span>
            </h1>
            <p class="text-base md:text-lg text-slate-700 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Akses materi pelajaran, kelola tugas, dan pantau perkembangan belajar dalam satu platform terintegrasi
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start text-sm">
            <div class="flex items-center gap-2 text-slate-700 justify-center lg:justify-start">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
              </div>
              <div class="text-left">
                <div class="font-bold text-slate-900">1000+</div>
                <div class="text-slate-600 text-xs">Siswa Aktif</div>
              </div>
            </div>
            
            <div class="flex items-center gap-2 text-slate-700 justify-center lg:justify-start">
              <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <div class="text-left">
                <div class="font-bold text-slate-900">5/5</div>
                <div class="text-slate-600 text-xs">Rating Pengguna</div>
              </div>
            </div>
          </div>

          <!-- features -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
            <div class="flex items-start gap-3 p-3 lg:p-4 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors shadow-sm">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="text-left">
                <div class="font-semibold text-slate-900 text-sm">Akses 24/7</div>
                <div class="text-xs text-slate-600 mt-1">Belajar kapan saja</div>
              </div>
            </div>

            <div class="flex items-start gap-3 p-3 lg:p-4 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors shadow-sm">
              <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="text-left">
                <div class="font-semibold text-slate-900 text-sm">Tugas Digital</div>
                <div class="text-xs text-slate-600 mt-1">Kumpul online</div>
              </div>
            </div>

            <div class="flex items-start gap-3 p-3 lg:p-4 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors shadow-sm">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
              </div>
              <div class="text-left">
                <div class="font-semibold text-slate-900 text-sm">Laporan Progres</div>
                <div class="text-xs text-slate-600 mt-1">Pantau nilai real-time</div>
              </div>
            </div>
          </div>

          <!-- cta buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button 
              size="lg" 
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 lg:px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
              </svg>
              Masuk ke Dashboard
            </Button>
            
            <NuxtLink to="#how">
            <Button 
              size="lg" 
              variant="outline" 
              class="border-2 border-slate-300 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 px-6 lg:px-8 py-3 text-base font-semibold transition-all duration-300"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Panduan Penggunaan
            </Button>
            </NuxtLink>
          </div>

          <!-- Trust Badge -->
          <div class="flex items-center justify-center lg:justify-start gap-2 pt-2">
            <svg class="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span class="text-sm font-medium text-slate-700">Platform Aman & Terakreditasi</span>
          </div>
        </div>

        <!-- right content -->
        <div class="relative order-1 lg:order-2 max-w-2xl mx-auto lg:max-w-none">
          <!-- Decorative -->
          <div class="absolute -top-4 -right-4 w-48 h-48 lg:w-72 lg:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob pointer-events-none"></div>
          <div class="absolute -bottom-4 -left-4 w-48 h-48 lg:w-72 lg:h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>
          
          <!-- image container -->
          <div class="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            <!-- Image -->
            <div class="aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 relative">
              <!-- chrome mockup -->
              <div class="absolute top-0 left-0 right-0 h-8 lg:h-10 bg-slate-200 border-b border-slate-300 flex items-center px-3 lg:px-4 gap-2">
                <div class="flex gap-1.5">
                  <div class="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-red-400"></div>
                  <div class="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-yellow-400"></div>
                  <div class="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-green-400"></div>
                </div>
                <div class="flex-1 mx-2 lg:mx-4 h-5 lg:h-6 bg-white rounded text-xs flex items-center px-2 lg:px-3 text-slate-500">
                  lms.smamuhda.sch.id
                </div>
              </div>

              <NuxtImg 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="LMS Muhda Dashboard Preview"
                class="w-full h-full object-cover object-top"
              />
            </div>
            
            <!-- floating  -->
            <div class="hidden md:flex absolute top-16 lg:top-20 right-3 lg:right-4 bg-white rounded-xl shadow-xl p-3 lg:p-4 animate-float border border-slate-200 backdrop-blur-sm">
              <div class="flex items-center gap-2 lg:gap-3">
                <div class="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 lg:w-7 lg:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <div class="text-xs text-slate-500 font-medium">Rata-rata Penyelesaian</div>
                  <div class="text-xl lg:text-2xl font-bold text-slate-900">92%</div>
                </div>
              </div>
            </div>

            <div class="hidden md:flex absolute bottom-16 lg:bottom-20 left-3 lg:left-4 bg-white rounded-xl shadow-xl p-3 lg:p-4 animate-float animation-delay-1000 border border-slate-200 backdrop-blur-sm">
              <div class="flex items-center gap-2 lg:gap-3">
                <div class="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 lg:w-7 lg:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                  </svg>
                </div>
                <div>
                  <div class="text-xs text-slate-500 font-medium">Total Mata Pelajaran</div>
                  <div class="text-xl lg:text-2xl font-bold text-slate-900">15+</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<style scoped>
@keyframes blob {
  0%, 100% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(20px, -30px) scale(1.03);
  }
  66% {
    transform: translate(-15px, 15px) scale(0.97);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

html {
  scroll-behavior: smooth;
}

.animate-blob {
  animation: blob 8s infinite ease-in-out;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.animation-delay-1000 {
  animation-delay: 1.5s;
}
</style>