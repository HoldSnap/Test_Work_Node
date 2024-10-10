import apiClient from '../services/api'

const commentsModule = {
  state: {
    comments: []
  },
  mutations: {
    setComments(state, comments) {
      state.comments = comments
    },
    addComment(state, comment) {
      state.comments.push(comment)
    },
    updateComment(state, { id, updatedComment }) {
      const index = state.comments.findIndex((comment) => comment.id === id)
      if (index !== -1) {
        state.comments.splice(index, 1, updatedComment)
      }
    },
    deleteComment(state, id) {
      state.comments = state.comments.filter((comment) => comment.id !== id)
    }
  },
  actions: {
    async fetchComments({ commit }, articleId) {
      try {
        const response = await apiClient.get(`/article/${articleId}/comments`)
        commit('setComments', response.data)
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    },
    async createComment({ commit }, { articleId, comment }) {
      try {
        const response = await apiClient.post(`/article/${articleId}/comment`, comment)
        commit('addComment', response.data)
      } catch (error) {
        console.error('Error creating comment:', error)
      }
    },
    async updateComment({ commit }, { articleId, commentId, updatedComment }) {
      try {
        const response = await apiClient.patch(
          `/article/${articleId}/comment/${commentId}`,
          updatedComment
        )
        commit('updateComment', { id: commentId, updatedComment: response.data })
      } catch (error) {
        console.error('Error updating comment:', error)
      }
    },
    async deleteComment({ commit }, { articleId, commentId }) {
      try {
        await apiClient.delete(`/article/${articleId}/comment/${commentId}`)
        commit('deleteComment', commentId)
      } catch (error) {
        console.error('Error deleting comment:', error)
      }
    }
  },
  getters: {
    allComments: (state) => state.comments
  }
}

export default commentsModule
