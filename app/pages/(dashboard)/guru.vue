<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Users, 
  FileText, 
  Clock,
  ArrowRight,
  GraduationCap
} from 'lucide-vue-next'

const { getClassrooms } = useClassroom()
const { getCurrentUser } = useAuth()

const classrooms = ref<any[]>([])
const loading = ref(true)
const user = ref<any>(null)

onMounted(async () => {
  await loadData()
})

const loadData = async () => {
  loading.value = true
  
  // Load user data
  const { data: userData } = await getCurrentUser()
  if (userData.value) {
    user.value = userData.value
  }
  
  // Load classrooms
  const { data: classroomsData } = await getClassrooms()
  if (classroomsData.value) {
    classrooms.value = classroomsData.value
  }
  
  loading.value = false
}

// Statistics computed
const totalStudents = computed(() => {
  return classrooms.value.reduce((sum, classroom) => sum + (classroom.student_count || 0), 0)
})

const totalMaterials = computed(() => {
  return classrooms.value.reduce((sum, classroom) => sum + (classroom.material_count || 0), 0)
})

const activeClasses = computed(() => {
  return classrooms.value.filter(c => c.is_active).length
})

const goToClassroom = (classroomId: string) => {
  navigateTo(`/teacher/classrooms/${classroomId}`)
}
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
        <!-- Welcome Section -->
        <section 
          class="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-lg border border-blue-100 flex justify-between items-center w-full min-w-0 text-white"
        >
          <div class="space-y-2">
            <h2 class="text-2xl font-bold tracking-tight">
              Selamat Datang Kembali, <span class="text-blue-100">{{ user?.first_name || 'Teacher' }}!</span>
            </h2>
            <p class="text-blue-50 mt-1">
              Mulai Pembelajaran sekarang!
            </p>
          </div>
          <div class="hidden md:flex w-32 h-32 items-center justify-center bg-white/20 rounded-full backdrop-blur-sm">
            <GraduationCap class="w-16 h-16 text-white" />
          </div>
        </section>

        <!-- Statistics Cards -->
        <section class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Total Kelas</CardTitle>
              <BookOpen class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ classrooms.length }}</div>
              <p class="text-xs text-muted-foreground">
                {{ activeClasses }} kelas aktif
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Total Siswa</CardTitle>
              <Users class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ totalStudents }}</div>
              <p class="text-xs text-muted-foreground">
                Dari semua kelas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Total Materi</CardTitle>
              <FileText class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ totalMaterials }}</div>
              <p class="text-xs text-muted-foreground">
                Materi tersedia
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Aktivitas</CardTitle>
              <Clock class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ activeClasses }}</div>
              <p class="text-xs text-muted-foreground">
                Kelas aktif hari ini
              </p>
            </CardContent>
          </Card>
        </section>

        <!-- Classrooms List -->
        <section class="bg-white rounded-xl border shadow-sm">
          <div class="p-6 border-b">
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-lg font-semibold">Daftar Kelas Anda</h3>
                <p class="text-sm text-muted-foreground mt-1">Klik untuk melihat detail dan mengelola kelas</p>
              </div>
              <Button @click="navigateTo('/teacher/classrooms')" variant="outline">
                Lihat Semua
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="p-6">
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card v-for="i in 6" :key="i" class="animate-pulse">
                <CardContent class="p-6">
                  <div class="h-32 bg-muted rounded"></div>
                </CardContent>
              </Card>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="classrooms.length === 0" class="p-12 text-center">
            <BookOpen class="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 class="text-lg font-semibold mb-2">Belum Ada Kelas</h3>
            <p class="text-muted-foreground mb-4">Mulai dengan membuat kelas pertama Anda</p>
            <Button @click="navigateTo('/teacher/classrooms')">
              Buat Kelas Baru
            </Button>
          </div>

          <!-- Classrooms Grid -->
          <div v-else class="p-6">
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card 
                v-for="classroom in classrooms" 
                :key="classroom.id"
                class="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-500"
                @click="goToClassroom(classroom.id)"
              >
                <CardHeader>
                  <div class="flex justify-between items-start mb-2">
                    <Badge :variant="classroom.is_active ? 'default' : 'secondary'">
                      {{ classroom.is_active ? 'Aktif' : 'Nonaktif' }}
                    </Badge>
                    <Badge variant="outline">
                      Grade {{ classroom.grade }}
                    </Badge>
                  </div>
                  <CardTitle class="text-xl line-clamp-1">{{ classroom.name }}</CardTitle>
                  <CardDescription class="line-clamp-2">
                    {{ classroom.description || 'Tidak ada deskripsi' }}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div class="space-y-2">
                    <div class="flex items-center justify-between text-sm">
                      <div class="flex items-center text-muted-foreground">
                        <Users class="mr-2 h-4 w-4" />
                        <span>Siswa</span>
                      </div>
                      <span class="font-semibold">{{ classroom.student_count || 0 }}</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <div class="flex items-center text-muted-foreground">
                        <FileText class="mr-2 h-4 w-4" />
                        <span>Materi</span>
                      </div>
                      <span class="font-semibold">{{ classroom.material_count || 0 }}</span>
                    </div>
                  </div>
                  
                  <div class="mt-4 pt-4 border-t">
                    <Button variant="ghost" size="sm" class="w-full group">
                      Kelola Kelas
                      <ArrowRight class="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <!-- Quick Actions -->
        <section class="grid gap-4 md:grid-cols-3">
          <Card class="hover:shadow-md transition-shadow cursor-pointer" @click="navigateTo('/teacher/materials')">
            <CardHeader>
              <CardTitle class="flex items-center text-lg">
                <FileText class="mr-2 h-5 w-5 text-blue-600" />
                Materi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">Kelola dan upload materi pembelajaran</p>
            </CardContent>
          </Card>

          <Card class="hover:shadow-md transition-shadow cursor-pointer" @click="navigateTo('/teacher/quiz')">
            <CardHeader>
              <CardTitle class="flex items-center text-lg">
                <BookOpen class="mr-2 h-5 w-5 text-green-600" />
                Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">Buat dan kelola quiz untuk siswa</p>
            </CardContent>
          </Card>

          <Card class="hover:shadow-md transition-shadow cursor-pointer" @click="navigateTo('/teacher/assignments')">
            <CardHeader>
              <CardTitle class="flex items-center text-lg">
                <Clock class="mr-2 h-5 w-5 text-orange-600" />
                Tugas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">Monitor dan nilai tugas siswa</p>
            </CardContent>
          </Card>
        </section>
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>