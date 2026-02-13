<template>
  <section class="relative bg-linear-to-b from-indigo-50 via-white to-slate-50 py-20 lg:py-28 overflow-hidden" id="about">
    <!-- decorative element -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 -left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div class="absolute top-40 -right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-6 sm:px-10">
      
      <!-- header -->
      <div class="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">

        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
          Kenapa 
          <span class="bg-linear-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Pendidikan Digital
          </span>
          <br class="hidden sm:block" />
          Itu Penting?
        </h2>
        
        <p class="text-slate-600 text-base md:text-lg leading-relaxed">
          Pendidikan tradisional punya banyak hambatan — kami hadir dengan solusi modern, fleksibel, dan digital-first untuk pembelajaran yang lebih efektif.
        </p>
      </div>

      <!-- card 1 -->
      <div class="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
        
        <!-- akses materi -->
        <div
          class="group bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          data-aos="fade-up"
          data-aos-delay="0"
        >
          <!-- overlay hover -->
          <div class="absolute inset-0 bg-linear-to-br from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div class="relative z-10">

            <div class="w-14 h-14 flex items-center justify-center bg-linear-to-br from-indigo-500 to-indigo-600 rounded-xl mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <Icon name="mdi:book-open-page-variant" class="w-7 h-7 text-white" />
            </div>

            <h3 class="font-bold text-xl mb-3 text-slate-900 group-hover:text-indigo-900 transition-colors">
              Akses Materi Terpusat
            </h3>
            
            <p class="text-slate-600 mb-4 leading-relaxed">
              Semua materi digital tersimpan rapi dan bisa diakses kapan saja, di mana saja dengan internet.
            </p>

            <!-- stats -->
            <div class="flex items-center gap-2 text-sm font-semibold text-indigo-600 mb-4">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span>24/7 Akses Materi</span>
            </div>
          </div>
        </div>

        <!-- card 2 -->
        <div
          class="group bg-gradient-to-br from-indigo-600 to-blue-600 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
          data-aos="fade-up"
          data-aos-delay="100"
        >

          <div class="absolute top-4 right-4 bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
            POPULER
          </div>

          <!-- circle -->
          <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
          
          <div class="relative z-10">
            <div class="w-14 h-14 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <Icon name="mdi:brain" class="w-7 h-7 text-white" />
            </div>

            <h3 class="font-bold text-xl mb-3 text-white">
              Pembelajaran Cerdas
            </h3>
            
            <p class="text-indigo-100 mb-4 leading-relaxed">
              Sistem adaptif yang menyesuaikan dengan kecepatan belajar setiap siswa secara personal.
            </p>

            <div class="flex items-center gap-2 text-sm font-semibold text-white mb-4">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span>3x Lebih Cepat</span>
            </div>
          </div>
        </div>

        <!-- card 3 -->
        <div
          class="group bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <!-- overlay hover -->
          <div class="absolute inset-0 bg-linear-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div class="relative z-10">

            <div class="w-14 h-14 flex items-center justify-center bg-linear-to-br from-blue-500 to-blue-600 rounded-xl mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <Icon name="mdi:chart-line" class="w-7 h-7 text-white" />
            </div>


            <h3 class="font-bold text-xl mb-3 text-slate-900 group-hover:text-blue-900 transition-colors">
              Monitoring & Evaluasi
            </h3>
            
            <p class="text-slate-600 mb-4 leading-relaxed">
              Dashboard real-time untuk memantau progres belajar dan performa siswa secara detail.
            </p>

            <div class="flex items-center gap-2 text-sm font-semibold text-blue-600 mb-4">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span>Real-time Updates</span>
            </div>
          </div>
        </div>

      </div>

      <div 
        class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-slate-200">
          
          <div class="text-center px-4">
            <div class="text-3xl md:text-4xl font-bold text-indigo-600 mb-1">1000+</div>
            <div class="text-sm text-slate-600">Siswa Aktif</div>
          </div>

          <div class="text-center px-4">
            <div class="text-3xl md:text-4xl font-bold text-indigo-600 mb-1">50+</div>
            <div class="text-sm text-slate-600">Guru Berpengalaman</div>
          </div>

          <div class="text-center px-4">
            <div class="text-3xl md:text-4xl font-bold text-indigo-600 mb-1">15+</div>
            <div class="text-sm text-slate-600">Mata Pelajaran</div>
          </div>

          <div class="text-center px-4">
            <div class="text-3xl md:text-4xl font-bold text-indigo-600 mb-1">92%</div>
            <div class="text-sm text-slate-600">Tingkat Kepuasan</div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
@keyframes blob {
  0%, 100% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.05);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.95);
  }
}

.animate-blob {
  animation: blob 8s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}
</style>