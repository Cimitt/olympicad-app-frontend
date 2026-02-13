<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowLeft, Plus, Edit, Trash, MoreVertical, FileQuestion, Check } from 'lucide-vue-next'
import type { Quiz, QuizQuestion } from '~/types/quiz'

definePageMeta({
    middleware: 'auth',
    layout: 'teacher'
})

const route = useRoute()
const quizId = parseInt(route.params.id as string)

const { getQuiz, getQuizQuestions, createQuizQuestion, updateQuizQuestion, deleteQuizQuestion } = useQuiz()

const quiz = ref<Quiz | null>(null)
const questions = ref<QuizQuestion[]>([])
const loading = ref(true)
const submitting = ref(false)
const showQuestionDialog = ref(false)
const editingQuestion = ref<QuizQuestion | null>(null)

const questionForm = ref({
    quiz: quizId,
    question_text: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: '',
    points: 1,
    order: 0
})

onMounted(async () => {
    await Promise.all([loadQuiz(), loadQuestions()])
})

const loadQuiz = async () => {
    const { data } = await getQuiz(quizId)
    if (data.value) {
        quiz.value = data.value
    }
}

const loadQuestions = async () => {
    loading.value = true
    const { data } = await getQuizQuestions({ quiz: quizId })
    if (data.value) {
        questions.value = data.value
    }
    loading.value = false
}

const submitQuestion = async () => {
    submitting.value = true

    if (editingQuestion.value) {
        const { data } = await updateQuizQuestion(editingQuestion.value.id, questionForm.value)
        if (data.value) {
            const index = questions.value.findIndex(q => q.id === editingQuestion.value!.id)
            if (index !== -1) questions.value[index] = data.value
            showQuestionDialog.value = false
            resetForm()
        }
    } else {
        questionForm.value.order = questions.value.length
        const { data } = await createQuizQuestion(questionForm.value)
        if (data.value) {
            questions.value.push(data.value)
            showQuestionDialog.value = false
            resetForm()
        }
    }

    submitting.value = false
}

const editQuestion = (question: QuizQuestion) => {
    editingQuestion.value = question
    questionForm.value = {
        quiz: quizId,
        question_text: question.question_text,
        option_a: question.option_a,
        option_b: question.option_b,
        option_c: question.option_c,
        option_d: question.option_d,
        correct_answer: question.correct_answer || '',
        points: question.points,
        order: question.order
    }
    showQuestionDialog.value = true
}

const deleteQuestion = async (question: QuizQuestion) => {
    if (confirm('Are you sure you want to delete this question?')) {
        await deleteQuizQuestion(question.id)
        questions.value = questions.value.filter(q => q.id !== question.id)
    }
}

const resetForm = () => {
    editingQuestion.value = null
    questionForm.value = {
        quiz: quizId,
        question_text: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_answer: '',
        points: 1,
        order: 0
    }
}
</script>

<template>
    <div class="container mx-auto p-6">
        <div class="mb-6">
            <Button variant="ghost" @click="$router.back()" class="mb-4">
                <ArrowLeft class="mr-2 h-4 w-4" />
                Back to Quizzes
            </Button>

            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-3xl font-bold">{{ quiz?.title }}</h1>
                    <p class="text-muted-foreground">Manage quiz questions</p>
                </div>
                <Button @click="showQuestionDialog = true">
                    <Plus class="mr-2 h-4 w-4" />
                    Add Question
                </Button>
            </div>
        </div>

        <div v-if="loading" class="space-y-4">
            <Card v-for="i in 3" :key="i" class="animate-pulse">
                <CardContent class="p-6">
                    <div class="h-20 bg-muted rounded"></div>
                </CardContent>
            </Card>
        </div>

        <div v-else-if="questions.length === 0" class="text-center py-12">
            <FileQuestion class="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 class="text-lg font-semibold mb-2">No questions yet</h3>
            <p class="text-muted-foreground mb-4">Add questions to your quiz</p>
            <Button @click="showQuestionDialog = true">Add Question</Button>
        </div>

        <div v-else class="space-y-4">
            <Card v-for="(question, index) in questions" :key="question.id">
                <CardHeader>
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-2">
                                <Badge>Question {{ index + 1 }}</Badge>
                                <Badge variant="outline">{{ question.points }} points</Badge>
                            </div>
                            <CardTitle class="text-lg">{{ question.question_text }}</CardTitle>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <Button variant="ghost" size="sm">
                                    <MoreVertical class="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem @click="editQuestion(question)">
                                    <Edit class="mr-2 h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem class="text-destructive" @click="deleteQuestion(question)">
                                    <Trash class="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div v-for="option in ['A', 'B', 'C', 'D']" :key="option"
                            class="flex items-start gap-3 p-3 rounded-lg border"
                            :class="question.correct_answer === option ? 'bg-green-50 border-green-500' : ''">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold"
                                :class="question.correct_answer === option ? 'bg-green-500 text-white' : 'bg-muted'">
                                {{ option }}
                            </div>
                            <p class="text-sm flex-1">
                                {{
                                    question[
                                    `option_${option.toLowerCase()}` as keyof QuizQuestion
                                    ]
                                }}
                            </p>

                            <Check v-if="question.correct_answer === option" class="h-5 w-5 text-green-500" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- question dialog -->
        <Dialog v-model:open="showQuestionDialog">
            <DialogContent class="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{{ editingQuestion ? 'Edit Question' : 'Add New Question' }}</DialogTitle>
                </DialogHeader>

                <form @submit.prevent="submitQuestion" class="space-y-4">
                    <div class="space-y-2">
                        <Label for="question_text">Question</Label>
                        <Textarea id="question_text" v-model="questionForm.question_text"
                            placeholder="Enter your question" rows="3" required />
                    </div>

                    <div class="grid grid-cols-1 gap-4">
                        <div v-for="option in ['A', 'B', 'C', 'D']" :key="option" class="space-y-2">
                            <Label :for="`option_${option}`">Option {{ option }}</Label>
                            <Input :id="`option_${option}`"
                                v-model="questionForm[`option_${option.toLowerCase()}` as keyof typeof questionForm]"
                                :placeholder="`Enter option ${option}`" required />

                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <Label for="correct_answer">Correct Answer</Label>
                            <Select v-model="questionForm.correct_answer" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select correct answer" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="A">Option A</SelectItem>
                                    <SelectItem value="B">Option B</SelectItem>
                                    <SelectItem value="C">Option C</SelectItem>
                                    <SelectItem value="D">Option D</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div class="space-y-2">
                            <Label for="points">Points</Label>
                            <Input id="points" v-model.number="questionForm.points" type="number" min="1" required />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" @click="showQuestionDialog = false">Cancel</Button>
                        <Button type="submit" :disabled="submitting">
                            {{ submitting ? 'Saving...' : editingQuestion ? 'Update Question' : 'Add Question' }}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
</template>