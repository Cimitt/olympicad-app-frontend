<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Plus, Edit, Trash, MoreVertical, Lock, Clock, Users, FileQuestion, BarChart3, List, Power, Loader2 } from 'lucide-vue-next'
import type { Quiz, StudentResult } from '~/types/quiz'
import { useQuiz } from '~/composables/useQuiz'

definePageMeta({
  middleware: 'auth',
})

const { getQuizzes, createQuiz, updateQuiz, deleteQuiz: removeQuiz, getQuizResults } = useQuiz()
const { getClassrooms } = useClassroom()

const quizzes = ref<Quiz[]>([])
const classrooms = ref<any[]>([])
const loading = ref(true)
const submitting = ref(false)
const showCreateDialog = ref(false)
const showResultsDialog = ref(false)
const editingQuiz = ref<Quiz | null>(null)
const selectedClassroom = ref('all')
const selectedQuiz = ref<Quiz | null>(null)
const quizResults = ref<StudentResult[]>([])
const loadingResults = ref(false)

const quizForm = ref({
  classroom: '',
  title: '',
  description: '',
  time_limit: undefined as number | undefined,
  is_active: true,
  start_time: '',
  end_time: ''
})

const filteredQuizzes = computed(() => {
  if (selectedClassroom.value === 'all') return quizzes.value
  return quizzes.value.filter(q => q.classroom === selectedClassroom.value)
})

onMounted(async () => {
  await Promise.all([loadQuizzes(), loadClassrooms()])
})

const loadQuizzes = async () => {
  loading.value = true
  const { data } = await getQuizzes()
  if (data.value) {
    quizzes.value = data.value
  }
  loading.value = false
}

const loadClassrooms = async () => {
  const { data } = await getClassrooms()
  if (data.value) {
    classrooms.value = data.value
  }
}

const submitQuiz = async () => {
  submitting.value = true
  
  const payload = {
    ...quizForm.value,
    start_time: quizForm.value.start_time || undefined,
    end_time: quizForm.value.end_time || undefined,
    time_limit: quizForm.value.time_limit || undefined
  }

  if (editingQuiz.value) {
    const { data, error } = await updateQuiz(editingQuiz.value.id, payload)
    if (data.value) {
      const index = quizzes.value.findIndex(q => q.id === editingQuiz.value!.id)
      if (index !== -1) quizzes.value[index] = data.value
      showCreateDialog.value = false
      resetForm()
    }
  } else {
    const { data, error } = await createQuiz(payload)
    if (data.value) {
      quizzes.value.unshift(data.value)
      showCreateDialog.value = false
      resetForm()
      // Navigate to manage questions
      navigateTo(`/teacher/quiz/${data.value.id}/questions`)
    }
  }
  
  submitting.value = false
}

const editQuiz = (quiz: Quiz) => {
  editingQuiz.value = quiz
  quizForm.value = {
    classroom: quiz.classroom,
    title: quiz.title,
    description: quiz.description,
    time_limit: quiz.time_limit ?? undefined,
    is_active: quiz.is_active,
    start_time: quiz.start_time || '',
    end_time: quiz.end_time || ''
  }
  showCreateDialog.value = true
}

const manageQuestions = (quiz: Quiz) => {
  navigateTo(`/teacher/quiz/${quiz.id}/questions`)
}

const viewResults = async (quiz: Quiz) => {
  selectedQuiz.value = quiz
  showResultsDialog.value = true
  loadingResults.value = true
  
  const { data } = await getQuizResults(quiz.id)
  if (data.value) {
    quizResults.value = data.value.results || []
  }
  
  loadingResults.value = false
}

const toggleQuizStatus = async (quiz: Quiz) => {
  const { data } = await updateQuiz(quiz.id, { is_active: !quiz.is_active })
  if (data.value) {
    const index = quizzes.value.findIndex(q => q.id === quiz.id)
    if (index !== -1) quizzes.value[index] = data.value
  }
}

const deleteQuiz = async (quiz: Quiz) => {
  if (confirm(`Are you sure you want to delete "${quiz.title}"?`)) {
    await removeQuiz(quiz.id)
    quizzes.value = quizzes.value.filter(q => q.id !== quiz.id)
  }
}

const resetForm = () => {
  editingQuiz.value = null
  quizForm.value = {
    classroom: '',
    title: '',
    description: '',
    time_limit: undefined,
    is_active: true,
    start_time: '',
    end_time: ''
  }
}

const getScoreBadgeVariant = (score: number) => {
  if (score >= 80) return 'default'
  if (score >= 60) return 'secondary'
  return 'destructive'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}
</script>

