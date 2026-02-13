<!-- pages/student/quiz/index.vue -->
<template>
  <div class="container mx-auto p-6">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold">My Quizzes</h1>
        <p class="text-muted-foreground">View and take your quizzes</p>
      </div>
      <Button @click="showAccessDialog = true">
        <Key class="mr-2 h-4 w-4" />
        Enter Quiz Code
      </Button>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="i in 6" :key="i" class="animate-pulse">
        <CardContent class="p-6">
          <div class="h-32 bg-muted rounded"></div>
        </CardContent>
      </Card>
    </div>

    <div v-else-if="quizzes.length === 0" class="text-center py-12">
      <FileQuestion class="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 class="text-lg font-semibold mb-2">No quizzes available</h3>
      <p class="text-muted-foreground mb-4">Enter a quiz code to get started</p>
      <Button @click="showAccessDialog = true">
        <Key class="mr-2 h-4 w-4" />
        Enter Quiz Code
      </Button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="quiz in quizzes" :key="quiz.id" class="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div class="flex justify-between items-start mb-2">
            <Badge variant="outline">{{ quiz.classroom_name }}</Badge>
            <Badge v-if="getAttemptStatus(quiz)" :variant="getAttemptStatus(quiz) === 'completed' ? 'default' : 'secondary'">
              {{ getAttemptStatus(quiz) === 'completed' ? 'Completed' : 'In Progress' }}
            </Badge>
          </div>
          <CardTitle class="text-xl">{{ quiz.title }}</CardTitle>
          <CardDescription>{{ quiz.description }}</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-2">
            <div class="flex items-center text-sm text-muted-foreground">
              <FileQuestion class="mr-2 h-4 w-4" />
              {{ quiz.question_count }} Questions
            </div>
            <div v-if="quiz.time_limit" class="flex items-center text-sm text-muted-foreground">
              <Clock class="mr-2 h-4 w-4" />
              {{ quiz.time_limit }} minutes
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex gap-2">
          <Button 
            v-if="!getAttemptStatus(quiz)" 
            class="flex-1" 
            @click="startQuiz(quiz)"
          >
            Start Quiz
          </Button>
          <Button 
            v-else-if="getAttemptStatus(quiz) === 'in_progress'" 
            class="flex-1" 
            @click="continueQuiz(quiz)"
          >
            Continue
          </Button>
          <Button 
            v-if="getAttemptStatus(quiz) === 'completed'" 
            variant="outline" 
            class="flex-1"
            @click="viewResult(quiz)"
          >
            <BarChart3 class="mr-2 h-4 w-4" />
            View Result
          </Button>
        </CardFooter>
      </Card>
    </div>

    <!-- Access Quiz Dialog -->
    <Dialog v-model:open="showAccessDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Quiz Code</DialogTitle>
          <DialogDescription>Enter the 6-character code provided by your teacher</DialogDescription>
        </DialogHeader>
        
        <form @submit.prevent="submitAccessCode" class="space-y-4">
          <div class="space-y-2">
            <Label for="access_token">Quiz Code</Label>
            <Input 
              id="access_token" 
              v-model="accessToken" 
              placeholder="Enter code"
              maxlength="6"
              class="text-center font-mono text-lg tracking-widest uppercase"
              required 
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" @click="showAccessDialog = false">Cancel</Button>
            <Button type="submit" :disabled="submitting">
              {{ submitting ? 'Accessing...' : 'Access Quiz' }}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <!-- Result Dialog -->
    <Dialog v-model:open="showResultDialog">
      <DialogContent class="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Quiz Result</DialogTitle>
          <DialogDescription>{{ selectedQuiz?.title }}</DialogDescription>
        </DialogHeader>

        <div v-if="selectedAttempt" class="space-y-6">
          <div class="flex justify-center">
            <div class="relative w-48 h-48">
              <Doughnut :data="chartData" :options="chartOptions" />
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <p class="text-4xl font-bold">{{ selectedAttempt.score?.toFixed(0) }}%</p>
                <p class="text-sm text-muted-foreground">Score</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <Card>
              <CardContent class="pt-6">
                <div class="text-center">
                  <p class="text-2xl font-bold text-green-600">{{ correctAnswers }}</p>
                  <p class="text-sm text-muted-foreground">Correct</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent class="pt-6">
                <div class="text-center">
                  <p class="text-2xl font-bold text-red-600">{{ wrongAnswers }}</p>
                  <p class="text-sm text-muted-foreground">Wrong</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">Total Points</span>
              <span class="font-semibold">{{ selectedAttempt.total_points }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">Completed At</span>
              <span>{{ formatDate(selectedAttempt.completed_at) }}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Key, FileQuestion, Clock, BarChart3 } from 'lucide-vue-next'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import type { Quiz, QuizAttempt } from '~/types/quiz'

