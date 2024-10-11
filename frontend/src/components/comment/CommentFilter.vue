<template>
  <v-container>
    <v-btn @click="goBack" color="primary">Назад к статьям</v-btn>

    <v-form v-model="valid" ref="form" @submit.prevent="fetchComments">
      <v-text-field
        v-model="dateFrom"
        label="Дата начала"
        type="date"
        required
      ></v-text-field>
      
      <v-text-field
        v-model="dateTo"
        label="Дата окончания"
        type="date"
        required
      ></v-text-field>
      
      <v-btn type="submit" color="primary">Поиск комментариев</v-btn>
    </v-form>

    <v-list v-if="comments.length">
      <v-list-item v-for="comment in comments" :key="comment.id">
        <v-list-item-content>
          <v-list-item-title>{{ comment.text }}</v-list-item-title>
          <v-list-item-subtitle>
            <span>Статья: {{ comment.Article.title }}</span>
            <span> | </span>
            <span>Создано: {{ formatDate(comment.createdAt) }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-alert v-if="error" type="error">{{ error }}</v-alert>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const valid = ref(false);
    const dateFrom = ref('');
    const dateTo = ref('');
    const comments = ref([]);
    const error = ref(null);
    const goBack = () => {
      router.push('/');
    };
    const fetchComments = async () => {
      if (dateFrom.value && dateTo.value) {
        try {
          const response = await store.dispatch('fetchCommentsByPeriod', { dateFrom: dateFrom.value, dateTo: dateTo.value });
          comments.value = response; 
          error.value = null; 
        } catch (err) {
          error.value = 'Ошибка при получении комментариев: ' + err.message;
        }
      }
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return {
      valid,
      dateFrom,
      dateTo,
      comments,
      fetchComments,
      formatDate,
      error,
      goBack
    };
  }
};
</script>
