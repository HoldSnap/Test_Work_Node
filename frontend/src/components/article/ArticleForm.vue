<template>
    <v-container>
      <v-form v-model="valid" ref="form">
        <v-text-field
          v-model="article.title"
          :rules="[rules.required]"
          label="Title"
          required
        ></v-text-field>
  
        <v-textarea
          v-model="article.content"
          :rules="[rules.required]"
          label="Content"
          required
        ></v-textarea>
  
        <v-btn @click="submitForm">{{ isEditing ? 'Update Article' : 'Create Article' }}</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex'; 
  import { useRoute, useRouter } from 'vue-router'; 
  
  export default {
    setup() {
      const store = useStore();
      const route = useRoute(); 
      const router = useRouter();
      const valid = ref(false); 
      const article = ref({ title: '', content: '' });
  
      const isEditing = computed(() => route.params.id !== undefined);
  
      const rules = {
        required: (value) => !!value || 'Required.',
      };
  
      const fetchArticle = async () => {
        if (isEditing.value) {
          try {
            const response = await store.dispatch('fetchArticle', route.params.id); 
            article.value = response;
          } catch (error) {
            console.error('Error fetching article:', error);
          }
        }
      };
  
      const submitForm = async () => {
        if (valid.value) {
          try {
            if (isEditing.value) {
              await store.dispatch('updateArticle', { id: route.params.id, ...article.value });
            } else {
              await store.dispatch('createArticle', article.value);
            }
            router.push('/');
          } catch (error) {
            console.error('Error submitting form:', error);
          }
        }
      };
  
      fetchArticle(); 
  
      return {
        valid,
        article,
        isEditing,
        rules,
        submitForm,
      };
    },
  };
  </script>
  