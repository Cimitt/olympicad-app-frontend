<template>
  <section class="bg-linear-to-b from-indigo-50 to-white py-24 px-6" id="how">
    <div class="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-center gap-12">

      <!-- img -->
      <div
        class="w-full md:w-1/2 flex justify-center"
        data-aos="fade-right"
      >
        <NuxtImg
          src="https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Siswa Belajar"
          class="rounded-3xl shadow-2xl object-cover w-full max-w-md"
        />
      </div>

      <!-- langkah-langkah -->
      <div class="w-full md:w-1/2 space-y-8">

        <div class="text-center md:text-left">
          <h2
            class="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-4"
            data-aos="fade-up"
          >
            Cara Menggunakan Platform Kami
          </h2>
          <p
            class="text-indigo-600 text-lg md:text-xl"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            Belajar di LMSmuhda sangat mudah! Ikuti 3 langkah sederhana untuk memulai perjalanan pendidikan masa depan.
          </p>
        </div>

        <!-- steps -->
        <div class="space-y-6">
          <!-- step 1 -->
          <div
            class="flex items-start gap-4"
            data-aos="fade-up"
          >
            <div class="shrink-0">
              <div class="w-14 h-14 flex items-center justify-center bg-indigo-600 text-white font-extrabold text-2xl rounded-full">
                1
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-indigo-800">Login</h3>
              <p class="text-indigo-500">
                Login menggunakan akun yang telah disediakan.
              </p>
            </div>
          </div>

          <!-- step 2 -->
          <div
            class="flex items-start gap-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div class="shrink-0">
              <div class="w-14 h-14 flex items-center justify-center bg-indigo-600 text-white font-extrabold text-2xl rounded-full">
                2
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-indigo-800">Pilih Kelas</h3>
              <p class="text-indigo-500">
                Pilih kelas atau materi yang ingin dipelajari sesuai kebutuhanmu.
              </p>
            </div>
          </div>

          <!-- step 3 -->
          <div
            class="flex items-start gap-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div class="shrink-0">
              <div class="w-14 h-14 flex items-center justify-center bg-indigo-600 text-white font-extrabold text-2xl rounded-full">
                3
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-indigo-800">Mulai Belajar</h3>
              <p class="text-indigo-500">
                Akses materi, kerjakan latihan, dan pantau progres belajarmu secara realtime.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>