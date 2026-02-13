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
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  BookOpen, 
  FileText, 
  CheckCircle2,
  Clock,
  Award,
  TrendingUp,
  Calendar,
  GraduationCap,
  AlertCircle,
  PlayCircle,
  FileCheck,
  MessageSquare,
  ArrowRight
} from 'lucide-vue-next'

const { getCurrentUser } = useAuth()
const { getClassrooms } = useClassroom()
const { getMaterials } = useMaterial()
const { getAssignments, getSubmissions } = useAssignment()
const { getQuizzes, getAttempts } = useQuiz()

const user = ref<any>(null)
const enrolledClasses = ref<any[]>([])
const materials = ref<any[]>([])
const assignments = ref<any[]>([])
const submissions = ref<any[]>([])
const quizzes = ref<any[]>([])
const attempts = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  await loadDashboardData()
})

const loadDashboardData = async () => {
  loading.value = true
  
  // Load user data
  const { data: userData } = await getCurrentUser()
  if (userData.value) {
    user.value = userData.value
  }
  
  // Load enrolled classrooms
  const { data: classroomsData } = await getClassrooms()
  if (classroomsData.value) {
    enrolledClasses.value = classroomsData.value
  }
  
  // Load materials
  const { data: materialsData } = await getMaterials()
  if (materialsData.value) {
    materials.value = materialsData.value.slice(0, 5) // Latest 5
  }
  
  // Load assignments
  const { data: assignmentsData } = await getAssignments()
  if (assignmentsData.value) {
    assignments.value = assignmentsData.value
  }
  
  // Load submissions
  const { data: submissionsData } = await getSubmissions()
  if (submissionsData.value) {
    submissions.value = submissionsData.value
  }
  
  // Load quizzes
  const { data: quizzesData } = await getQuizzes()
  if (quizzesData.value) {
    quizzes.value = quizzesData.value
  }
  
  // Load quiz attempts
  const { data: attemptsData } = await getAttempts()
  if (attemptsData.value) {
    attempts.value = attemptsData.value
  }
  
  loading.value = false
}

// Computed statistics
const totalClasses = computed(() => enrolledClasses.value.length)

const completedAssignments = computed(() => submissions.value.length)

const pendingAssignments = computed(() => {
  return assignments.value.length - submissions.value.length
})

const averageScore = computed(() => {
  const completedAttempts = attempts.value.filter(a => a.is_completed && a.score)
  if (completedAttempts.length === 0) return 0
  const total = completedAttempts.reduce((sum, a) => sum + (a.score || 0), 0)
  return Math.round(total / completedAttempts.length)
})

const upcomingAssignments = computed(() => {
  return assignments.value
    .filter(a => {
      const isSubmitted = submissions.value.some(s => s.assignment === a.id)
      return !isSubmitted && new Date(a.due_date) > new Date()
    })
    .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())
    .slice(0, 3)
})

const recentMaterials = computed(() => {
  return materials.value.slice(0, 4)
})

const completionRate = computed(() => {
  if (assignments.value.length === 0) return 0
  return Math.round((completedAssignments.value / assignments.value.length) * 100)
})

const goToClassroom = (classroomId: string) => {
  navigateTo(`/student/classrooms/${classroomId}`)
}

const goToMaterial = (materialId: number) => {
  navigateTo(`/student/materials/${materialId}`)
}

const goToAssignment = (assignmentId: number) => {
  navigateTo(`/student/assignments/${assignmentId}`)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { 
    day: 'numeric', 
    month: 'short',
    year: 'numeric'
  })
}

const getDaysUntilDue = (dueDate: string) => {
  const now = new Date()
  const due = new Date(dueDate)
  const diff = due.getTime() - now.getTime()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  return days
}

