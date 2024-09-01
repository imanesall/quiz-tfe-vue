<template>
  <main class="home-view">
    <div class="text-center">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <button
        class="start-button"
        @click="goToCategorySelection"
      >
        START !
      </button>
    </div>
  </main>
</template>

<script>
export default {
  methods: {
    goToCategorySelection() {
      // Changez la route vers CategorySelection
      this.$router.push({ name: 'CategorySelection' });
    },
  },
};
</script>

<style scoped>

.home-view {
  background-color: #0A3443;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}


.logo {
  width: 300px; 
  height: auto;
  margin-bottom: 2rem;
}

/* Style pour le bouton */
.start-button {
  border: 2px solid #FFE18D;
  color: #FFE18D;
  background-color: transparent;
  padding: 1rem 2rem;
  font-size: 1.25rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
}

.start-button:hover {
  background-color: #FFE18D;
  color: #0A3443;
}
</style>
