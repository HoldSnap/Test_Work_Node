import { createRouter, createWebHistory } from 'vue-router';
import ArticleList from '@/components/article/ArticleList.vue';
import ArticleForm from '@/components/article/ArticleForm.vue'; 
import CommentFilter from '@/components/comment/CommentFilter.vue';
import CommentList from '@/components/comment/CommentList.vue';

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
  {
    path: '/article/:articleId/comments',
    component: CommentList
  },
  {
    path: '/comments/filter',
    component: CommentFilter,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
