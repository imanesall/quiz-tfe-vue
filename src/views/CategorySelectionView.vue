<template>
    <div class="category-selection-view">
      <h1 class="title">Which category?</h1>
      <div class="cards-container">
        <!-- Exemple de carte de catégorie -->
        <div
          v-for="category in categories"
          :key="category.id"
          class="card"
          @click="selectCategory(category.id)"
        >
          <p class="card-title">{{ category.name }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const categories = ref([
        { id: 9, name: 'General knowledge' },
        { id: 17, name: 'Science & Nature' },
        { id: 19, name: 'Mathematics' },
        { id: 22, name: 'Geography' },
        { id: 23, name: 'History' },
        { id: 25, name: 'Arts' },
      ]);
      const router = useRouter();
  
      const selectCategory = (id) => {
        router.push({ name: 'DifficultySelection', params: { category: id } });
      };
  
      return {
        categories,
        selectCategory
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
  
  .category-selection-view {
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
    padding: 0 1rem; /* Ajoute un peu de marge horizontale */
  max-width: 1200px; /* Limite la largeur du conteneur des cartes */
  width: 100%;
  }
  
  .card {
    background-color: rgba(255, 255, 255, 0.1); 
    border: 2px solid #FFE18D; 
    border-radius: 0.5rem;
    padding: 1rem;
    width: calc(25% - 2rem); 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s ease;
  }
  
  .card-title {
    color: #FFE18D; 
    font-size: 1.25rem;
    font-weight: bold;
  }
  
  .card:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  /* Responsive design */
  @media (min-width: 1024px) {
  .card {
    width: calc(33% - 2rem); /* Quatre cartes par ligne */
  }
}

/* Disposition pour écrans moyens (min-width: 471px) */
@media (min-width: 471px) and (max-width: 1024px) {
  .card {
    width: calc(50% - 1rem); /* Deux cartes par ligne */
  }
}

/* Disposition pour écrans très petits */
@media (max-width: 470px) {
  .card {
    width: calc(100% - 2rem); /* Une carte par ligne avec espace latéral */
    margin: 0 auto; /* Centre la carte horizontalement */
  }
} </style>