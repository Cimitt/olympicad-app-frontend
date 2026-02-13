interface Classroom {
  id: string
  name: string
  description: string
  teacher: any
  grade: number
  students: any[]
  student_count: number
  material_count: number
  is_active: boolean
  created_at: string
  updated_at: string
}

interface ClassroomCreate {
  name: string
  description?: string
  grade: number
  is_active?: boolean
}

interface EnrollStudents {
  student_ids: number[]
}

export const useClassroom = () => {
  const { useAuthFetch } = useAuth()

  const getClassrooms = () => {
    return useAuthFetch<Classroom[]>('/api/classrooms/')
  }

  const getClassroom = (id: string) => {
    return useAuthFetch<Classroom>(`/api/classrooms/${id}/`)
  }

  const createClassroom = (data: ClassroomCreate) => {
    return useAuthFetch<Classroom>('/api/classrooms/', {
      method: 'POST',
      body: data
    })
  }

  const updateClassroom = (id: string, data: Partial<ClassroomCreate>) => {
    return useAuthFetch<Classroom>(`/api/classrooms/${id}/`, {
      method: 'PATCH',
      body: data
    })
  }

  const deleteClassroom = (id: string) => {
    return useAuthFetch(`/api/classrooms/${id}/`, {
      method: 'DELETE'
    })
  }

  const enrollStudents = (classroomId: string, data: EnrollStudents) => {
    return useAuthFetch(`/api/classrooms/${classroomId}/enroll/`, {
      method: 'POST',
      body: data
    })
  }

  const removeStudent = (classroomId: string, studentId: number) => {
    return useAuthFetch(`/api/classrooms/${classroomId}/remove/${studentId}/`, {
      method: 'POST'
    })
  }

  return {
    getClassrooms,
    getClassroom,
    createClassroom,
    updateClassroom,
    deleteClassroom,
    enrollStudents,
    removeStudent
  }
}