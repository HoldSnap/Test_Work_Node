<template>
  <v-form @submit.prevent="submitComment">
    <v-textarea
      v-model="commentText"
      label="Добавить или редактировать комментарий"
      required
    ></v-textarea>
    <v-btn type="submit" color="primary">{{ isEdit ? 'Обновить комментарий' : 'Добавить комментарий' }}</v-btn>
  </v-form>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    articleId: Number,
    comment: Object, 
  },
  setup(props, { emit }) {
    const store = useStore();
    const commentText = ref('');

    watch(
      () => props.comment,
      (newComment) => {
        if (newComment) {
          commentText.value = newComment.text;
        }
      },
      { immediate: true } 
    );

    const isEdit = computed(() => !!props.comment); 

    const submitComment = async () => {
      if (commentText.value.trim()) {
        if (isEdit.value) {
          await store.dispatch('updateComment', {
            articleId: props.articleId,
            id: props.comment.id,
            updatedComment: { text: commentText.value },
          });
        } else {
          await store.dispatch('createComment', {
            articleId: props.articleId,
            comment: { text: commentText.value },
          });
        }
        commentText.value = ''; 
        emit('commentAdded');
      }
    };

    return {
      commentText,
      submitComment,
      isEdit,
    };
  },
};
</script>
