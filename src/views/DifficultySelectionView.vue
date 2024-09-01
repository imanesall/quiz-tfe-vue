<template>
  <div class="difficulty-selection-view">
    <h1 class="title">What difficulty level ?</h1>
    <div class="cards-container">
      <!-- Cartes de difficulté -->
      <div
        v-for="difficulty in difficulties"
        :key="difficulty.value"
        class="card"
        @click="selectDifficulty(difficulty)"
      >
        {{ difficulty.label }}
      </div>
    </div>
    <!-- Bouton Retour -->
    <button
      @click="goBack"
      class="back-button"
    >
      Back
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const difficulties = ref([
      { value: 'easy', label: 'Easy' },
      { value: 'medium', label: 'Medium' },
      { value: 'hard', label: 'Hard' },
    ]);

    const router = useRouter();
    const route = useRoute();

    // Fonction pour sélectionner la difficulté
    const selectDifficulty = (difficulty) => {
      const category = route.params.category;
      router.push({ name: 'TypeSelection', params: { category, difficulty: difficulty.value } });
    };

    // Fonction pour revenir en arrière
    const goBack = () => {
      router.push({ name: 'CategorySelection' });
    };

    return {
      difficulties,
      selectDifficulty,
      goBack
    };
  }
};
</script>

<style scoped>
/* Assure que le body et html occupent toute la hauteur */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.difficulty-selection-view {
  background-color: #0A3443;
  color: #FF66C4;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 0 0 5px rgba(255, 102, 196, 0.7); 
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.card {
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid #FFE18D;
  border-radius: 0.5rem;
  padding: 1rem;
  width: 250px; /* Aligné avec la largeur de la carte dans la page "type" */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  text-align: center;
  color: #FFE18D;
  font-size: 1.25rem; /* Aligné avec la taille de police dans la page "type" */
  font-weight: bold; /* Aligné avec la graisse de police dans la page "type" */
  display: flex;
  align-items: center;
  justify-content: center;
}

.card:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Bouton Retour */
.back-button {
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  border: 2px solid #54D1FA;
  color: #54D1FA;
  border-radius: 0.5rem;
  background-color: transparent;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.back-button:hover {
  background-color: #54D1FA;
  color: #0A3443;
}

/* Responsive design */
@media (max-width: 768px) {
  .card {
    width: calc(50% - 1rem);
  }
}

@media (max-width: 480px) {
  .card {
    width: 100%;
    height: auto;
    font-size: 1rem; /* Réduction de la taille de police pour petits écrans */
  }
}
</style>
