import { createRouter, createWebHistory } from 'vue-router';
import ArticleList from '@/components/article/ArticleList.vue';

const routes = [
  {
    path: '/',
    name: 'articles',
    component: ArticleList
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