const getUrgencyColor = (daysLeft: number) => {
  if (daysLeft <= 1) return 'text-red-600'
  if (daysLeft <= 3) return 'text-orange-600'
  return 'text-muted-foreground'
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
              Selamat Datang Kembali, <span class="text-blue-100">{{ user?.first_name || 'Student' }}!</span>
            </h2>
            <p class="text-blue-50 mt-1">
              Mulai Pembelajaran sekarang!
            </p>
            <div class="flex items-center gap-2 mt-2">
              <Badge variant="secondary" class="bg-white/20 text-white border-0">
                Grade {{ user?.grade || '-' }}
              </Badge>
            </div>
          </div>
          <div class="hidden md:flex w-32 h-32 items-center justify-center bg-white/20 rounded-full backdrop-blur-sm">
            <GraduationCap class="w-16 h-16 text-white" />
          </div>
        </section>

        <!-- Statistics Cards -->
        <section class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Kelas Saya</CardTitle>
              <BookOpen class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ totalClasses }}</div>
              <p class="text-xs text-muted-foreground">
                Kelas terdaftar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Tugas Selesai</CardTitle>
              <CheckCircle2 class="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ completedAssignments }}</div>
              <p class="text-xs text-muted-foreground">
                Dari {{ assignments.length }} tugas
              </p>
              <Progress :value="completionRate" class="mt-2 h-1" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Tugas Pending</CardTitle>
              <Clock class="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ pendingAssignments }}</div>
              <p class="text-xs text-muted-foreground">
                Belum dikumpulkan
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Rata-rata Nilai</CardTitle>
              <Award class="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ averageScore }}%</div>
              <p class="text-xs text-muted-foreground">
                <TrendingUp class="inline h-3 w-3 mr-1" />
                Dari quiz yang diselesaikan
              </p>
            </CardContent>
          </Card>
        </section>

        <!-- My Classes -->
        <section class="bg-white rounded-xl border shadow-sm">
          <div class="p-6 border-b">
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-lg font-semibold">Kelas Saya</h3>
                <p class="text-sm text-muted-foreground mt-1">Kelas yang sedang kamu ikuti</p>
              </div>
              <Button @click="navigateTo('/student/classrooms')" variant="outline" size="sm">
                Lihat Semua
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="p-6">
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card v-for="i in 3" :key="i" class="animate-pulse">
                <CardContent class="p-6">
                  <div class="h-32 bg-muted rounded"></div>
                </CardContent>
              </Card>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="enrolledClasses.length === 0" class="p-12 text-center">
            <BookOpen class="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 class="text-lg font-semibold mb-2">Belum Ada Kelas</h3>
            <p class="text-muted-foreground">Hubungi guru untuk mendaftar ke kelas</p>
          </div>

          <!-- Classes Grid -->
          <div v-else class="p-6">
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card 
                v-for="classroom in enrolledClasses" 
                :key="classroom.id"
                class="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-500"
                @click="goToClassroom(classroom.id)"
              >
                <CardHeader>
                  <div class="flex justify-between items-start mb-2">
                    <Badge variant="outline">Grade {{ classroom.grade }}</Badge>
                    <Badge :variant="classroom.is_active ? 'default' : 'secondary'">
                      {{ classroom.is_active ? 'Aktif' : 'Nonaktif' }}
                    </Badge>
                  </div>
                  <CardTitle class="text-lg line-clamp-1">{{ classroom.name }}</CardTitle>
                  <CardDescription class="line-clamp-2">
                    {{ classroom.description || 'Tidak ada deskripsi' }}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div class="space-y-2 text-sm">
                    <div class="flex items-center justify-between">
                      <span class="text-muted-foreground">Materi</span>
                      <span class="font-semibold">{{ classroom.material_count || 0 }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-muted-foreground">Siswa</span>
                      <span class="font-semibold">{{ classroom.student_count || 0 }}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" class="w-full group">
                    Buka Kelas
                    <ArrowRight class="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <!-- Upcoming Assignments & Recent Materials -->
        <div class="grid gap-6 lg:grid-cols-2">
          <!-- Upcoming Assignments -->
          <Card>
            <CardHeader>
              <div class="flex justify-between items-center">
                <div>
                  <CardTitle>Tugas Mendatang</CardTitle>
                  <CardDescription>Tugas yang harus segera dikerjakan</CardDescription>
                </div>
                <Button @click="navigateTo('/student/assignments')" variant="ghost" size="sm">
                  Lihat Semua
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div v-if="upcomingAssignments.length === 0" class="text-center py-8">
                <CheckCircle2 class="mx-auto h-10 w-10 text-green-500 mb-2" />
                <p class="text-sm text-muted-foreground">Semua tugas sudah selesai!</p>
              </div>
              <div v-else class="space-y-4">
                <div 
                  v-for="assignment in upcomingAssignments" 
                  :key="assignment.id"
                  class="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                  @click="goToAssignment(assignment.id)"
                >
                  <div class="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileCheck class="h-5 w-5 text-blue-600" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-sm line-clamp-1">{{ assignment.title }}</h4>
                    <p class="text-xs text-muted-foreground line-clamp-1">{{ assignment.classroom_name }}</p>
                    <div class="flex items-center gap-2 mt-2">
                      <Calendar class="h-3 w-3" :class="getUrgencyColor(getDaysUntilDue(assignment.due_date))" />
                      <span class="text-xs" :class="getUrgencyColor(getDaysUntilDue(assignment.due_date))">
                        {{ getDaysUntilDue(assignment.due_date) > 0 ? `${getDaysUntilDue(assignment.due_date)} hari lagi` : 'Hari ini' }}
                      </span>
                    </div>
                  </div>
                  <Badge v-if="getDaysUntilDue(assignment.due_date) <= 1" variant="destructive" class="text-xs">
                    Urgent
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Recent Materials -->
          <Card>
            <CardHeader>
              <div class="flex justify-between items-center">
                <div>
                  <CardTitle>Materi Terbaru</CardTitle>
                  <CardDescription>Materi pembelajaran yang baru ditambahkan</CardDescription>
                </div>
                <Button @click="navigateTo('/student/materials')" variant="ghost" size="sm">
                  Lihat Semua
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div v-if="recentMaterials.length === 0" class="text-center py-8">
                <FileText class="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                <p class="text-sm text-muted-foreground">Belum ada materi tersedia</p>
              </div>
              <div v-else class="space-y-4">
                <div 
                  v-for="material in recentMaterials" 
                  :key="material.id"
                  class="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                  @click="goToMaterial(material.id)"
                >
                  <div class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    :class="material.material_type === 'video' ? 'bg-red-100' : 'bg-green-100'"
                  >
                    <PlayCircle v-if="material.material_type === 'video'" class="h-5 w-5 text-red-600" />
                    <FileText v-else class="h-5 w-5 text-green-600" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-sm line-clamp-1">{{ material.title }}</h4>
                    <p class="text-xs text-muted-foreground line-clamp-1">{{ material.classroom_name }}</p>
                    <div class="flex items-center gap-2 mt-2">
                      <Badge variant="outline" class="text-xs">
                        {{ material.material_type === 'video' ? 'Video' : 'PDF' }}
                      </Badge>
                      <span class="text-xs text-muted-foreground">
                        {{ material.question_count || 0 }} soal
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Quick Actions -->
        <section class="grid gap-4 md:grid-cols-4">
          <Card class="hover:shadow-md transition-shadow cursor-pointer" @click="navigateTo('/student/materials')">
            <CardHeader>
              <CardTitle class="flex items-center text-base">
                <FileText class="mr-2 h-5 w-5 text-blue-600" />
                Materi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">Akses materi pembelajaran</p>
            </CardContent>
          </Card>

          <Card class="hover:shadow-md transition-shadow cursor-pointer" @click="navigateTo('/student/quiz')">
            <CardHeader>
              <CardTitle class="flex items-center text-base">
                <BookOpen class="mr-2 h-5 w-5 text-green-600" />
                Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">Kerjakan quiz</p>
            </CardContent>
          </Card>

          <Card class="hover:shadow-md transition-shadow cursor-pointer" @click="navigateTo('/student/assignments')">
            <CardHeader>
              <CardTitle class="flex items-center text-base">
                <FileCheck class="mr-2 h-5 w-5 text-orange-600" />
                Tugas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">Lihat dan kumpulkan tugas</p>
            </CardContent>
          </Card>

          <Card class="hover:shadow-md transition-shadow cursor-pointer" @click="navigateTo('/student/discussions')">
            <CardHeader>
              <CardTitle class="flex items-center text-base">
                <MessageSquare class="mr-2 h-5 w-5 text-purple-600" />
                Diskusi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">Forum diskusi kelas</p>
            </CardContent>
          </Card>
        </section>
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>