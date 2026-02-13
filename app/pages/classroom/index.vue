<script setup lang="ts">
import { Share2, MoreVertical, Star, Trophy } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// dummy data
const courseTitle = "Title"
const students = "402,806"
</script>

<template>
    <div class="min-h-screen flex flex-col font-sans">

        <header class="bg-blue-500 text-white h-14 flex items-center px-4 justify-between shrink-0 top-0">
            <div class="flex items-center gap-4">
                <div class="font-bold text-xl tracking-tight">LMSmuhda</div>
                <div class="h-6 w-[1px] bg-blue-600 mx-2 hidden md:block"></div>
                <h1 class="text-sm font-medium truncate max-w-[200px] md:max-w-md text-gray-100">
                    Title
                </h1>
            </div>

            <div class="flex items-center gap-2">
                <Button variant="ghost" size="icon" class="text-white hover:bg-white/10 h-8 w-8">
                    <MoreVertical class="w-4 h-4" />
                </Button>
            </div>
        </header>

        <main class="flex-1 flex flex-col lg:flex-row overflow-hidden">

            <div class="flex-1 flex flex-col overflow-y-auto h-full relative">

                <div
                    class="bg-black w-full aspect-video flex items-center justify-center relative group cursor-pointer">
                    <ClassroomVideo src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
                </div>

                <div class="p-6 max-w-5xl mx-auto w-full">
                    <Tabs default-value="overview" class="w-full">
                        <!-- <TabsList class="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6">
                            <TabsTrigger value="overview"
                                class="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:shadow-none py-3 px-4 text-gray-600 font-bold">
                                Overview
                            </TabsTrigger>
                            <TabsTrigger value="notes"
                                class="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:shadow-none py-3 px-4 text-gray-600 font-bold">
                                Notes
                            </TabsTrigger>
                            <TabsTrigger value="announcements"
                                class="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:shadow-none py-3 px-4 text-gray-600 font-bold">
                                Announcements
                            </TabsTrigger>
                            <TabsTrigger value="reviews"
                                class="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:shadow-none py-3 px-4 text-gray-600 font-bold">
                                Reviews
                            </TabsTrigger>
                        </TabsList> -->

                        <TabsContent value="overview" class="space-y-6 animate-in fade-in-50">
                            <div>
                                <h2 class="text-2xl font-bold mb-2 text-gray-900">{{ courseTitle }}</h2>
                                <div class="flex items-center gap-4 text-sm mt-2">
                                    <div class="flex items-center gap-1 text-yellow-600 font-bold">
                                        <div class="text-gray-600">{{ students }} Students</div>
                                    </div>
                                </div>
                            </div>

                            <div class="border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                                <div>
                                    <span class="font-bold block mb-1">Guru</span>
                                    <a href="#"
                                        class="text-purple-700 underline underline-offset-4 font-bold">Nama Guru</a>
                                </div>
                            </div>

                            <div class="bg-gray-50 p-4 border rounded-md">
                                <p class="text-sm text-gray-700">Deskripsi</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            <div class="lg:w-[22rem] shrink-0 border-t lg:border-t-0 lg:border-l bg-white">
                <ClassroomRight />
            </div>

        </main>
    </div>
</template>

<style>
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: #d4d4d8;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #a1a1aa;
}
</style>