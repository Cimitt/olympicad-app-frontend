<!-- pages/teacher/classrooms/[id].vue -->
<template>
  <div class="min-h-screen flex flex-col font-sans bg-white">
    <!-- Header -->
    <header class="bg-blue-500 text-white h-14 flex items-center px-4 justify-between shrink-0 top-0 z-50">
      <div class="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          class="text-white hover:bg-white/10 h-8 w-8"
          @click="$router.back()"
        >
          <ArrowLeft class="w-4 h-4" />
        </Button>
        <h1 class="text-sm font-medium truncate max-w-50 md:max-w-md text-gray-100">
          {{ loading ? 'Loading...' : classroom?.name }}
        </h1>
      </div>

      <div class="flex items-center gap-2">
        <Button 
          v-if="isTeacher"
          variant="ghost" 
          size="icon" 
          class="text-white hover:bg-white/10 h-8 w-8"
          @click="showEditDialog = true"
        >
          <Edit class="w-4 h-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" class="text-white hover:bg-white/10 h-8 w-8">
              <MoreVertical class="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem v-if="isTeacher" @click="showEditDialog = true">
              <Edit class="mr-2 h-4 w-4" />
              Edit Kelas
            </DropdownMenuItem>
            <DropdownMenuItem v-if="isTeacher" @click="manageStudents">
              <Users class="mr-2 h-4 w-4" />
              Kelola Siswa
            </DropdownMenuItem>
            <DropdownMenuItem @click="shareClassroom">
              <Share2 class="mr-2 h-4 w-4" />
              Bagikan
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="flex-1 flex items-center justify-center">
      <Loader2 class="h-8 w-8 animate-spin text-blue-600" />
    </div>

    <!-- Main Content -->
    <main v-else-if="classroom" class="flex-1 flex flex-col lg:flex-row overflow-hidden">
      <!-- Left Content -->
      <div class="flex-1 flex flex-col overflow-y-auto h-full relative">
        <!-- Classroom Banner -->
        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 w-full aspect-[21/9] flex items-center justify-center relative group">
          <div class="text-center text-white p-6">
            <h1 class="text-4xl font-bold mb-2">{{ classroom.name }}</h1>
            <p class="text-blue-100">Grade {{ classroom.grade }}</p>
          </div>
        </div>

        <!-- Tabs Content -->
        <div class="p-6 max-w-5xl mx-auto w-full">
          <Tabs v-model="activeTab" class="w-full">
            <TabsList class="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6">
              <TabsTrigger 
                value="overview"
                class="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:shadow-none py-3 px-4 text-gray-600 font-bold"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="materials"
                class="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:shadow-none py-3 px-4 text-gray-600 font-bold"
              >
                Materi ({{ materials.length }})
              </TabsTrigger>
              <TabsTrigger 
                value="discussions"
                class="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:shadow-none py-3 px-4 text-gray-600 font-bold"
              >
                Diskusi
              </TabsTrigger>
              <TabsTrigger 
                v-if="isTeacher"
                value="students"
                class="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:shadow-none py-3 px-4 text-gray-600 font-bold"
              >
                Siswa ({{ classroom.students?.length || 0 }})
              </TabsTrigger>
            </TabsList>

            <!-- Overview Tab -->
            <TabsContent value="overview" class="space-y-6 animate-in fade-in-50">
              <div>
                <h2 class="text-2xl font-bold mb-2 text-gray-900">{{ classroom.name }}</h2>
                <div class="flex items-center gap-4 text-sm mt-2">
                  <Badge :variant="classroom.is_active ? 'default' : 'secondary'">
                    {{ classroom.is_active ? 'Aktif' : 'Nonaktif' }}
                  </Badge>
                  <Badge variant="outline">Grade {{ classroom.grade }}</Badge>
                  <div class="flex items-center gap-1 text-gray-600">
                    <Users class="w-4 h-4" />
                    {{ classroom.student_count || 0 }} Siswa
                  </div>
                  <div class="flex items-center gap-1 text-gray-600">
                    <FileText class="w-4 h-4" />
                    {{ materials.length }} Materi
                  </div>
                </div>
              </div>

              <div class="border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <span class="font-bold block mb-1">Guru</span>
                  <div class="flex items-center gap-2">
                    <Avatar class="w-8 h-8">
                      <AvatarImage :src="classroom.teacher?.profile_picture" />
                      <AvatarFallback>{{ getInitials(classroom.teacher) }}</AvatarFallback>
                    </Avatar>
                    <span class="text-gray-900 font-medium">
                      {{ classroom.teacher?.first_name }} {{ classroom.teacher?.last_name }}
                    </span>
                  </div>
                </div>
                <div>
                  <span class="font-bold block mb-1">Dibuat</span>
                  <span class="text-gray-600">{{ formatDate(classroom.created_at) }}</span>
                </div>
                <div>
                  <span class="font-bold block mb-1">Terakhir Diupdate</span>
                  <span class="text-gray-600">{{ formatDate(classroom.updated_at) }}</span>
                </div>
              </div>

              <div class="bg-gray-50 p-4 border rounded-md">
                <h3 class="font-bold mb-2">Deskripsi Kelas</h3>
                <p class="text-sm text-gray-700">
                  {{ classroom.description || 'Tidak ada deskripsi' }}
                </p>
              </div>

              <!-- Quick Stats -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent class="p-4">
                    <div class="text-2xl font-bold text-blue-600">{{ materials.length }}</div>
                    <div class="text-xs text-muted-foreground">Total Materi</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent class="p-4">
                    <div class="text-2xl font-bold text-green-600">{{ assignments.length }}</div>
                    <div class="text-xs text-muted-foreground">Total Tugas</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent class="p-4">
                    <div class="text-2xl font-bold text-orange-600">{{ quizzes.length }}</div>
                    <div class="text-xs text-muted-foreground">Total Quiz</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent class="p-4">
                    <div class="text-2xl font-bold text-purple-600">{{ classroom.student_count || 0 }}</div>
                    <div class="text-xs text-muted-foreground">Total Siswa</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <!-- Materials Tab -->
            <TabsContent value="materials" class="space-y-4 animate-in fade-in-50">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">Daftar Materi</h3>
                <Button v-if="isTeacher" @click="createMaterial" size="sm">
                  <Plus class="w-4 h-4 mr-2" />
                  Tambah Materi
                </Button>
              </div>

              <div v-if="materialsLoading" class="space-y-4">
                <Card v-for="i in 3" :key="i" class="animate-pulse">
                  <CardContent class="p-4">
                    <div class="h-20 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              </div>

              <div v-else-if="materials.length === 0" class="text-center py-12">
                <FileText class="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p class="text-muted-foreground">Belum ada materi</p>
                <Button v-if="isTeacher" @click="createMaterial" class="mt-4">
                  <Plus class="w-4 h-4 mr-2" />
                  Tambah Materi Pertama
                </Button>
              </div>

              <div v-else class="space-y-3">
                <Card
                  v-for="material in materials"
                  :key="material.id"
                  class="hover:shadow-md transition-shadow cursor-pointer"
                  @click="goToMaterial(material.id)"
                >
                  <CardContent class="p-4">
                    <div class="flex items-start gap-4">
                      <div 
                        class="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                        :class="material.material_type === 'video' ? 'bg-red-100' : 'bg-green-100'"
                      >
                        <PlayCircle v-if="material.material_type === 'video'" class="h-6 w-6 text-red-600" />
                        <FileText v-else class="h-6 w-6 text-green-600" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <h4 class="font-semibold text-base line-clamp-1">{{ material.title }}</h4>
                        <p class="text-sm text-muted-foreground line-clamp-2">{{ material.description }}</p>
                        <div class="flex items-center gap-3 mt-2">
                          <Badge variant="outline" class="text-xs">
                            {{ material.material_type === 'video' ? 'Video' : 'PDF' }}
                          </Badge>
                          <span class="text-xs text-muted-foreground">
                            {{ material.question_count || 0 }} soal
                          </span>
                          <span class="text-xs text-muted-foreground">
                            {{ formatDate(material.created_at) }}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" @click.stop="goToMaterial(material.id)">
                        <ArrowRight class="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <!-- Discussions Tab -->
            <TabsContent value="discussions" class="space-y-6 animate-in fade-in-50">
              <!-- Material Selector -->
              <div v-if="materials.length > 0" class="mb-6">
                <Label class="text-sm font-medium mb-2 block">Pilih Materi untuk Diskusi:</Label>
                <Select v-model="selectedMaterialForComment">
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih materi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem 
                      v-for="material in materials" 
                      :key="material.id" 
                      :value="material.id.toString()"
                    >
                      {{ material.title }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <!-- No Material State -->
              <div v-if="materials.length === 0" class="text-center py-12">
                <FileText class="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p class="text-muted-foreground mb-4">Belum ada materi untuk berdiskusi</p>
                <Button v-if="isTeacher" @click="createMaterial">
                  <Plus class="w-4 h-4 mr-2" />
                  Tambah Materi
                </Button>
              </div>

              <!-- No Material Selected State -->
              <div v-else-if="!selectedMaterialForComment" class="text-center py-12">
                <MessageSquare class="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p class="text-muted-foreground">Pilih materi untuk melihat diskusi</p>
              </div>

              <!-- Discussion Content -->
              <template v-else>
                <!-- Comment Form -->
                <div class="flex gap-4">
                  <Avatar class="w-10 h-10 border">
                    <AvatarImage :src="user?.profile_picture" />
                    <AvatarFallback>{{ getInitials(user) }}</AvatarFallback>
                  </Avatar>
                  <div class="flex-1 space-y-3">
                    <Textarea 
                      v-model="newComment"
                      placeholder="Tulis pertanyaan atau komentar..." 
                      class="min-h-[100px] focus-visible:ring-blue-500"
                    />
                    <div class="flex justify-end">
                      <Button 
                        :disabled="!newComment.trim() || submittingComment" 
                        @click="submitComment"
                        class="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Loader2 v-if="submittingComment" class="mr-2 h-4 w-4 animate-spin" />
                        Kirim Komentar
                      </Button>
                    </div>
                  </div>
                </div>

                <!-- Comments Loading -->
                <div v-if="commentsLoading" class="space-y-6">
                  <div v-for="i in 3" :key="i" class="flex gap-4 animate-pulse">
                    <div class="w-10 h-10 bg-muted rounded-full"></div>
                    <div class="flex-1 space-y-2">
                      <div class="h-4 bg-muted rounded w-1/4"></div>
                      <div class="h-16 bg-muted rounded"></div>
                    </div>
                  </div>
                </div>

                <!-- No Comments -->
                <div v-else-if="comments.length === 0" class="text-center py-12">
                  <MessageSquare class="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p class="text-muted-foreground">Belum ada diskusi di materi ini</p>
                  <p class="text-sm text-muted-foreground mt-2">Jadilah yang pertama berkomentar!</p>
                </div>

                <!-- Comments List -->
                <div v-else class="space-y-6">
                  <div 
                    v-for="comment in comments" 
                    :key="comment.id" 
                    class="flex gap-4 border-b pb-6 last:border-0"
                  >
                    <Avatar class="w-10 h-10 border">
                      <AvatarImage :src="comment.user?.profile_picture" />
                      <AvatarFallback>{{ getInitials(comment.user) }}</AvatarFallback>
                    </Avatar>
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-1">
                        <span class="font-bold text-sm text-gray-900">
                          {{ comment.user?.first_name }} {{ comment.user?.last_name }}
                        </span>
                        <span class="text-xs text-gray-500">{{ formatRelativeTime(comment.created_at) }}</span>
                        <Badge v-if="comment.user?.role === 'teacher'" variant="secondary" class="text-xs">
                          Guru
                        </Badge>
                      </div>
                      <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {{ comment.content }}
                      </p>
                      <div class="mt-3 flex items-center gap-4">
                        <button class="text-xs font-semibold text-gray-500 hover:text-blue-600">
                          Balas
                        </button>
                        <button 
                          v-if="comment.user?.id === user?.id || isTeacher"
                          @click="deleteComment(comment.id)"
                          class="text-xs font-semibold text-red-500 hover:text-red-700"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </TabsContent>

            <!-- Students Tab (Teacher Only) -->
            <TabsContent v-if="isTeacher" value="students" class="space-y-4 animate-in fade-in-50">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">Daftar Siswa</h3>
                <Button @click="manageStudents" size="sm">
                  <UserPlus class="w-4 h-4 mr-2" />
                  Kelola Siswa
                </Button>
              </div>

              <div v-if="studentsLoading" class="space-y-3">
                <Card v-for="i in 5" :key="i" class="animate-pulse">
                  <CardContent class="p-4">
                    <div class="h-12 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              </div>

              <div v-else-if="!classroom.students || classroom.students.length === 0" class="text-center py-12">
                <Users class="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p class="text-muted-foreground mb-4">Belum ada siswa di kelas ini</p>
                <Button @click="manageStudents">
                  <UserPlus class="w-4 h-4 mr-2" />
                  Tambah Siswa
                </Button>
              </div>

              <div v-else class="space-y-2">
                <Card
                  v-for="student in classroom.students"
                  :key="student.id"
                  class="hover:shadow-sm transition-shadow"
                >
                  <CardContent class="p-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage :src="student.profile_picture" />
                          <AvatarFallback>{{ getInitials(student) }}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div class="font-semibold">
                            {{ student.first_name }} {{ student.last_name }}
                          </div>
                          <div class="text-sm text-muted-foreground">{{ student.email }}</div>
                        </div>
                      </div>
                      <Badge variant="outline">Grade {{ student.grade }}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="lg:w-[22rem] shrink-0 border-t lg:border-t-0 lg:border-l bg-white overflow-y-auto">
        <div class="p-6 space-y-6">
          <!-- Quick Actions -->
          <div class="space-y-2">
            <h3 class="font-semibold text-sm text-muted-foreground uppercase">Quick Actions</h3>
            <div class="space-y-2">
              <Button 
                v-if="isTeacher"
                variant="outline" 
                class="w-full justify-start" 
                @click="navigateTo(`/teacher/materials?classroom=${classroomId}`)"
              >
                <FileText class="mr-2 h-4 w-4" />
                Kelola Materi
              </Button>
              <Button 
                v-if="isTeacher"
                variant="outline" 
                class="w-full justify-start"
                @click="navigateTo(`/teacher/assignments?classroom=${classroomId}`)"
              >
                <FileCheck class="mr-2 h-4 w-4" />
                Kelola Tugas
              </Button>
              <Button 
                v-if="isTeacher"
                variant="outline" 
                class="w-full justify-start"
                @click="navigateTo(`/teacher/quiz?classroom=${classroomId}`)"
              >
                <BookOpen class="mr-2 h-4 w-4" />
                Kelola Quiz
              </Button>
              <Button 
                variant="outline" 
                class="w-full justify-start"
                @click="shareClassroom"
              >
                <Share2 class="mr-2 h-4 w-4" />
                Bagikan Kelas
              </Button>
            </div>
          </div>

          <!-- Class Info -->
          <div class="space-y-2">
            <h3 class="font-semibold text-sm text-muted-foreground uppercase">Informasi Kelas</h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-muted-foreground">Status</span>
                <Badge :variant="classroom.is_active ? 'default' : 'secondary'" class="text-xs">
                  {{ classroom.is_active ? 'Aktif' : 'Nonaktif' }}
                </Badge>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Grade</span>
                <span class="font-medium">{{ classroom.grade }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Total Siswa</span>
                <span class="font-medium">{{ classroom.student_count || 0 }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Total Materi</span>
                <span class="font-medium">{{ materials.length }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Error State -->
    <div v-else class="flex-1 flex flex-col items-center justify-center p-6">
      <AlertCircle class="h-12 w-12 text-red-600 mb-4" />
      <h2 class="text-xl font-semibold mb-2">Kelas Tidak Ditemukan</h2>
      <p class="text-muted-foreground mb-4">Kelas yang Anda cari tidak tersedia</p>
      <Button @click="$router.back()">
        Kembali
      </Button>
    </div>

    <!-- Edit Dialog -->
    <Dialog v-model:open="showEditDialog">
      <DialogContent class="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Kelas</DialogTitle>
        </DialogHeader>
        <form @submit.prevent="updateClassroom" class="space-y-4">
          <div class="space-y-2">
            <Label for="name">Nama Kelas</Label>
            <Input id="name" v-model="editForm.name" required />
          </div>
          <div class="space-y-2">
            <Label for="description">Deskripsi</Label>
            <Textarea id="description" v-model="editForm.description" rows="3" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label>Grade</Label>
              <Select v-model="editForm.grade">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">Grade 10</SelectItem>
                  <SelectItem value="11">Grade 11</SelectItem>
                  <SelectItem value="12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="space-y-2">
              <Label>Status</Label>
              <div class="flex items-center space-x-2 h-10">
                <Switch v-model="editForm.is_active" />
                <Label>{{ editForm.is_active ? 'Aktif' : 'Nonaktif' }}</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" @click="showEditDialog = false">
              Batal
            </Button>
            <Button type="submit" :disabled="updatingClassroom">
              <Loader2 v-if="updatingClassroom" class="mr-2 h-4 w-4 animate-spin" />
              Simpan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  ArrowLeft,
  Edit,
  MoreVertical,
  Share2,
  Users,
  FileText,
  Plus,
  PlayCircle,
  FileCheck,
  BookOpen,
  MessageSquare,
  UserPlus,
  Loader2,
  AlertCircle,
  ArrowRight,
} from 'lucide-vue-next'

const route = useRoute()
const classroomId = route.params.id as string

const { getClassroom, updateClassroom: updateClassroomAPI } = useClassroom()
const { getMaterials } = useMaterial()
const { getAssignments } = useAssignment()
const { getQuizzes } = useQuiz()
const { getComments, createComment: createCommentAPI, deleteComment: deleteCommentAPI } = useComment()
const { getCurrentUser } = useAuth()

const classroom = ref<any>(null)
const materials = ref<any[]>([])
const assignments = ref<any[]>([])
const quizzes = ref<any[]>([])
const comments = ref<any[]>([])
const user = ref<any>(null)

const loading = ref(true)
const materialsLoading = ref(false)
const commentsLoading = ref(false)
const studentsLoading = ref(false)
const submittingComment = ref(false)
const updatingClassroom = ref(false)

const activeTab = ref('overview')
const newComment = ref('')
const showEditDialog = ref(false)
const selectedMaterialForComment = ref<string>('')

const editForm = ref({
  name: '',
  description: '',
  grade: '',
  is_active: true,
})

const isTeacher = computed(() => user.value?.role === 'teacher' || user.value?.is_superuser)

// Watch for material selection changes
watch(selectedMaterialForComment, async (materialId) => {
  if (materialId) {
    await loadCommentsForMaterial(parseInt(materialId))
  }
})

onMounted(async () => {
  await loadData()
})

const loadData = async () => {
  loading.value = true

  try {
    // Load user
    const { data: userData } = await getCurrentUser()
    if (userData.value) {
      user.value = userData.value
    }

    // Load classroom
    const { data: classroomData } = await getClassroom(classroomId)
    if (classroomData.value) {
      classroom.value = classroomData.value
      
      editForm.value = {
        name: classroomData.value.name,
        description: classroomData.value.description || '',
        grade: classroomData.value.grade.toString(),
        is_active: classroomData.value.is_active,
      }
    }

    // Load materials
    // Load materials
    materialsLoading.value = true
    const { data: materialsData } = await getMaterials({ classroom: classroomId })
    
    // Pastikan materialsData.value ada sebelum diakses
    const currentMaterials = materialsData.value 
    
    if (currentMaterials) {
      materials.value = currentMaterials
      
      // Gunakan currentMaterials yang sudah ter-guaranteed oleh TS
      if (currentMaterials.length > 0) {
        const firstMaterial = currentMaterials[0]
        
        // Pastikan material pertama memiliki ID
        if (firstMaterial && firstMaterial.id) {
          selectedMaterialForComment.value = firstMaterial.id.toString()
          await loadCommentsForMaterial(firstMaterial.id)
        }
      }
    }
    materialsLoading.value = false

    // Load assignments
    const { data: assignmentsData } = await getAssignments({ classroom: classroomId })
    if (assignmentsData.value) {
      assignments.value = assignmentsData.value
    }

    // Load quizzes
    const { data: quizzesData } = await getQuizzes({ classroom: classroomId })
    if (quizzesData.value) {
      quizzes.value = quizzesData.value
    }

  } catch (error) {
    console.error('Error loading classroom:', error)
  } finally {
    loading.value = false
  }
}

const loadCommentsForMaterial = async (materialId: number) => {
  commentsLoading.value = true
  const { data } = await getComments({ material: materialId })
  if (data.value) {
    comments.value = data.value
  }
  commentsLoading.value = false
}

const submitComment = async () => {
  if (!newComment.value.trim() || !selectedMaterialForComment.value) return

  submittingComment.value = true
  const { data } = await createCommentAPI({
    material: parseInt(selectedMaterialForComment.value),
    content: newComment.value,
  })

  if (data.value) {
    comments.value.unshift(data.value)
    newComment.value = ''
  }
  submittingComment.value = false
}

const deleteComment = async (commentId: number) => {
  if (confirm('Hapus komentar ini?')) {
    await deleteCommentAPI(commentId)
    comments.value = comments.value.filter(c => c.id !== commentId)
  }
}

const updateClassroom = async () => {
  updatingClassroom.value = true
  const { data } = await updateClassroomAPI(classroomId, {
    ...editForm.value,
    grade: parseInt(editForm.value.grade),
  })

  if (data.value) {
    classroom.value = data.value
    showEditDialog.value = false
  }
  updatingClassroom.value = false
}

const goToMaterial = (materialId: number) => {
  const prefix = isTeacher.value ? 'teacher' : 'student'
  navigateTo(`/${prefix}/materials/${materialId}`)
}

const createMaterial = () => {
  navigateTo(`/teacher/materials/create?classroom=${classroomId}`)
}

const manageStudents = () => {
  navigateTo(`/teacher/classrooms/${classroomId}/students`)
}

const shareClassroom = () => {
  const url = window.location.href
  navigator.clipboard.writeText(url)
  alert('Link kelas berhasil disalin!')
}

const getInitials = (person: any) => {
  if (!person) return '?'
  const first = person.first_name?.[0] || ''
  const last = person.last_name?.[0] || ''
  return (first + last).toUpperCase() || person.username?.[0]?.toUpperCase() || '?'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days} hari yang lalu`
  if (hours > 0) return `${hours} jam yang lalu`
  if (minutes > 0) return `${minutes} menit yang lalu`
  return 'Baru saja'
}
</script>