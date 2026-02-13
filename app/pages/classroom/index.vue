
<template>
  <SidebarProvider :style="{
    '--sidebar-width': '280px',
    '--header-height': '64px',
  }">
    <AppSidebar variant="inset" />
    <SidebarInset>
      <SiteHeader />
      <main class="flex flex-1 flex-col gap-6 p-4 lg:p-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 class="text-3xl font-bold tracking-tight">Manajemen Kelas</h1>
            <p class="text-muted-foreground mt-1">
              Kelola dan pantau semua kelas yang Anda ajar
            </p>
          </div>
          <Button @click="openCreateDialog" size="lg">
            <Plus class="mr-2 h-5 w-5" />
            Buat Kelas Baru
          </Button>
        </div>

        <!-- Filter and Search -->
        <Card>
          <CardContent class="p-4">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <div class="relative">
                  <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    v-model="searchQuery"
                    placeholder="Cari kelas..."
                    class="pl-10"
                  />
                </div>
              </div>
              <Select v-model="filterGrade">
                <SelectTrigger class="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Grade</SelectItem>
                  <SelectItem value="10">Grade 10</SelectItem>
                  <SelectItem value="11">Grade 11</SelectItem>
                  <SelectItem value="12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
              <Select v-model="filterStatus">
                <SelectTrigger class="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Nonaktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <!-- Statistics -->
        <div class="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Total Kelas</CardTitle>
              <BookOpen class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ filteredClassrooms.length }}</div>
              <p class="text-xs text-muted-foreground">
                {{ activeClassrooms }} aktif
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
              <CardTitle class="text-sm font-medium">Rata-rata Siswa</CardTitle>
              <TrendingUp class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ averageStudentsPerClass }}</div>
              <p class="text-xs text-muted-foreground">
                Per kelas
              </p>
            </CardContent>
          </Card>
        </div>

        <!-- Classrooms Grid -->
        <div v-if="loading" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card v-for="i in 6" :key="i" class="animate-pulse">
            <CardContent class="p-6">
              <div class="h-48 bg-muted rounded"></div>
            </CardContent>
          </Card>
        </div>

        <div v-else-if="filteredClassrooms.length === 0" class="text-center py-16">
          <BookOpen class="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 class="text-xl font-semibold mb-2">
            {{ searchQuery ? 'Kelas tidak ditemukan' : 'Belum Ada Kelas' }}
          </h3>
          <p class="text-muted-foreground mb-6">
            {{ searchQuery ? 'Coba kata kunci lain' : 'Mulai dengan membuat kelas pertama Anda' }}
          </p>
          <Button v-if="!searchQuery" @click="openCreateDialog" size="lg">
            <Plus class="mr-2 h-5 w-5" />
            Buat Kelas Baru
          </Button>
        </div>

        <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card
            v-for="classroom in filteredClassrooms"
            :key="classroom.id"
            class="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-500 group"
          >
            <CardHeader>
              <div class="flex justify-between items-start mb-2">
                <Badge :variant="classroom.is_active ? 'default' : 'secondary'">
                  {{ classroom.is_active ? 'Aktif' : 'Nonaktif' }}
                </Badge>
                <div class="flex gap-1">
                  <Badge variant="outline">Grade {{ classroom.grade }}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child @click.stop>
                      <Button variant="ghost" size="sm" class="h-8 w-8 p-0">
                        <MoreVertical class="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem @click.stop="goToClassroom(classroom.id)">
                        <Eye class="mr-2 h-4 w-4" />
                        Lihat Detail
                      </DropdownMenuItem>
                      <DropdownMenuItem @click.stop="editClassroom(classroom)">
                        <Edit class="mr-2 h-4 w-4" />
                        Edit Kelas
                      </DropdownMenuItem>
                      <DropdownMenuItem @click.stop="manageMaterials(classroom)">
                        <FileText class="mr-2 h-4 w-4" />
                        Kelola Materi
                      </DropdownMenuItem>
                      <DropdownMenuItem @click.stop="manageStudents(classroom)">
                        <Users class="mr-2 h-4 w-4" />
                        Kelola Siswa
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        @click.stop="toggleClassroomStatus(classroom)"
                        :class="classroom.is_active ? 'text-orange-600' : 'text-green-600'"
                      >
                        <Power class="mr-2 h-4 w-4" />
                        {{ classroom.is_active ? 'Nonaktifkan' : 'Aktifkan' }}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        @click.stop="deleteClassroom(classroom)"
                        class="text-destructive"
                      >
                        <Trash class="mr-2 h-4 w-4" />
                        Hapus Kelas
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardTitle class="text-xl line-clamp-1 group-hover:text-blue-600 transition-colors">
                {{ classroom.name }}
              </CardTitle>
              <CardDescription class="line-clamp-2">
                {{ classroom.description || 'Tidak ada deskripsi' }}
              </CardDescription>
            </CardHeader>
            <CardContent @click="goToClassroom(classroom.id)">
              <div class="space-y-3">
                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center text-muted-foreground">
                    <Users class="mr-2 h-4 w-4" />
                    <span>Siswa Terdaftar</span>
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
                <div class="flex items-center justify-between text-sm text-muted-foreground">
                  <div class="flex items-center">
                    <Calendar class="mr-2 h-4 w-4" />
                    <span>Dibuat</span>
                  </div>
                  <span>{{ formatDate(classroom.created_at) }}</span>
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

        <!-- Create/Edit Classroom Dialog -->
        <Dialog v-model:open="showDialog">
          <DialogContent class="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {{ editingClassroom ? 'Edit Kelas' : 'Buat Kelas Baru' }}
              </DialogTitle>
              <DialogDescription>
                {{ editingClassroom ? 'Perbarui informasi kelas' : 'Isi informasi untuk membuat kelas baru' }}
              </DialogDescription>
            </DialogHeader>

            <form @submit.prevent="submitClassroom" class="space-y-4">
              <div class="space-y-2">
                <Label for="name">Nama Kelas *</Label>
                <Input
                  id="name"
                  v-model="classroomForm.name"
                  placeholder="e.g. Matematika Kelas 10A"
                  required
                />
              </div>

              <div class="space-y-2">
                <Label for="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  v-model="classroomForm.description"
                  placeholder="Deskripsi kelas..."
                  rows="3"
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <Label for="grade">Grade *</Label>
                  <Select v-model="classroomForm.grade" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih grade" />
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
                    <Switch id="is_active" v-model="classroomForm.is_active" />
                    <Label for="is_active" class="cursor-pointer">
                      {{ classroomForm.is_active ? 'Aktif' : 'Nonaktif' }}
                    </Label>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" @click="showDialog = false" :disabled="submitting">
                  Batal
                </Button>
                <Button type="submit" :disabled="submitting">
                  <Loader2 v-if="submitting" class="mr-2 h-4 w-4 animate-spin" />
                  {{ submitting ? 'Menyimpan...' : editingClassroom ? 'Perbarui' : 'Buat Kelas' }}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import {
  Plus,
  Search,
  BookOpen,
  Users,
  FileText,
  TrendingUp,
  Calendar,
  ArrowRight,
  MoreVertical,
  Eye,
  Edit,
  Power,
  Trash,
  Loader2,
} from 'lucide-vue-next'

