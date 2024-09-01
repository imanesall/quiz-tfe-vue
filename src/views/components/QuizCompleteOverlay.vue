<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
    <div class="overlay-content bg-custom-dark-blue p-4 text-center text-white max-w-lg mx-4 sm:mx-auto relative">
      <!-- Close Button -->
      <button class="absolute top-2 right-2 text-white text-2xl" @click="$emit('close')">
        &times;
      </button>
      <p class="font-bold text-2xl mb-4">Quiz Feedback</p>
      <!-- Feedback sur les réponses -->
      <div v-if="questions.length" class="feedback-container max-h-[60vh] overflow-y-auto">
        <ul>
          <li v-for="(question, index) in questions" :key="index" class="my-2">
            <p class="font-semibold">{{ index + 1 }}. {{ question.question }}</p>
            <p>Correct Answer: {{ question.choices[question.answer - 1] }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    questions: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.overlay-content {
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  border-radius: 8px;
  position: relative; 
}

.feedback-container {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow-y: auto;
}

.feedback-container ul {
  list-style-type: none;
  padding: 0;
}

.feedback-container li {
  margin-bottom: 1rem;
}

.feedback-container p {
  margin: 0;
}

.feedback-container h3 {
  margin-top: 0;
}

button {
  background: transparent;
  border: none;
  cursor: pointer;
}

.bg-custom-dark-blue {
  background-color: #104355;
}
</style>
