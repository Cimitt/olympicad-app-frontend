<!-- pages/student/quiz/[id]/take.vue -->
<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div class="container mx-auto max-w-4xl">
            <!-- Header -->
            <Card class="mb-6">
                <CardContent class="p-6">
                    <div class="flex justify-between items-center">
                        <div>
                            <h1 class="text-2xl font-bold mb-1">{{ quiz?.title }}</h1>
                            <p class="text-sm text-muted-foreground">{{ quiz?.classroom_name }}</p>
                        </div>
                        <div class="flex items-center gap-4">
                            <div v-if="timeRemaining !== null" class="flex items-center gap-2">
                                <Clock class="h-5 w-5"
                                    :class="timeRemaining < 300 ? 'text-red-500' : 'text-muted-foreground'" />
                                <span class="font-mono text-lg font-bold"
                                    :class="timeRemaining < 300 ? 'text-red-500' : ''">
                                    {{ formatTime(timeRemaining) }}
                                </span>
                            </div>
                            <Button @click="confirmSubmit" variant="default" size="lg">
                                <Send class="mr-2 h-4 w-4" />
                                Submit
                            </Button>
                        </div>
                    </div>

                    <!-- Progress Bar -->
                    <div class="mt-4">
                        <div class="flex justify-between text-sm mb-2">
                            <span class="text-muted-foreground">Progress</span>
                            <span class="font-semibold">{{ answeredCount }}/{{ questions.length }} answered</span>
                        </div>
                        <Progress :value="(answeredCount / questions.length) * 100" class="h-2" />
                    </div>
                </CardContent>
            </Card>

            <!-- Question Navigation -->
            <Card class="mb-6">
                <CardContent class="p-4">
                    <div class="flex flex-wrap gap-2">
                        <Button v-for="(q, index) in questions" :key="q.id" size="sm"
                            :variant="currentQuestionIndex === index ? 'default' : answers[q.id] ? 'secondary' : 'outline'"
                            @click="currentQuestionIndex = index" class="w-12 h-12">
                            {{ index + 1 }}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <!-- Question Card -->
            <Card v-if="currentQuestion" class="shadow-xl">
                <CardHeader class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                                {{ currentQuestionIndex + 1 }}
                            </div>
                            <div>
                                <CardTitle class="text-white">Question {{ currentQuestionIndex + 1 }}</CardTitle>
                                <CardDescription class="text-white/80">{{ currentQuestion.points }} points
                                </CardDescription>
                            </div>
                        </div>
                        <Badge variant="secondary" class="bg-white/20 text-white border-0">
                            No {{ currentQuestionIndex + 1 }}/{{ questions.length }}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent class="p-8">
                    <h2 class="text-2xl font-semibold mb-8 leading-relaxed">
                        {{ currentQuestion.question_text }}
                    </h2>

                    <div class="space-y-4">
                        <div v-for="option in ['A', 'B', 'C', 'D']" :key="option" @click="selectAnswer(option)"
                            class="group relative cursor-pointer">
                            <div class="flex items-start gap-4 p-6 rounded-2xl border-2 transition-all duration-300"
                                :class="[
                                    answers[currentQuestion.id] === option
                                        ? 'border-blue-500 bg-blue-50 shadow-lg scale-[1.02]'
                                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-md'
                                ]">
                                <div class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300"
                                    :class="[
                                        answers[currentQuestion.id] === option
                                            ? 'bg-blue-500 text-white shadow-lg'
                                            : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                                    ]">
                                    {{ option }}
                                </div>
                                <p class="text-lg flex-1 pt-2.5">
                                    {{
                                        currentQuestion[
                                    `option_${option.toLowerCase()}` as keyof QuizQuestion
                                    ]
                                    }}
                                </p>

                                <div v-if="answers[currentQuestion.id] === option"
                                    class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                                    <Check class="h-4 w-4 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter class="flex justify-between p-6 bg-gray-50">
                    <Button variant="outline" @click="previousQuestion" :disabled="currentQuestionIndex === 0">
                        <ChevronLeft class="mr-2 h-4 w-4" />
                        Previous
                    </Button>
                    <Button v-if="currentQuestionIndex < questions.length - 1" @click="nextQuestion">
                        Next
                        <ChevronRight class="ml-2 h-4 w-4" />
                    </Button>
                    <Button v-else @click="confirmSubmit" variant="default">
                        <Send class="mr-2 h-4 w-4" />
                        Submit Quiz
                    </Button>
                </CardFooter>
            </Card>
        </div>

        <!-- Confirm Submit Dialog -->
        <Dialog v-model:open="showConfirmDialog">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Submit Quiz?</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to submit? You have answered {{ answeredCount }} out of {{
                        questions.length }} questions.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" @click="showConfirmDialog = false">Cancel</Button>
                    <Button @click="submitQuiz" :disabled="submitting">
                        {{ submitting ? 'Submitting...' : 'Yes, Submit' }}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Clock, Send, Check, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import type { Quiz, QuizQuestion, QuizAttempt } from '~/types/quiz'

