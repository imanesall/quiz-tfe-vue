<template>
  <main class="flex h-screen items-center justify-center bg-custom-blue">
    <!-- quiz container -->
    <div class="bg-custom-dark-blue flex-none container shadow-lg rounded-lg px-12 py-6 relative">
      <!-- score container -->
      <div class="text-right text-white">
        <p class="text-sm leading-3">Score</p>
        <p class="font-bold">{{ score }}</p>
      </div>

      <!-- timer container -->
      <div class="bg-custom-blue shadow-lg p-1 rounded-full w-full h-5 mt-4">
        <div 
          class="bg-custom-light-blue rounded-full h-full"
          :style="{ width: timer + '%' }"
        ></div>
      </div>

      <!-- question container -->
      <div class="question-container rounded-lg p-2 neumorph-1 text-center font-bold text-white mt-8">
        <div class="bg-custom-dark-blue p-5">
          {{ currentQuestion.question }}
        </div>
      </div>

      <!-- options container -->
      <div class="mt-8" v-if="currentQuestion.choices.length">
        <!-- option container -->
        <div v-for="(choice, index) in currentQuestion.choices" :key="index">
          <div class="neumorph-1 option-default bg-custom-blue p-2 rounded-lg mb-3 relative transition-transform transform hover:scale-105 hover:shadow-lg"
            :ref="(el) => optionChosen(el, index)"
            @click="onOptionClicked(choice, index)"
          >
            <div class="bg-custom-light-blue p-1 transform rotate-45 rounded-md h-10 w-10 text-white font-bold absolute right-0 top-0 shadow-md">
              <p class="transform -rotate-45">+1</p>
            </div>
            <div class="rounded-lg font-bold flex p-2">
              <!-- option ID -->
              <div class="p-3 rounded-lg">{{ index + 1 }}</div>
              <!-- option name -->
              <div class="flex items-center pl-6">{{ choice }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- progress indicator container -->
      <div class="mt-8 text-center">
        <div class="h-1 w-12 bg-white rounded-full mx-auto"></div>
        <p class="font-bold text-white">{{ questionCounter }}/{{ questions.length }}</p>
      </div>

      <!-- Quit button inside quiz container -->
      <button @click="onQuitClicked" class="absolute bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        Quit
      </button>
    </div>
  </main>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    // Data
    const canClick = ref(true);
    const timer = ref(100);
    const endOfQuiz = ref(false);
    const questionCounter = ref(0);
    const score = ref(0);
    const currentQuestion = ref({
      question: '',
      answer: 1,
      choices: []
    });
    const questions = ref([]); // Contient les questions et les réponses
    const itemsRef = ref([]); // Définir itemsRef comme un tableau de ref pour stocker les éléments DOM
    const router = useRouter();
    const route = useRoute();
    let timerInterval = null; // Stocker l'ID de l'intervalle du minuteur

    // Décoder les entités HTML dans les chaînes de question et de réponse
    const decodeHtmlEntities = (text) => {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = text;
      return textarea.value;
    };

    // Récupérer les questions depuis le serveur
    const fetchQuestionsFromServer = async () => {
      try {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${route.params.category}&difficulty=${route.params.difficulty}&type=${route.params.type}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.results && Array.isArray(data.results) && data.results.length > 0) {
          const newQuestions = data.results.map((serverQuestion) => {
            const arrangedQuestion = {
              question: decodeHtmlEntities(serverQuestion.question),
              choices: serverQuestion.incorrect_answers.map(decodeHtmlEntities),
              answer: 0
            };

            const correctAnswer = decodeHtmlEntities(serverQuestion.correct_answer);
            arrangedQuestion.answer = Math.floor(Math.random() * 4 + 1);
            arrangedQuestion.choices.splice(arrangedQuestion.answer - 1, 0, correctAnswer);

            return arrangedQuestion;
          });

          questions.value = newQuestions;
          loadQuestion();
        } else {
          console.error('No questions retrieved or empty response.');
          endOfQuiz.value = true;
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        endOfQuiz.value = true; // Mettre fin au quiz en cas d'erreur
      }
    };

    // Charger une nouvelle question
    const loadQuestion = () => {
      if (timerInterval) {
        clearInterval(timerInterval); // Effacer l'intervalle de minuteur précédent
      }
      canClick.value = true;
      if (questions.value.length > questionCounter.value) {
        timer.value = 100;
        currentQuestion.value = questions.value[questionCounter.value];
        questionCounter.value++;
        countDownTimer(); // Démarrer un nouveau minuteur
      } else {
        onQuizEnd();
      }
    };

    // Redémarrer le quiz
    const onQuizStart = () => {
      score.value = 0;
      questionCounter.value = 0;
      timer.value = 100;
      endOfQuiz.value = false;
      fetchQuestionsFromServer();
    };

    // Gérer le clic sur une option
    const onOptionClicked = (choice, index) => {
      if (canClick.value) {
        const divContainer = itemsRef.value[index];
        if (divContainer) {
          const optionID = index + 1;
          if (currentQuestion.value.answer === optionID) {
            score.value += 1;
            divContainer.classList.add('option-correct');
            divContainer.classList.remove('option-default');
          } else {
            divContainer.classList.add('option-wrong');
            divContainer.classList.remove('option-default');
          }
          canClick.value = false; // Désactiver les clics supplémentaires
          // Effacer la sélection après un délai
          setTimeout(() => {
            clearSelected();
          }, 600); // Délai pour montrer le retour d'information
        } else {
          console.error('Élément non trouvé pour l\'index:', index);
        }
      }
    };

    // Attribution de la ref pour l'option choisie
    const optionChosen = (el, index) => {
      itemsRef.value[index] = el;
    };

    // Effacer la sélection et charger la question suivante
    const clearSelected = () => {
      Object.values(itemsRef.value).forEach(div => {
        div.classList.remove('option-correct', 'option-wrong');
        div.classList.add('option-default');
      });
      itemsRef.value = [];
      loadQuestion();
    };

    // Compte à rebours du minuteur
    const countDownTimer = () => {
      timerInterval = setInterval(() => {
        if (timer.value > 0 && !endOfQuiz.value) {
          timer.value--;
        } else {
          clearInterval(timerInterval); // Effacer l'intervalle lorsque le minuteur atteint zéro ou que le quiz se termine
          if (questionCounter.value < questions.value.length) {
            loadQuestion();
          } else {
            onQuizEnd();
          }
        }
      }, 150);
    };

    // Fin du quiz
    const onQuizEnd = () => {
      endOfQuiz.value = true;
      const maxScore = 10; // Supposons que le quiz a 10 questions
      score.value = Math.min(score.value, maxScore);
      const questionsSerialized = JSON.stringify(questions.value);

      console.log("Redirecting to QuizEndView with query:", { score: score.value, questions: questionsSerialized });

      // Rediriger vers la page de fin de quiz avec les paramètres requis
      router.push({
        name: 'QuizEndView',
        query: {
          score: score.value,
          questions: questionsSerialized,
          category: route.params.category,
          difficulty: route.params.difficulty,
          type: route.params.type
        }
      });
    };

    // Redémarrer le quiz
    const retryQuiz = () => {
      if (route.query.category && route.query.difficulty && route.query.type) {
        router.push({
          name: 'Quiz',
          query: {
            category: route.query.category,
            difficulty: route.query.difficulty,
            type: route.query.type
          }
        });
      } else {
        console.error('Les paramètres de quiz sont manquants pour redémarrer.');
      }
    };

    // Navigation vers la page d'accueil
    const navigateHome = () => {
      router.push({ name: 'Home' });
    };

    // Quitter le jeu
    const onQuitClicked = () => {
      router.push({ name: 'Home' });
    };

    // Configuration initiale
    onMounted(() => {
      onQuizStart();
    });

    return {
      canClick,
      timer,
      endOfQuiz,
      questionCounter,
      score,
      currentQuestion,
      questions,
      loadQuestion,
      optionChosen,
      clearSelected,
      onOptionClicked,
      countDownTimer,
      fetchQuestionsFromServer,
      onQuizEnd,
      onQuizStart,
      retryQuiz,
      navigateHome,
      onQuitClicked
    };
  }
};
</script>

<style scoped>
/*.neumorph-1 {
  box-shadow: 6px 6px 18px rgba(0, 0, 0, 0.09), -6px -6px 18px #ffffff;
}*/
.container {
  max-width: 600px;
  position: relative; /* Ajouté pour le positionnement du bouton Quit */
}
.option-default {
  background: #f0f0f0;
}
.option-correct {
  background: #d4edda;
  border: 1px solid #c3e6cb;
}
.option-wrong {
  background: #f8d7da;
  border: 1px solid #f5c6cb;
}
.bg-custom-blue {
  background-color: #0A3443;
}
.bg-custom-dark-blue {
  background-color: #104355;
}

.bg-custom-light-blue {
  background-color: #54D1FA;
}

.question-container {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

/* Conteneur des options */
.mt-8 {
  margin-top: 1rem; /* Modifié : Réduit l'espace au-dessus des options */
}
</style>
