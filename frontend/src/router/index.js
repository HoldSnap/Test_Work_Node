import { createRouter, createWebHistory } from 'vue-router';
import ArticleList from '@/components/article/ArticleList.vue';
import ArticleForm from '@/components/article/ArticleForm.vue'; 

const routes = [
  {
    path: '/',
    name: 'articles',
    component: ArticleList,
  },
  {
    path: '/article/new',
    name: 'new-article',
    component: ArticleForm,
  },
  {
    path: '/article/:id',
    name: 'edit-article',
    component: ArticleForm, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
