<template>
    <v-container>
      <v-list>
        <v-list-item v-for="article in articles" :key="article.id">
          <v-list-item-content>
            <v-list-item-title>{{ article.title }}</v-list-item-title>
            <v-list-item-subtitle>
              <span>Created at: {{ formatDate(article.createdAt) }}</span>
              <span> | </span>
              <span>Updated at: {{ formatDate(article.updatedAt) }}</span>
            </v-list-item-subtitle>
            <v-list-item-text>
              {{ article.content }}
            </v-list-item-text>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
  </template>
  
  <script>
  import { ref, onMounted,computed } from 'vue';
  import { useStore } from 'vuex'; 
  
  export default {
    setup() {
      const store = useStore();
      const articles = computed(() => store.getters.allArticles); 
  
      const fetchArticles = async () => {
        await store.dispatch('fetchArticles'); 
      };
  
      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
      };
  
      onMounted(() => {
        fetchArticles();
      });
  
      return {
        articles,
        formatDate,
      };
    },
  };
  </script>
  