<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-youtube' 

const props = defineProps({
  src: { type: String, required: true },
  poster: { type: String, default: '' },
  options: { type: Object, default: () => ({}) }
})

const videoPlayer = ref<HTMLVideoElement | null>(null)
let player: any = null

// Fungsi untuk menentukan tipe source berdasarkan URL
const getSourceType = (url: string) => {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'video/youtube'
  }
  return 'video/mp4' // Default untuk file lokal/direct link
}

const initializePlayer = () => {
  if (videoPlayer.value) {
    const isYouTube = getSourceType(props.src) === 'video/youtube'

    player = videojs(videoPlayer.value, {
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true,
      poster: props.poster,
      // Jika YouTube, kita gunakan techOrder khusus
      techOrder: isYouTube ? ['youtube'] : ['html5'],
      sources: [{
        type: getSourceType(props.src),
        src: props.src
      }],
      youtube: { 
        iv_load_policy: 3, 
        modestbranding: 1, 
        rel: 0 
      },
      ...props.options
    })
  }
}

onMounted(() => {
  initializePlayer()
})

// Bersihkan player saat komponen dihancurkan
onUnmounted(() => {
  if (player) {
    player.dispose()
  }
})

// Watcher jika src berubah (misal ganti video di sidebar)
watch(() => props.src, (newSrc) => {
  if (player) {
    player.src({ type: getSourceType(newSrc), src: newSrc })
  }
})
</script>

<template>
  <div class="w-full h-full overflow-hidden bg-black">
    <video ref="videoPlayer" class="video-js vjs-big-play-centered vjs-theme-custom"></video>
  </div>
</template>

<style>
/* Style tetap sama dengan milikmu sebelumnya */
.video-js .vjs-play-progress, .video-js .vjs-volume-level { background-color: #a435f0; }
.video-js .vjs-big-play-button {
    background-color: rgba(0, 0, 0, 0.6);
    border: 2px solid white;
    border-radius: 50%;
    width: 80px; height: 80px;
    line-height: 76px; font-size: 40px;
}
.video-js:hover .vjs-big-play-button { background-color: white; color: black; }
</style>