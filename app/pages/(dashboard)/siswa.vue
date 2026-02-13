<script lang="ts">
export const iframeHeight = "800px"
export const description = "Dashboard guru dengan statistik kelas, manajemen data siswa, dan grafik interaktif."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import ChartAreaInteractive from '@/components/ChartAreaInteractive.vue'
import DataTable from '@/components/DataTable.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { Button } from '@/components/ui/button'

import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'

// modal state
const showModal = ref(false)

const kirimData = () => {
  console.log("Data dikirim...")
  showModal.value = false
}

const data = [
  {
    id: 1,
    header: "Cover page",
    type: "Cover page",
    status: "In Process",
    target: "18",
    limit: "5",
    reviewer: "Eddie Lake",
  },
]
</script>

<template>
  <SidebarProvider :style="{
    '--sidebar-width': '280px',
    '--header-height': '64px',
  }">
    <AppSidebar variant="inset" />
    
    <SidebarInset>
      <SiteHeader />
      
      <main class="flex flex-1 flex-col gap-6 p-4 lg:p-6">
        <section 
          class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex justify-between items-center w-full min-w-0"
        >
          <div class="space-y-4">
            <div>
              <h2 class="text-2xl font-bold tracking-tight">Selamat Datang, Guru Pengajar!</h2>
              <p class="text-muted-foreground mt-1">
                Kelola kelas dan pantau perkembangan kurikulum Anda di sini.
              </p>
            </div>
            
            <div class="flex gap-3">
              <Button @click="showModal = true">
                + Buat Kelas Baru
              </Button>
              
              <Modal 
                v-model="showModal" 
                title="Tambah Kelas" 
                description="Isi detail informasi kelas baru Anda." 
                submitText="Simpan"
                @submit="kirimData"
              >
                </Modal>
            </div>
          </div>

          <div class="hidden md:flex w-32 h-32 items-center justify-center bg-gray-50 rounded-full">
             <span class="text-4xl"></span>
          </div>
        </section>

        <section class="grid gap-6">
          <div class="bg-white rounded-xl border shadow-sm p-4">
            <h3 class="text-lg font-medium mb-4 px-2">Statistik Aktivitas</h3>
            <ChartAreaInteractive />
          </div>
        </section>

        <section class="bg-white rounded-xl border shadow-sm">
          <div class="p-4 border-b">
            <h3 class="text-lg font-medium">Daftar Modul & Materi</h3>
          </div>
          <div class="p-0">
            <DataTable :data="data" />
          </div>
        </section>
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
