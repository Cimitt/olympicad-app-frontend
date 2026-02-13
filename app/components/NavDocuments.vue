<script setup lang="ts">
import type { Component } from "vue"

import {
  IconDots,
  IconFolder,
  IconShare3,
  IconTrash,
} from "@tabler/icons-vue"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

interface Document {
  name: string
  url: string
  icon?: Component
}

defineProps<{
  items: Document[]
}>()

const { isMobile } = useSidebar()
</script>

<template>
  <SidebarGroup>
    <SidebarGroupContent class="flex flex-col gap-2">
      <SidebarMenu>
        <SidebarMenuItem v-for="item in items" :key="item.name">
          <NuxtLink :to="item.url" class="flex items-center gap-2">
            <SidebarMenuButton :tooltip="item.name">
              <component :is="item.icon" v-if="item.icon" class="w-5 h-5" />
              <span>{{ item.name }}</span>
            </SidebarMenuButton>
          </NuxtLink>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>

