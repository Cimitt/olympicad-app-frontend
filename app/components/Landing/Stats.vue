<template>
  <section class="relative bg-linear-to-b from-white via-slate-50 to-white py-16 lg:py-24 overflow-hidden">
    
    <!-- Decorative Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div class="absolute bottom-20 left-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-6 sm:px-10">
      
      <!-- Header Section -->
      <div class="text-center max-w-3xl mx-auto mb-12 lg:mb-16" data-aos="fade-up">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          Statistik & Pengguna
          <span class="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            LMS Muhda
          </span>
        </h2>
        
        <p class="text-base md:text-lg text-slate-600 leading-relaxed">
          Wawasan real-time tentang performa dan penggunaan platform pembelajaran digital kami
        </p>
      </div>

      <!-- Main Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" data-aos="fade-up" data-aos-delay="100">
        
        <!-- Card 1 - Progress Circle (Featured) -->
        <div class="lg:row-span-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
          <!-- Decorative Circle -->
          <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
          <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>
          
          <div class="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 mb-4">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
                <p class="text-sm font-semibold text-white/90">Penggunaan Platform</p>
              </div>
            </div>

            <!-- Progress Circle -->
            <div class="flex justify-center my-8">
              <div class="relative w-40 h-40">
                <!-- Background Circle -->
                <svg class="w-40 h-40 transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.2)" stroke-width="12" fill="none"/>
                  <circle cx="80" cy="80" r="70" stroke="white" stroke-width="12" fill="none"
                    stroke-dasharray="440" stroke-dashoffset="110" stroke-linecap="round"
                    class="transition-all duration-1000 ease-out"/>
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <span class="text-4xl font-bold">75%</span>
                    <p class="text-xs text-white/80 mt-1">Aktif</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-4xl font-bold mb-2">2.5K</h3>
              <p class="text-sm text-white/90">
                Materi pembelajaran digital tersedia
              </p>
              <div class="flex items-center gap-1 mt-3 text-sm">
                <svg class="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
                </svg>
                <span class="text-green-300 font-semibold">+12%</span>
                <span class="text-white/70">dari bulan lalu</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2 - Sessions -->
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
          <div class="flex items-start justify-between mb-4">
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
            </div>
            <span class="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
              </svg>
              +18%
            </span>
          </div>
          <h3 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">4,875</h3>
          <p class="text-sm text-slate-600">Sesi pembelajaran aktif bulan ini</p>
        </div>

        <!-- Card 3 - Students -->
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
          <div class="flex items-start justify-between mb-4">
            <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
            </div>
            <span class="flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
              </svg>
              +24%
            </span>
          </div>
          <h3 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">1,000+</h3>
          <p class="text-sm text-slate-600">Siswa terdaftar aktif</p>
        </div>

        <!-- Card 4 - Teachers -->
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
          <div class="mb-4">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
              </div>
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-3">Guru & Fasilitator</h3>
          </div>
          <div class="flex items-center -space-x-3">
            <NuxtImg class="w-10 h-10 rounded-full border-2 border-white shadow-md" src="https://i.pravatar.cc/100?img=32" alt="Teacher" />
            <NuxtImg class="w-10 h-10 rounded-full border-2 border-white shadow-md" src="https://i.pravatar.cc/100?img=45" alt="Teacher" />
            <NuxtImg class="w-10 h-10 rounded-full border-2 border-white shadow-md" src="https://i.pravatar.cc/100?img=56" alt="Teacher" />
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-md">
              +120
            </div>
          </div>
          <p class="text-xs text-slate-500 mt-3">123 guru aktif mengajar</p>
        </div>

        <!-- Card 5 - Featured Content -->
        <div class="md:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-lg font-bold text-slate-900">Fitur Unggulan Platform</h3>
            <span class="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Populer</span>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="flex flex-col items-center text-center p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors">
              <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-2">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                </svg>
              </div>
              <span class="text-xs font-semibold text-slate-900">Video</span>
            </div>

            <div class="flex flex-col items-center text-center p-3 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-colors">
              <div class="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mb-2">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
                </svg>
              </div>
              <span class="text-xs font-semibold text-slate-900">Kuis</span>
            </div>

            <div class="flex flex-col items-center text-center p-3 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors">
              <div class="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mb-2">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
                </svg>
              </div>
              <span class="text-xs font-semibold text-slate-900">Forum</span>
            </div>

            <div class="flex flex-col items-center text-center p-3 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 transition-colors">
              <div class="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center mb-2">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                </svg>
              </div>
              <span class="text-xs font-semibold text-slate-900">E-Learning</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Featured Teacher Section -->
      <div class="mb-12" data-aos="fade-up" data-aos-delay="200">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-slate-900">Guru SmuhdaKlara</h3>
          <NuxtLink to="#testimoni" class="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            Lihat Semua
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
        </div>

        <div class="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 lg:p-12 shadow-xl border border-blue-100 overflow-hidden">
          <!-- Decorative Elements -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div class="absolute bottom-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          
          <div class="relative z-10 flex flex-col md:flex-row items-center gap-8 lg:gap-12">
            <!-- Profile Image -->
            <div class="relative flex-shrink-0">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full blur-xl opacity-50"></div>
              <img
                src="/stats.jpeg"
                alt="Afen Afrianto - Guru Penggunaan LMS"
                class="relative w-40 h-40 lg:w-56 lg:h-56 rounded-full object-cover shadow-2xl border-4 border-white"
              />
              <!-- Badge -->
              <div class="absolute -bottom-2 -right-2 bg-gradient-to-br from-yellow-400 to-orange-400 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                ⭐ Guru Terbaik
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 text-center md:text-left space-y-4">
              <div>
                <h4 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Afen Afrianto</h4>
                <p class="text-slate-600 text-base lg:text-lg font-medium">
                  Guru SMK Muhammadiyah 2 Klaten Utara
                </p>
              </div>

              <div class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm lg:text-base font-semibold shadow-lg">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                Menggunakan LMS untuk pembelajaran kreatif & interaktif
              </div>

              <!-- Stats -->
              <div class="flex flex-wrap gap-6 justify-center md:justify-start pt-2">
                <div class="text-center md:text-left">
                  <div class="text-2xl font-bold text-slate-900">150+</div>
                  <div class="text-sm text-slate-600">Materi Dibuat</div>
                </div>
                <div class="text-center md:text-left">
                  <div class="text-2xl font-bold text-slate-900">500+</div>
                  <div class="text-sm text-slate-600">Siswa Diajar</div>
                </div>
                <div class="text-center md:text-left">
                  <div class="text-2xl font-bold text-slate-900">4.9/5</div>
                  <div class="text-sm text-slate-600">Rating Guru</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom CTA Section -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl overflow-hidden shadow-2xl" data-aos="fade-up" data-aos-delay="200">
  <div class="grid lg:grid-cols-2 gap-8 items-center">
    
    <!-- Left: Image -->
    <div class="relative h-64 lg:h-full min-h-[300px] order-2 lg:order-1">
      <img 
        src="/cta.JPG" 
        alt="Platform pembelajaran digital"
        class="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <!-- Optional: Gradient Overlay untuk blend dengan background -->
      <div class="absolute inset-0 bg-gradient-to-r from-transparent to-blue-600/20"></div>
    </div>
    
    <!-- Right: Content -->
    <div class="p-8 lg:p-12 text-white order-1 lg:order-2">
      <h3 class="text-2xl lg:text-3xl font-bold mb-4">
        Pendidikan Digital untuk Masa Depan
      </h3>
      <p class="text-base lg:text-lg text-blue-50 mb-8">
        Membangun ekosistem pembelajaran online yang inklusif, mudah, dan menarik untuk semua kalangan.
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <Button 
          class="bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 px-8 py-3.5 font-semibold shadow-lg hover:shadow-xl transition-all">
          Login
        </Button>
        <Button 
          class="bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 px-8 py-3.5 font-semibold shadow-lg hover:shadow-xl transition-all">
          Lihat Selengkapnya
        </Button>
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
/* Animations are handled by Tailwind and AOS */
</style>