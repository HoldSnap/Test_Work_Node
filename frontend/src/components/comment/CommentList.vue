<template>
  <v-container>
    <v-btn @click="goBack" color="primary">Назад к статьям</v-btn>
    <h3>Комментарии к статье {{ articleTitle }}:</h3>
    <v-list v-if="comments.length">
      <v-list-item v-for="comment in comments" :key="comment.id">
        <v-list-item-content>
          <v-list-item-title>{{ comment.text }}</v-list-item-title>
          <v-list-item-subtitle>
            <span>Created at: {{ formatDate(comment.createdAt) }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn @click="editComment(comment)">Редактировать</v-btn>
          <v-btn @click="deleteComment(comment.id)" color="red">Удалить</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <add-comment-form 
      :articleId="articleId" 
      :comment="currentComment" 
      @commentAdded="onCommentAdded" 
    />
  </v-container>
</template>

<script>
import { onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex'; 
import { useRouter, useRoute } from 'vue-router';
import AddCommentForm from './CommentForm.vue';

export default {
  components: { AddCommentForm },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const articleId = computed(() => route.params.articleId);
    const comments = computed(() => store.getters.allComments);
    const articleTitle = computed(() => {
      const article = store.getters.allArticles.find(a => a.id == articleId.value);
      return article ? article.title : '';
    });

    const currentComment = ref(null);

    const fetchComments = async () => {
      await store.dispatch('fetchComments', articleId.value);
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const goBack = () => {
      router.push('/');
    };

    const editComment = (comment) => {
      currentComment.value = comment; 
    };

    const deleteComment = async (commentId) => {
      await store.dispatch('deleteComment', { articleId: articleId.value, id: commentId });
      fetchComments();
    };

    const onCommentAdded = () => {
      fetchComments();
      currentComment.value = null; 
    };

    onMounted(() => {
      fetchComments();
    });

    return {
      comments,
      formatDate,
      articleId,
      articleTitle,
      goBack,
      editComment,
      deleteComment,
      fetchComments,
      currentComment, 
      onCommentAdded 
    };
  },
};
</script>