definePageMeta({
    middleware: 'auth',
})

const route = useRoute()
const router = useRouter()
const quizId = parseInt(route.params.id as string)
const attemptId = parseInt(route.query.attempt as string)

const { getQuiz, getQuizQuestions, submitQuizAnswer, completeQuiz } = useQuiz()

const quiz = ref<Quiz | null>(null)
const questions = ref<QuizQuestion[]>([])
const answers = ref<Record<number, string>>({})
const currentQuestionIndex = ref(0)
const timeRemaining = ref<number | null>(null)
const submitting = ref(false)
const showConfirmDialog = ref(false)
let timerInterval: any = null

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])

const answeredCount = computed(() => Object.keys(answers.value).length)

onMounted(async () => {
    await loadQuiz()
    await loadQuestions()
    startTimer()

    // Prevent accidental page close
    window.addEventListener('beforeunload', handleBeforeUnload)
})

onUnmounted(() => {
    if (timerInterval) clearInterval(timerInterval)
    window.removeEventListener('beforeunload', handleBeforeUnload)
})

const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault()
    e.returnValue = ''
}

const loadQuiz = async () => {
    const { data } = await getQuiz(quizId)
    if (data.value) {
        quiz.value = data.value
    }
}

const loadQuestions = async () => {
    const { data } = await getQuizQuestions({ quiz: quizId })
    if (data.value) {
        questions.value = data.value
    }
}

const startTimer = () => {
    if (!quiz.value?.time_limit) return

    timeRemaining.value = quiz.value.time_limit * 60 // Convert to seconds

    timerInterval = setInterval(() => {
        if (timeRemaining.value !== null && timeRemaining.value > 0) {
            timeRemaining.value--
        } else if (timeRemaining.value === 0) {
            // Auto submit when time runs out
            submitQuiz()
        }
    }, 1000)
}

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const selectAnswer = async (option: string) => {
  const question = currentQuestion.value
  if (!question) return

  answers.value[question.id] = option

  await submitQuizAnswer(attemptId, {
    question: question.id,
    selected_answer: option
  })
}

const previousQuestion = () => {
    if (currentQuestionIndex.value > 0) {
        currentQuestionIndex.value--
    }
}

const nextQuestion = () => {
    if (currentQuestionIndex.value < questions.value.length - 1) {
        currentQuestionIndex.value++
    }
}

const confirmSubmit = () => {
    showConfirmDialog.value = true
}

const submitQuiz = async () => {
    submitting.value = true

    const { data, error } = await completeQuiz(attemptId)

    if (data.value) {
        if (timerInterval) clearInterval(timerInterval)
        router.push('/student/quiz')
    }

    submitting.value = false
    showConfirmDialog.value = false
}
</script>