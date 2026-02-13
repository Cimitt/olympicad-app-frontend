// types/quiz.ts
export interface Quiz {
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
  questions?: QuizQuestion[]
}

export interface QuizQuestion {
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
}

export interface QuizAttempt {
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

export interface QuizAnswer {
  question: number
  selected_answer: string
}

export interface StudentResult {
  student: {
    id: number
    username: string
    name: string
  }
  score: number
  total_points: number
  started_at: string
  completed_at: string
}