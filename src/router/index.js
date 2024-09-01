import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CategorySelectionView from '../views/CategorySelectionView.vue';
import DifficultySelectionView from '../views/DifficultySelectionView.vue';
import TypeSelectionView from '../views/TypeSelectionView.vue';
import QuizView from '../views/QuizView.vue';
import QuizEndView from '../views/QuizEndView.vue';
import QuizCompleteOverlay from '../views/components/QuizCompleteOverlay.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/category-selection',
    name: 'CategorySelection',
    component: CategorySelectionView
  },
  {
    path: '/difficulty-selection/:category',
    name: 'DifficultySelection',
    component: DifficultySelectionView,
    props: route => ({ category: route.params.category })
  },
  {
    path: '/type-selection/:category/:difficulty',
    name: 'TypeSelection',
    component: TypeSelectionView,
    props: route => ({
      category: route.params.category,
      difficulty: route.params.difficulty
    })
  },
  {
    path: '/quiz/:category/:difficulty/:type',
    name: 'Quiz',
    component: QuizView,
    props: route => ({
      category: route.params.category,
      difficulty: route.params.difficulty,
      type: route.params.type
    })
  },
  {
    path: '/quiz-end',
    name: 'QuizEndView',
    component: QuizEndView,
    props: route => ({
      score: route.query.score || 0,
      questions: JSON.parse(route.query.questions || '[]')
    })
  },
  {
    path: '/quiz-overlay',
    name: 'QuizCompleteOverlay',
    component: QuizCompleteOverlay,
    props: route => ({
      score: Number(route.query.score) || 0,
      questions: JSON.parse(route.query.questions || '[]')
    })
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