<template>
  <div class="container mx-auto p-6">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold">Quiz Management</h1>
        <p class="text-muted-foreground">Manage your quizzes and monitor student progress</p>
      </div>
      <Button @click="showCreateDialog = true">
        <Plus class="mr-2 h-4 w-4" />
        Create Quiz
      </Button>
    </div>

    <!-- Filter by Classroom -->
    <div class="mb-6">
      <Select v-model="selectedClassroom">
        <SelectTrigger class="w-[280px]">
          <SelectValue placeholder="Filter by classroom" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Classrooms</SelectItem>
          <SelectItem v-for="classroom in classrooms" :key="classroom.id" :value="classroom.id">
            {{ classroom.name }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- Quiz Cards Grid -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="i in 6" :key="i" class="animate-pulse">
        <CardContent class="p-6">
          <div class="h-24 bg-muted rounded"></div>
        </CardContent>
      </Card>
    </div>

    <div v-else-if="filteredQuizzes.length === 0" class="text-center py-12">
      <FileQuestion class="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 class="text-lg font-semibold mb-2">No quizzes yet</h3>
      <p class="text-muted-foreground mb-4">Create your first quiz to get started</p>
      <Button @click="showCreateDialog = true">Create Quiz</Button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="quiz in filteredQuizzes" :key="quiz.id" class="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <CardTitle class="text-xl mb-2">{{ quiz.title }}</CardTitle>
              <CardDescription>{{ quiz.classroom_name }}</CardDescription>
            </div>
            <Badge :variant="quiz.is_active ? 'default' : 'secondary'">
              {{ quiz.is_active ? 'Active' : 'Inactive' }}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground mb-4 line-clamp-2">{{ quiz.description }}</p>
          
          <div class="space-y-2 mb-4">
            <div class="flex items-center text-sm">
              <Lock class="mr-2 h-4 w-4 text-muted-foreground" />
              <span class="font-mono font-semibold">{{ quiz.access_token }}</span>
            </div>
            <div class="flex items-center text-sm text-muted-foreground">
              <FileQuestion class="mr-2 h-4 w-4" />
              {{ quiz.question_count }} Questions
            </div>
            <div class="flex items-center text-sm text-muted-foreground">
              <Users class="mr-2 h-4 w-4" />
              {{ quiz.attempt_count }} Attempts
            </div>
            <div v-if="quiz.time_limit" class="flex items-center text-sm text-muted-foreground">
              <Clock class="mr-2 h-4 w-4" />
              {{ quiz.time_limit }} minutes
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex gap-2">
          <Button variant="outline" size="sm" class="flex-1" @click="editQuiz(quiz)">
            <Edit class="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" size="sm" class="flex-1" @click="viewResults(quiz)">
            <BarChart3 class="mr-2 h-4 w-4" />
            Results
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" size="sm">
                <MoreVertical class="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem @click="manageQuestions(quiz)">
                <List class="mr-2 h-4 w-4" />
                Manage Questions
              </DropdownMenuItem>
              <DropdownMenuItem @click="toggleQuizStatus(quiz)">
                <Power class="mr-2 h-4 w-4" />
                {{ quiz.is_active ? 'Deactivate' : 'Activate' }}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem class="text-destructive" @click="deleteQuiz(quiz)">
                <Trash class="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </div>

    <!-- Create/Edit Quiz Dialog -->
    <Dialog v-model:open="showCreateDialog">
      <DialogContent class="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{{ editingQuiz ? 'Edit Quiz' : 'Create New Quiz' }}</DialogTitle>
        </DialogHeader>
        
        <form @submit.prevent="submitQuiz" class="space-y-4">
          <div class="space-y-2">
            <Label for="classroom">Classroom</Label>
            <Select v-model="quizForm.classroom" required>
              <SelectTrigger>
                <SelectValue placeholder="Select classroom" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="classroom in classrooms" :key="classroom.id" :value="classroom.id">
                  {{ classroom.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <Label for="title">Quiz Title</Label>
            <Input id="title" v-model="quizForm.title" placeholder="Enter quiz title" required />
          </div>

          <div class="space-y-2">
            <Label for="description">Description</Label>
            <Textarea id="description" v-model="quizForm.description" placeholder="Enter quiz description" rows="3" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="time_limit">Time Limit (minutes)</Label>
              <Input id="time_limit" v-model.number="quizForm.time_limit" type="number" placeholder="Optional" />
            </div>

            <div class="space-y-2">
              <Label>Status</Label>
              <div class="flex items-center space-x-2">
                <Switch id="is_active" v-model="quizForm.is_active" />
                <Label for="is_active">Active</Label>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="start_time">Start Time (Optional)</Label>
              <Input id="start_time" v-model="quizForm.start_time" type="datetime-local" />
            </div>

            <div class="space-y-2">
              <Label for="end_time">End Time (Optional)</Label>
              <Input id="end_time" v-model="quizForm.end_time" type="datetime-local" />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" @click="showCreateDialog = false">Cancel</Button>
            <Button type="submit" :disabled="submitting">
              {{ submitting ? 'Saving...' : editingQuiz ? 'Update Quiz' : 'Create Quiz' }}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <!-- result dialog -->
    <Dialog v-model:open="showResultsDialog">
      <DialogContent class="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Quiz Results - {{ selectedQuiz?.title }}</DialogTitle>
          <DialogDescription>View student performance and scores</DialogDescription>
        </DialogHeader>

        <div v-if="loadingResults" class="flex justify-center py-8">
          <Loader2 class="h-8 w-8 animate-spin" />
        </div>

        <div v-else-if="quizResults.length === 0" class="text-center py-8">
          <p class="text-muted-foreground">No submissions yet</p>
        </div>

        <div v-else>
          <div class="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead class="text-center">Score</TableHead>
                  <TableHead class="text-center">Points</TableHead>
                  <TableHead>Completed At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="result in quizResults" :key="result.student.id">
                  <TableCell class="font-medium">{{ result.student.name }}</TableCell>
                  <TableCell>{{ result.student.username }}</TableCell>
                  <TableCell class="text-center">
                    <Badge :variant="getScoreBadgeVariant(result.score)">
                      {{ result.score?.toFixed(1) }}%
                    </Badge>
                  </TableCell>
                  <TableCell class="text-center">{{ result.total_points }}</TableCell>
                  <TableCell>{{ formatDate(result.completed_at) }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>