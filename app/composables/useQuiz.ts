interface Quiz {
  id: number
  classroom: string
  classroom_name: string
  title: string
  description: string
  access_token: string
  created_by: any
  time_limit?: number
  start_time?: string
  end_time?: string
  is_active: boolean
  question_count: number
  attempt_count: number
  created_at: string
  updated_at: string
}

interface QuizCreate {
  classroom: string
  title: string
  description?: string
  time_limit?: number
  start_time?: string
  end_time?: string
  is_active?: boolean
}

interface QuizQuestion {
  id: number
  quiz: number
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer?: string
  points: number
  order: number
  created_at?: string
}

interface QuizQuestionCreate {
  quiz: number
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  points?: number
  order?: number
}

interface QuizAttempt {
  id: number
  quiz: number
  quiz_title: string
  student: any
  started_at: string
  completed_at?: string
  score?: number
  total_points: number
  is_completed: boolean
}

interface QuizAnswer {
  id: number
  attempt: number
  question: number
  question_text: string
  selected_answer: string
  is_correct: boolean
  answered_at: string
}

interface AnswerSubmit {
  question: number
  selected_answer: string
}

export const useQuiz = () => {
  const { useAuthFetch } = useAuth()

  const getQuizzes = (params?: { classroom?: string }) => {
    return useAuthFetch<Quiz[]>('/api/quiz/', {
      params
    })
  }

  const getQuiz = (id: number) => {
    return useAuthFetch<Quiz>(`/api/quiz/${id}/`)
  }

  const createQuiz = (data: QuizCreate) => {
    return useAuthFetch<Quiz>('/api/quiz/', {
      method: 'POST',
      body: data
    })
  }

  const updateQuiz = (id: number, data: Partial<QuizCreate>) => {
    return useAuthFetch<Quiz>(`/api/quiz/${id}/`, {
      method: 'PATCH',
      body: data
    })
  }

  const deleteQuiz = (id: number) => {
    return useAuthFetch(`/api/quiz/${id}/`, {
      method: 'DELETE'
    })
  }

  const accessQuiz = (accessToken: string) => {
    return useAuthFetch('/api/quiz/access/', {
      method: 'POST',
      body: { access_token: accessToken }
    })
  }

  const getQuizQuestions = (params?: { quiz?: number }) => {
    return useAuthFetch<QuizQuestion[]>('/api/quiz/questions/', {
      params
    })
  }

  const getQuizQuestion = (id: number) => {
    return useAuthFetch<QuizQuestion>(`/api/quiz/questions/${id}/`)
  }

  const createQuizQuestion = (data: QuizQuestionCreate) => {
    return useAuthFetch<QuizQuestion>('/api/quiz/questions/', {
      method: 'POST',
      body: data
    })
  }

  const updateQuizQuestion = (id: number, data: Partial<QuizQuestionCreate>) => {
    return useAuthFetch<QuizQuestion>(`/api/quiz/questions/${id}/`, {
      method: 'PATCH',
      body: data
    })
  }

  const deleteQuizQuestion = (id: number) => {
    return useAuthFetch(`/api/quiz/questions/${id}/`, {
      method: 'DELETE'
    })
  }

  const getAttempts = (params?: { quiz?: number }) => {
    return useAuthFetch<QuizAttempt[]>('/api/quiz/attempts/', {
      params
    })
  }

  const getAttempt = (id: number) => {
    return useAuthFetch<QuizAttempt>(`/api/quiz/attempts/${id}/`)
  }

  const startQuizAttempt = (quizId: number) => {
    return useAuthFetch<QuizAttempt>('/api/quiz/attempts/', {
      method: 'POST',
      body: { quiz: quizId }
    })
  }

  const submitQuizAnswer = (attemptId: number, data: AnswerSubmit) => {
    return useAuthFetch<QuizAnswer>(`/api/quiz/attempts/${attemptId}/answer/`, {
      method: 'POST',
      body: data
    })
  }

  const completeQuiz = (attemptId: number) => {
    return useAuthFetch(`/api/quiz/attempts/${attemptId}/complete/`, {
      method: 'POST'
    })
  }

  const getQuizResults = (quizId: number) => {
    return useAuthFetch(`/api/quiz/${quizId}/results/`)
  }

  return {
    getQuizzes,
    getQuiz,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    accessQuiz,
    getQuizQuestions,
    getQuizQuestion,
    createQuizQuestion,
    updateQuizQuestion,
    deleteQuizQuestion,
    getAttempts,
    getAttempt,
    startQuizAttempt,
    submitQuizAnswer,
    completeQuiz,
    getQuizResults
  }
}