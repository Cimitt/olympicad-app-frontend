interface Assignment {
  id: number
  classroom: string
  classroom_name: string
  title: string
  description: string
  due_date: string
  max_score: number
  created_by: any
  submission_count: number
  created_at: string
  updated_at: string
}

interface AssignmentCreate {
  classroom: string
  title: string
  description: string
  due_date: string
  max_score?: number
}

interface AssignmentSubmission {
  id: number
  assignment: number
  assignment_title: string
  student: any
  file: string
  submitted_at: string
  score?: number
  feedback?: string
  graded_at?: string
}

interface GradeSubmission {
  score: number
  feedback?: string
}

export const useAssignment = () => {
  const { useAuthFetch } = useAuth()

  const getAssignments = (params?: { classroom?: string }) => {
    return useAuthFetch<Assignment[]>('/api/classrooms/assignments/', {
      params
    })
  }

  const getAssignment = (id: number) => {
    return useAuthFetch<Assignment>(`/api/classrooms/assignments/${id}/`)
  }

  const createAssignment = (data: AssignmentCreate) => {
    return useAuthFetch<Assignment>('/api/classrooms/assignments/', {
      method: 'POST',
      body: data
    })
  }

  const updateAssignment = (id: number, data: Partial<AssignmentCreate>) => {
    return useAuthFetch<Assignment>(`/api/classrooms/assignments/${id}/`, {
      method: 'PATCH',
      body: data
    })
  }

  const deleteAssignment = (id: number) => {
    return useAuthFetch(`/api/classrooms/assignments/${id}/`, {
      method: 'DELETE'
    })
  }

  const getSubmissions = (params?: { assignment?: number }) => {
    return useAuthFetch<AssignmentSubmission[]>('/api/classrooms/submissions/', {
      params
    })
  }

  const getSubmission = (id: number) => {
    return useAuthFetch<AssignmentSubmission>(`/api/classrooms/submissions/${id}/`)
  }

  const submitAssignment = (file: File, assignmentId: number) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('assignment', assignmentId.toString())

    return useAuthFetch<AssignmentSubmission>('/api/classrooms/submissions/', {
      method: 'POST',
      body: formData
    })
  }

  const gradeSubmission = (id: number, data: GradeSubmission) => {
    return useAuthFetch(`/api/classrooms/submissions/${id}/grade/`, {
      method: 'PATCH',
      body: data
    })
  }

  return {
    getAssignments,
    getAssignment,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    getSubmissions,
    getSubmission,
    submitAssignment,
    gradeSubmission
  }
}