<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  IconUserCircle,
  IconLogout,
} from '@tabler/icons-vue'

interface User {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
  profile_picture?: string
  role?: 'student' | 'teacher' | 'admin'
  grade?: number
}


defineProps<{
  user: User
}>()

const { logout } = useAuth()
const router = useRouter()

// Detect mobile screen size
const isMobile = ref(false)

const updateMobileStatus = () => {
  isMobile.value = window.innerWidth <= 768 // Adjust the threshold as per your requirement
}

onMounted(() => {
  updateMobileStatus() // Initial check
  window.addEventListener('resize', updateMobileStatus) // Listen for window resizing
})

const handleLogout = () => {
  logout()
  router.push('/login')
}

const goToProfile = () => {
  router.push('/profile') // Arahkan pengguna ke halaman profil
}
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar class="h-8 w-8 rounded-lg grayscale">
              <!-- Use fallback if user is null or missing -->
              <AvatarImage :src="user?.profile_picture || '/default-avatar.png'" :alt="user?.first_name || 'Guest'" />
              <AvatarFallback class="rounded-lg">
                {{ user?.first_name ? user.last_name.charAt(0).toUpperCase() : 'U' }} 
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{{ user?.first_name || 'Guest' }}</span>
              <span class="text-muted-foreground truncate text-xs">
                {{ user?.email || 'No email provided' }}
              </span>
            </div>
            <IconDotsVertical class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-(--reka-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'"
          :side-offset="4"
          align="end"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage :src="user?.profile_picture || 'U'" />
                <AvatarFallback class="rounded-lg">
                  {{ user?.first_name ? user.first_name.charAt(0).toUpperCase() : 'U' }}
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-medium">{{ user?.first_name || 'User' }}</span>
                <span class="text-muted-foreground truncate text-xs">
                  {{ user?.email || 'No email provided' }}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem @click="goToProfile">
              <IconUserCircle />
              Profile
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="handleLogout">
            <IconLogout />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>

