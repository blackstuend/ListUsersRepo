<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Repository } from './entities/Repository';

import GithubCard from './components/GithubCard.vue';
import { getRepositories } from './apis';

const username = import.meta.env.VITE_USERNAME;

const repositories = ref<Repository[]>([]);
const loading = ref<boolean>(false)



onMounted(async () => {
  try {
    loading.value = true
    repositories.value = await getRepositories({
      username,
      perPage: 10,
    });
  } catch (error) {
    alert('Error fetching repositories')
    console.error(error);
  }
});
</script>

<template>
  <div class="max-w-4xl mx-auto py-12">
    <header class="border-b border-gray-700 pb-4">
      <h1 class="text-2xl font-semibold">GitHub {{ username }}</h1>
    </header>
    <div class="mt-4 flex flex-col gap-4">
      <GithubCard
        v-for="repo in repositories"
        :key="repo.url"
        :watchers-count="repo.watchersCount"
        :title="repo.title"
        :description="repo.description"
        :url="repo.url"
        :stars-count="repo.starsCount"
        :forks-count="repo.forksCount"
        :language="repo.language"
      ></GithubCard>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
