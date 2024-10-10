import { createStore } from 'vuex';
import apiClient from './services/api';

const store = createStore({
    state: {
        articles: [],
    },
    mutations: {
        setArticles(state, articles) {
            state.articles = articles;
        },
    },
    actions: {
        async fetchArticles({ commit }) {
            try {
                const response = await apiClient.get('/articles');
                commit('setArticles', response.data);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        },
    },
    getters: {
        allArticles: (state) => state.articles,
    },
});

export default store;
