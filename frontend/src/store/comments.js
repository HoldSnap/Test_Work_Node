import apiClient from '../services/api'

const state = {
  comments: []
}

const mutations = {
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
}

const actions = {
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
      const response = await apiClient.post(`/article/${articleId}/comments`, comment)
      commit('addComment', response.data)
    } catch (error) {
      console.error('Error creating comment:', error)
    }
  },
  async updateComment({ commit }, { articleId, id, updatedComment }) {
    try {
      const response = await apiClient.patch(`/article/${articleId}/comments/${id}`, updatedComment)
      commit('updateComment', { id, updatedComment: response.data })
    } catch (error) {
      console.error('Error updating comment:', error)
    }
  },
  async deleteComment({ commit }, { articleId, id }) {
    try {
      await apiClient.delete(`/article/${articleId}/comments/${id}`)
      commit('deleteComment', id)
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  }
}

const getters = {
  allComments: (state) => state.comments
}

export default {
  state,
  mutations,
  actions,
  getters
}
