<template>
  <v-container>
    <v-btn @click="goToAddArticle" color="primary">Добавить статью</v-btn>
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

          <v-btn @click="goToEditArticle(article.id)" color="secondary">Редактировать</v-btn>
          <v-btn @click="deleteArticle(article.id)" color="red">Удалить</v-btn>
          <v-btn @click="showComments(article.id)" color="primary">Показать комментарии</v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex'; 
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const articles = computed(() => store.getters.allArticles); 

    const fetchArticles = async () => {
      await store.dispatch('fetchArticles');
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const goToAddArticle = () => {
      router.push('/article/new'); 
    };

    const goToEditArticle = (id) => {
      router.push(`/article/${id}`); 
    };

    const deleteArticle = async (id) => {
      await store.dispatch('deleteArticle', id);
      fetchArticles();
    };

    const showComments = (articleId) => {
      router.push(`/article/${articleId}/comments`); 
    };

    onMounted(() => {
      fetchArticles();
    });

    return {
      articles,
      formatDate,
      goToAddArticle,
      goToEditArticle,
      deleteArticle,
      showComments,
    };
  },
};
</script>
