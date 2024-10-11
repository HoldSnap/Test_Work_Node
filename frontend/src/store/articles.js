import apiClient from '../services/api'

const state = {
  articles: []
}

const mutations = {
  setArticles(state, articles) {
    state.articles = articles
  },
  addArticle(state, article) {
    state.articles.push(article)
  },
  updateArticle(state, { id, updatedArticle }) {
    const index = state.articles.findIndex((article) => article.id === id)
    if (index !== -1) {
      state.articles.splice(index, 1, updatedArticle)
    }
  }
}

const actions = {
  async fetchArticles({ commit }) {
    try {
      const response = await apiClient.get('/article')
      commit('setArticles', response.data)
    } catch (error) {
      console.error('Error fetching articles:', error)
    }
  },
  async fetchArticle({ commit }, id) {
    try {
      const response = await apiClient.get(`/article/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching article:', error)
    }
  },
  async createArticle({ commit }, article) {
    try {
      const response = await apiClient.post('/article', article)
      commit('addArticle', response.data)
    } catch (error) {
      console.error('Error creating article:', error)
    }
  },
  async updateArticle({ commit }, { id, updatedArticle }) {
    try {
      const response = await apiClient.patch(`/article/${id}`, updatedArticle)
      commit('updateArticle', { id, updatedArticle: response.data })
    } catch (error) {
      console.error('Error updating article:', error)
    }
  }
}

const getters = {
  allArticles: (state) => state.articles
}

export default {
  state,
  mutations,
  actions,
  getters
}
