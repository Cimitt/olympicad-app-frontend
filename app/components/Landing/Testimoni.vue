<script setup>
const testimonials = [
  {
    name: 'Angga Chriswidiantoro',
    text: 'Platform ini memudahkan saya dalam mendistribusikan materi pelajaran. Interaksi dengan siswa menjadi lebih terstruktur meskipun dilakukan secara digital.',
    image: '/testi03.jpeg',
  },
  {
    name: 'Zahra Baiti',
    text: 'Fitur evaluasi otomatisnya sangat membantu menghemat waktu koreksi. Saya bisa fokus memberikan feedback yang lebih personal kepada siswa.',
    image: '/testi02.JPG',
  },
  {
    name: 'Hendry',
    text: 'Siswa jadi lebih antusias belajar karena antarmukanya mudah dipahami. Ini adalah lompatan besar bagi digitalisasi sekolah kami.',
    image: '/testi01.JPG',
  }
]
</script>

<template>
  <section id="testimonials" aria-label="What our teachers are saying" class="bg-slate-50 py-20 sm:py-32">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl md:text-center mb-16">
        <h2 class="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl" data-aos="fade-up">
          Testimoni Guru Smuhda
        </h2>
      </div>
      
      <div class="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
        <figure 
          v-for="(item, index) in testimonials" 
          :key="index"
          class="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10 flex flex-col justify-between"
          data-aos="fade-up"
          :data-aos-delay="item.delay"
        >
          <svg aria-hidden="true" width="105" height="78" class="absolute left-6 top-6 fill-slate-100/50">
            <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
          </svg>

          <blockquote class="relative">
            <p class="text-lg tracking-tight text-slate-900">"{{ item.text }}"</p>
          </blockquote>

          <figcaption class="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
            <div class="font-display text-base font-semibold text-slate-900">{{ item.name }}</div>
            <div class="overflow-hidden rounded-full bg-slate-50 border-2 border-white shadow-sm">
              <img :src="item.image" :alt="item.name" class="h-12 w-12 object-cover" />
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>