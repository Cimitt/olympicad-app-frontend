interface Comment {
  id: number
  material: number
  material_title: string
  user: any
  content: string
  parent?: number
  replies: Comment[]
  is_edited: boolean
  created_at: string
  updated_at: string
}

interface CommentCreate {
  material: number
  content: string
  parent?: number
}

export const useComment = () => {
  const { useAuthFetch } = useAuth()

  const getComments = (params?: { material?: number }) => {
    return useAuthFetch<Comment[]>('/api/comments/', {
      params
    })
  }

  const getComment = (id: number) => {
    return useAuthFetch<Comment>(`/api/comments/${id}/`)
  }

  const createComment = (data: CommentCreate) => {
    return useAuthFetch<Comment>('/api/comments/', {
      method: 'POST',
      body: data
    })
  }

  const updateComment = (id: number, data: { content: string }) => {
    return useAuthFetch<Comment>(`/api/comments/${id}/`, {
      method: 'PATCH',
      body: data
    })
  }

  const deleteComment = (id: number) => {
    return useAuthFetch(`/api/comments/${id}/`, {
      method: 'DELETE'
    })
  }

  return {
    getComments,
    getComment,
    createComment,
    updateComment,
    deleteComment
  }
}