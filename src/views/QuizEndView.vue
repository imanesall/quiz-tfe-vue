<template>
  <div class="flex flex-col items-center justify-center h-screen bg-custom-blue">
    <!-- Logo -->
    <div class="mb-8">
      <img src="@/assets/logo.png" alt="Logo" class="custom-logo-size" />
    </div>

    <!-- Score -->
    <p class="text-3xl text-white font-bold mb-8">Score: {{ score }} / 10</p>

    <!-- Buttons -->
    <div class="flex space-x-4 mb-8">
      <button @click="navigateHome" class="btn-home">Home</button>
      <button @click="retryQuiz" class="btn-retry">Retry</button>
      <button @click="showOverlay" class="btn-correction">Feedback</button>
    </div>

    <!-- Modal Component -->
    <QuizCompleteOverlay
      :visible="showModal"
      :questions="questions"
      :score="score"
      @close="closeOverlay"
    />
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import QuizCompleteOverlay from '@/views/components/QuizCompleteOverlay.vue';

export default {
  components: {
    QuizCompleteOverlay
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const showModal = ref(false);
    const score = ref(Number(route.query.score) || 0);
    const questions = ref(JSON.parse(route.query.questions || '[]'));

    watch(() => route.query.score, (newScore) => {
      score.value = Number(newScore);
    });

    watch(() => route.query.questions, (newQuestions) => {
      questions.value = JSON.parse(newQuestions || '[]');
    });

    const showOverlay = () => {
      showModal.value = true;
    };

    const closeOverlay = () => {
      showModal.value = false;
    };

    const retryQuiz = () => {
      const { category, difficulty, type } = route.query;

      // Vérifiez si les paramètres requis sont présents
      if (category && difficulty && type) {
        router.push({
          name: 'Quiz',
          params: { // Utilisez `params` pour les paramètres de route
            category,
            difficulty,
            type
          }
        });
      } else {
        console.error('Les paramètres de quiz sont manquants pour redémarrer.');
        // Rediriger vers la page d'accueil si les paramètres sont manquants
        router.push({ name: 'Home' });
      }
    };

    const navigateHome = () => {
      router.push({ name: 'Home' });
    };

    return {
      score,
      questions,
      showModal,
      showOverlay,
      closeOverlay,
      retryQuiz,
      navigateHome
    };
  }
};
</script>

<style scoped>
.custom-logo-size {
  width: 250px;
  height: 250px;
}

.btn-home {
  @apply text-white py-2 px-4 rounded-lg shadow-lg transition border-2;
  border-color: #54D1FA; 
  background-color: transparent; 
  color: #54D1FA;
}

.btn-home:hover {
  background-color: #54D1FA; 
  color: white; 
}

.btn-retry {
  @apply text-white py-2 px-4 rounded-lg shadow-lg transition border-2;
  border-color: #FF66C4; 
  background-color: transparent; 
  color: #FF66C4;
}

.btn-retry:hover {
  background-color: #FF66C4; 
  color: white; 
}

.btn-correction {
  @apply text-white py-2 px-4 rounded-lg shadow-lg transition border-2;
  border-color: #FFE18D; 
  background-color: transparent; 
  color: #FFE18D;
}

.btn-correction:hover {
  background-color: #FFE18D; 
  color: white; 
}

.bg-custom-blue {
  background-color: #0A3443;
}
</style>
