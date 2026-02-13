<script setup lang="ts">
import { ref } from 'vue'
import { Share2, MoreVertical, Star, Trophy, Send } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// dummy data
const courseTitle = "Title"
const students = "402,806"

const comments = ref([
    {
        id: 1,
        user: "Budi Santoso",
        avatar: "https://github.com/shadcn.png",
        date: "2 hari yang lalu",
        text: "Materi penjelasannya sangat jelas, terutama di bagian implementasi script setup. Terima kasih!"
    },
    {
        id: 2,
        user: "Siti Aminah",
        avatar: "",
        date: "1 jam yang lalu",
        text: "Apakah ada source code untuk bagian styling scrollbar-nya?"
    }
])

const newComment = ref('')
</script>

<template>
    <div class="min-h-screen flex flex-col font-sans bg-white">

        <header class="bg-blue-500 text-white h-14 flex items-center px-4 justify-between shrink-0  top-0 z-50">
            <div class="flex items-center gap-4">
                <h1 class="text-sm font-medium truncate max-w-50 md:max-w-md text-gray-100">
                    {{ courseTitle }}
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

                <div class="bg-black w-full aspect-video flex items-center justify-center relative group cursor-pointer">
                    <ClassroomVideo src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
                </div>

                <div class="p-6 max-w-5xl mx-auto w-full">
                    <Tabs default-value="overview" class="w-full">
                        <TabsList class="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6">
                            <TabsTrigger value="overview"
                                class="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:shadow-none py-3 px-4 text-gray-600 font-bold">
                                Overview
                            </TabsTrigger>
                            <TabsTrigger value="comments"
                                class="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:shadow-none py-3 px-4 text-gray-600 font-bold">
                                Diskusi ({{ comments.length }})
                            </TabsTrigger>
                        </TabsList>

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
                                    <a href="#" class="text-blue-600 underline underline-offset-4 font-bold">Nama Guru</a>
                                </div>
                            </div>

                            <div class="bg-gray-50 p-4 border rounded-md">
                                <p class="text-sm text-gray-700">Deskripsi video pembelajaran ini mencakup dasar-dasar pengembangan aplikasi web menggunakan Vue 3.</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="comments" class="space-y-8 animate-in fade-in-50">
                            <div class="flex gap-4">
                                <Avatar class="w-10 h-10 border">
                                    <AvatarImage src="" />
                                    <AvatarFallback>ME</AvatarFallback>
                                </Avatar>
                                <div class="flex-1 space-y-3">
                                    <Textarea 
                                        v-model="newComment"
                                        placeholder="Tulis pertanyaan atau komentar..." 
                                        class="min-h-[100px] focus-visible:ring-blue-500"
                                    />
                                    <div class="flex justify-end">
                                        <Button :disabled="!newComment" class="bg-blue-600 hover:bg-blue-700 text-white">
                                            Kirim Komentar
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-6">
                                <div v-for="comment in comments" :key="comment.id" class="flex gap-4 border-b pb-6 last:border-0">
                                    <Avatar class="w-10 h-10 border">
                                        <AvatarImage :src="comment.avatar" />
                                        <AvatarFallback>{{ comment.user.charAt(0) }}</AvatarFallback>
                                    </Avatar>
                                    <div class="flex-1">
                                        <div class="flex items-center gap-2 mb-1">
                                            <span class="font-bold text-sm text-gray-900">{{ comment.user }}</span>
                                            <span class="text-xs text-gray-500">{{ comment.date }}</span>
                                        </div>
                                        <p class="text-sm text-gray-700 leading-relaxed">
                                            {{ comment.text }}
                                        </p>
                                        <div class="mt-3 flex items-center gap-4">
                                            <button class="text-xs font-semibold text-gray-500 hover:text-blue-600">Balas</button>
                                            <button class="text-xs font-semibold text-gray-500 hover:text-blue-600">Suka</button>
                                        </div>
                                    </div>
                                </div>
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