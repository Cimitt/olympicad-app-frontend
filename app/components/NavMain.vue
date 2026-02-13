<script setup lang="ts">
import type { Component } from "vue"
import { IconCirclePlusFilled, IconMail } from "@tabler/icons-vue"

import { Button } from '@/components/ui/button'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

interface NavItem {
  title: string
  url: string
  icon?: Component
}

defineProps<{
  items: NavItem[]
}>()
</script>

<template>
  <SidebarGroup>
    <SidebarGroupContent class="flex flex-col gap-2">
      <SidebarMenu>
        <SidebarMenuItem v-for="item in items" :key="item.title">
          <NuxtLink :to="item.url" class="flex items-center gap-2">
            <SidebarMenuButton :tooltip="item.title">
              <component :is="item.icon" v-if="item.icon" class="w-5 h-5" />
              <span>{{ item.title }}</span>
            </SidebarMenuButton>
          </NuxtLink>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>

