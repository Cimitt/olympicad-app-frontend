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

const { getCurrentUser } = useAuth()

const user = ref<any>(null)

onMounted(async () => {
  const { data, error } = await getCurrentUser()
  if (data.value) {
    user.value = data.value // Menyimpan data user setelah berhasil di-fetch
  } else {
    // Handle error jika data tidak berhasil diambil
    console.error(error.value)
  }
})

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Kelas Saya",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Laporan",
      url: "#",
      icon: IconChartBar,
    },
  ],
  Interaktif: [
    {
      name: "Quiz",
      url: "#",
      icon: IconFolder,
    },
    {
      name: "Laporan",
      url: "#",
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
            <a href="#">
              <NuxtImg src="/smk.png" class="size-6" />
              <span class="text-base font-semibold">LMSmuhda.</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <NuxtLink to="">
        <NavMain :items="data.navMain" />
        <NavDocuments :items="data.Interaktif" />
      </NuxtLink>
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="user" />
    </SidebarFooter>
  </Sidebar>
</template>