const { getClassrooms, createClassroom, updateClassroom, deleteClassroom: removeClassroom } = useClassroom()

const classrooms = ref<any[]>([])
const loading = ref(true)
const submitting = ref(false)
const showDialog = ref(false)
const editingClassroom = ref<any>(null)
const searchQuery = ref('')
const filterGrade = ref('all')
const filterStatus = ref('all')

const classroomForm = ref({
  name: '',
  description: '',
  grade: '',
  is_active: true,
})

onMounted(async () => {
  await loadClassrooms()
})

const loadClassrooms = async () => {
  loading.value = true
  const { data } = await getClassrooms()
  if (data.value) {
    classrooms.value = data.value
  }
  loading.value = false
}

const filteredClassrooms = computed(() => {
  let filtered = classrooms.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(query) ||
      c.description?.toLowerCase().includes(query)
    )
  }

  if (filterGrade.value !== 'all') {
    filtered = filtered.filter(c => c.grade.toString() === filterGrade.value)
  }

  if (filterStatus.value !== 'all') {
    const isActive = filterStatus.value === 'active'
    filtered = filtered.filter(c => c.is_active === isActive)
  }

  return filtered
})

const activeClassrooms = computed(() => classrooms.value.filter(c => c.is_active).length)
const totalStudents = computed(() => classrooms.value.reduce((sum, c) => sum + (c.student_count || 0), 0))
const totalMaterials = computed(() => classrooms.value.reduce((sum, c) => sum + (c.material_count || 0), 0))
const averageStudentsPerClass = computed(() => {
  if (classrooms.value.length === 0) return 0
  return Math.round(totalStudents.value / classrooms.value.length)
})

const openCreateDialog = () => {
  editingClassroom.value = null
  classroomForm.value = {
    name: '',
    description: '',
    grade: '',
    is_active: true,
  }
  showDialog.value = true
}

const editClassroom = (classroom: any) => {
  editingClassroom.value = classroom
  classroomForm.value = {
    name: classroom.name,
    description: classroom.description || '',
    grade: classroom.grade.toString(),
    is_active: classroom.is_active,
  }
  showDialog.value = true
}

const submitClassroom = async () => {
  submitting.value = true

  const payload = {
    ...classroomForm.value,
    grade: parseInt(classroomForm.value.grade),
  }

  try {
    if (editingClassroom.value) {
      const { data } = await updateClassroom(editingClassroom.value.id, payload)
      if (data.value) {
        const index = classrooms.value.findIndex(c => c.id === editingClassroom.value.id)
        if (index !== -1) {
          classrooms.value[index] = data.value
        }
      }
    } else {
      const { data } = await createClassroom(payload)
      if (data.value) {
        classrooms.value.unshift(data.value)
      }
    }
    showDialog.value = false
  } catch (error) {
    console.error('Error submitting classroom:', error)
  } finally {
    submitting.value = false
  }
}

const toggleClassroomStatus = async (classroom: any) => {
  const { data } = await updateClassroom(classroom.id, {
    is_active: !classroom.is_active,
  })
  if (data.value) {
    const index = classrooms.value.findIndex(c => c.id === classroom.id)
    if (index !== -1) {
      classrooms.value[index] = data.value
    }
  }
}

const deleteClassroom = async (classroom: any) => {
  if (confirm(`Apakah Anda yakin ingin menghapus kelas "${classroom.name}"?`)) {
    await removeClassroom(classroom.id)
    classrooms.value = classrooms.value.filter(c => c.id !== classroom.id)
  }
}

const goToClassroom = (classroomId: string) => {
  navigateTo(`/teacher/classrooms/${classroomId}`)
}

const manageMaterials = (classroom: any) => {
  navigateTo(`/teacher/materials?classroom=${classroom.id}`)
}

const manageStudents = (classroom: any) => {
  navigateTo(`/teacher/classrooms/${classroom.id}/students`)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
</script>