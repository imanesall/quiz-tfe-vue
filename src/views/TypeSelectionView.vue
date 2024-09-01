<template>
    <div class="type-selection-view">
      <h1 class="title">What type of quiz?</h1>
      <div class="cards-container">
        <!-- Cartes de type -->
        <div
          v-for="type in types"
          :key="type.value"
          class="card"
          @click="selectType(type)"
        >
          {{ type.label }}
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
      const types = ref([
        { value: 'multiple', label: 'Multiple choice' },
        { value: 'boolean', label: 'True/False' },
      ]);
  
      const router = useRouter();
      const route = useRoute();
  
      // Fonction pour sélectionner le type
      const selectType = (type) => {
        const { category, difficulty } = route.params;
        router.push({ name: 'Quiz', params: { category, difficulty, type: type.value } });
      };
  
      // Fonction pour revenir en arrière
      const goBack = () => {
        const { category } = route.params;
        router.push({ name: 'DifficultySelection', params: { category } });
      };
  
      return {
        types,
        selectType,
        goBack
      };
    }
  };
  </script>
  
  <style scoped>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  
  .type-selection-view {
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
    text-shadow: 0 0 5px rgba(255, 102, 196, 0.7); /* Effet néon léger */
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
  width: 250px; /* Largeur fixe pour les grands écrans */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  text-align: center;
  color: #FFE18D; 
  font-size: 1.25rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
  
  .card:hover {
    background-color: rgba(255, 255, 255, 0.2); 
  }
  
  .cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
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
  
  </style>