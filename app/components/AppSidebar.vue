<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import NavDocuments from '@/components/NavDocuments.vue'
import NavMain from '@/components/NavMain.vue'
import NavUser from '@/components/NavUser.vue'
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconListDetails,
  IconReport,
} from "@tabler/icons-vue"

// Ambil data user dari auth
const { getCurrentUser } = useAuth()
const user = ref<any>(null)

onMounted(async () => {
  const { data, error } = await getCurrentUser()
  if (data.value) {
    user.value = data.value 
  } else {
    console.error(error.value)
  }
})

// Data navigasi
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/guru",
      icon: IconDashboard,
    },
    {
      title: "Kelas Saya",
      url: "/classroom",
      icon: IconListDetails,
    },
    {
      title: "Quiz",
      url: "/classroom",
      icon: IconListDetails,
    },
    {
      title: "Kelas Saya",
      url: "/teacher/quiz",
      icon: IconFolder,
    },
  ],
  Interaktif: [
    {
      name: "Quiz",
      url: "/teacher/quiz",
      icon: IconFolder,
    },
    {
      name: "Laporan",
      url: "/reports", 
      icon: IconReport,
    },
  ],
}
</script>

<template>
  <Sidebar collapsible="offcanvas">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton as-child class="data-[slot=sidebar-menu-button]:p-1.5!">
            <NuxtLink to="#">
              <NuxtImg src="/smk.png" class="size-6" />
              <span class="text-base font-semibold">LMSmuhda.</span>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    
    <!-- Sidebar Content -->
    <SidebarContent>
      <!-- Main Navigation -->
      <NavMain :items="data.navMain" />
    </SidebarContent>
    
    <!-- Sidebar Footer -->
    <SidebarFooter>
      <NavUser :user="user" />
    </SidebarFooter>
  </Sidebar>
</template>
