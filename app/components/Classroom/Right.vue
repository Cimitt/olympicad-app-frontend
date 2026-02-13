<script setup lang="ts">
import { CheckCircle2, PlayCircle, FileText } from 'lucide-vue-next'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const sections = [
  {
    title: "Section 1: Framework",
    duration: "0 / 3 | 10min",
    items: [
      { id: 1, title: "Everything You Need To Know About This Course", time: "3min", completed: true, type: 'video' },
      { id: 2, title: "The 5000 Year Old 'Secret'", time: "4min", completed: false, type: 'video' },
      { id: 3, title: "The Time Management Trap", time: "3min", completed: false, type: 'video' },
    ]
  },
  {
    title: "Section 2: 7 Specific Steps To Becoming More Productive",
    duration: "0 / 7 | 45min",
    items: [
      { id: 4, title: "Step 1: Clarity", time: "5min", completed: false, type: 'video' },
      { id: 5, title: "Step 2: Planning", time: "8min", completed: false, type: 'video' },
    ]
  },
  {
    title: "Section 3: Next Steps",
    duration: "0 / 2 | 10min",
    items: []
  }
]
</script>

<template>
  <div class="h-full border-l border-gray-200 bg-white flex flex-col">
    <div class="p-4 border-b font-semibold text-lg flex justify-between items-center">
      <span>Bab</span>
    </div>
    
    <div class="flex-1 overflow-y-auto">
      <Accordion type="single" class="w-full" collapsible default-value="section-0">
        <AccordionItem v-for="(section, index) in sections" :key="index" :value="`section-${index}`" class="border-b">
          <AccordionTrigger class="px-4 py-3 hover:no-underline hover:bg-gray-50 bg-gray-50/50">
            <div class="text-left">
              <div class="font-bold text-sm text-gray-900">{{ section.title }}</div>
              <div class="text-xs text-gray-500 font-normal mt-1">{{ section.duration }}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent class="p-0">
            <ul>
              <li v-for="item in section.items" :key="item.id" 
                  class="flex items-start gap-3 p-3 hover:bg-gray-100 cursor-pointer group"
                  :class="{'bg-blue-50': item.id === 1}"> <div class="mt-1">
                </div>
                
                <div class="flex-1">
                  <p class="text-sm group-hover:text-blue-700" :class="item.id === 1 ? 'text-blue-700 font-medium' : 'text-gray-700'">
                    {{ item.id }}. {{ item.title }}
                  </p>
                </div>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
</template>