ChartJS.register(ArcElement, Tooltip, Legend)

definePageMeta({
  middleware: 'auth',
  layout: 'student'
})

const { getQuizzes, accessQuiz, getAttempts, startQuizAttempt } = useQuiz()

const quizzes = ref<Quiz[]>([])
const attempts = ref<QuizAttempt[]>([])
const loading = ref(true)
const submitting = ref(false)
const showAccessDialog = ref(false)
const showResultDialog = ref(false)
const accessToken = ref('')
const selectedQuiz = ref<Quiz | null>(null)
const selectedAttempt = ref<QuizAttempt | null>(null)

const correctAnswers = computed(() => {
  if (!selectedAttempt.value) return 0
  const percentage = selectedAttempt.value.score || 0
  const total = selectedQuiz.value?.question_count || 0
  return Math.round((percentage / 100) * total)
})

const wrongAnswers = computed(() => {
  const total = selectedQuiz.value?.question_count || 0
  return total - correctAnswers.value
})

const chartData = computed(() => ({
  labels: ['Correct', 'Wrong'],
  datasets: [{
    data: [correctAnswers.value, wrongAnswers.value],
    backgroundColor: ['#22c55e', '#ef4444'],
    borderWidth: 0
  }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false
    }
  },
  cutout: '70%'
}

onMounted(async () => {
  await Promise.all([loadQuizzes(), loadAttempts()])
})

const loadQuizzes = async () => {
  loading.value = true
  const { data } = await getQuizzes()
  if (data.value) {
    quizzes.value = data.value
  }
  loading.value = false
}

const loadAttempts = async () => {
  const { data } = await getAttempts()
  if (data.value) {
    attempts.value = data.value
  }
}

const getAttemptStatus = (quiz: Quiz) => {
  const attempt = attempts.value.find(a => a.quiz === quiz.id)
  if (!attempt) return null
  return attempt.is_completed ? 'completed' : 'in_progress'
}

const submitAccessCode = async () => {
  submitting.value = true
  const { data, error } = await accessQuiz(accessToken.value.toUpperCase())
  
  if (data.value) {
    // Check if already exists
    const exists = quizzes.value.some(q => q.id === data.value.id)
    if (!exists) {
      quizzes.value.unshift(data.value)
    }
    showAccessDialog.value = false
    accessToken.value = ''
    
    // Auto start quiz
    await startQuiz(data.value)
  }
  
  submitting.value = false
}

const startQuiz = async (quiz: Quiz) => {
  const { data } = await startQuizAttempt(quiz.id)
  if (data.value) {
    navigateTo(`/student/quiz/${quiz.id}/take?attempt=${data.value.id}`)
  }
}

const continueQuiz = (quiz: Quiz) => {
  const attempt = attempts.value.find(a => a.quiz === quiz.id && !a.is_completed)
  if (attempt) {
    navigateTo(`/student/quiz/${quiz.id}/take?attempt=${attempt.id}`)
  }
}

const viewResult = (quiz: Quiz) => {
  const attempt = attempts.value.find(a => a.quiz === quiz.id && a.is_completed)
  if (attempt) {
    selectedQuiz.value = quiz
    selectedAttempt.value = attempt
    showResultDialog.value = true
  }
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleString()
}
</script>