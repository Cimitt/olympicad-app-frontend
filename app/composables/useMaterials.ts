// composables/useMaterial.ts
interface Material {
  id: number
  classroom: string
  classroom_name: string
  title: string
  description: string
  material_type: 'video' | 'pdf'
  file?: string
  video_url?: string
  created_by: any
  order: number
  question_count: number
  created_at: string
  updated_at: string
}

interface MaterialCreate {
  classroom: string
  title: string
  description?: string
  material_type: 'video' | 'pdf'
  file?: File
  video_url?: string
  order?: number
}

interface MultipleChoiceQuestion {
  id: number
  material: number
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer?: string
  explanation?: string
  points: number
  created_at: string
}

interface QuestionCreate {
  material: number
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  explanation?: string
  points?: number
}

interface StudentAnswer {
  id: number
  question: number
  question_text: string
  student: any
  selected_answer: string
  is_correct: boolean
  answered_at: string
}

interface AnswerCreate {
  question: number
  selected_answer: string
}

export const useMaterial = () => {
  const { useAuthFetch } = useAuth()

  const getMaterials = (params?: { classroom?: string }) => {
    return useAuthFetch<Material[]>('/api/materials/', {
      params
    })
  }

  const getMaterial = (id: number) => {
    return useAuthFetch<Material>(`/api/materials/${id}/`)
  }

  const createMaterial = (data: MaterialCreate) => {
    const formData = new FormData()
    formData.append('classroom', data.classroom)
    formData.append('title', data.title)
    if (data.description) formData.append('description', data.description)
    formData.append('material_type', data.material_type)
    if (data.file) formData.append('file', data.file)
    if (data.video_url) formData.append('video_url', data.video_url)
    if (data.order !== undefined) formData.append('order', data.order.toString())

    return useAuthFetch<Material>('/api/materials/', {
      method: 'POST',
      body: formData
    })
  }

  const updateMaterial = (id: number, data: Partial<MaterialCreate>) => {
    const formData = new FormData()
    if (data.title) formData.append('title', data.title)
    if (data.description) formData.append('description', data.description)
    if (data.material_type) formData.append('material_type', data.material_type)
    if (data.file) formData.append('file', data.file)
    if (data.video_url) formData.append('video_url', data.video_url)
    if (data.order !== undefined) formData.append('order', data.order.toString())

    return useAuthFetch<Material>(`/api/materials/${id}/`, {
      method: 'PATCH',
      body: formData
    })
  }

  const deleteMaterial = (id: number) => {
    return useAuthFetch(`/api/materials/${id}/`, {
      method: 'DELETE'
    })
  }

  const getQuestions = (params?: { material?: number }) => {
    return useAuthFetch<MultipleChoiceQuestion[]>('/api/materials/questions/', {
      params
    })
  }

  const getQuestion = (id: number) => {
    return useAuthFetch<MultipleChoiceQuestion>(`/api/materials/questions/${id}/`)
  }

  const createQuestion = (data: QuestionCreate) => {
    return useAuthFetch<MultipleChoiceQuestion>('/api/materials/questions/', {
      method: 'POST',
      body: data
    })
  }

  const updateQuestion = (id: number, data: Partial<QuestionCreate>) => {
    return useAuthFetch<MultipleChoiceQuestion>(`/api/materials/questions/${id}/`, {
      method: 'PATCH',
      body: data
    })
  }

  const deleteQuestion = (id: number) => {
    return useAuthFetch(`/api/materials/questions/${id}/`, {
      method: 'DELETE'
    })
  }

  const getAnswers = (params?: { question?: number; material?: number }) => {
    return useAuthFetch<StudentAnswer[]>('/api/materials/answers/', {
      params
    })
  }

  const submitAnswer = (data: AnswerCreate) => {
    return useAuthFetch<StudentAnswer>('/api/materials/answers/', {
      method: 'POST',
      body: data
    })
  }

  const getStudentProgress = (materialId: number) => {
    return useAuthFetch(`/api/materials/${materialId}/progress/`)
  }

  return {
    getMaterials,
    getMaterial,
    createMaterial,
    updateMaterial,
    deleteMaterial,
    getQuestions,
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getAnswers,
    submitAnswer,
    getStudentProgress
  }
}