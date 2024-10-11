<template>
    <v-form @submit.prevent="submitComment">
      <v-textarea v-model="commentText" label="Добавить комментарий" required></v-textarea>
      <v-btn type="submit" color="primary">Добавить комментарий</v-btn>
    </v-form>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    props: ['articleId'],
    setup(props, { emit }) {
      const store = useStore();
      const commentText = ref('');
  
      const submitComment = async () => {
        if (commentText.value.trim()) {
          await store.dispatch('createComment', {
            articleId: props.articleId,
            comment: { text: commentText.value }
          });
          commentText.value = ''; 
          emit('commentAdded');
        }
      };
  
      return {
        commentText,
        submitComment,
      };
    },
  };
  </script>
  