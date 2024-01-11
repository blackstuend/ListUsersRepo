<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import throttle from 'lodash/throttle';
import { Icon } from '@iconify/vue';
import { Repository } from './entities/Repository';

import GithubCard from './components/GithubCard.vue';
import { getRepositories } from './apis';

const username = import.meta.env.VITE_USERNAME;

const repositories = ref<Repository[]>([]);
const page = ref<number>(1);
const hasNextPage = ref<boolean>(false);

async function getRepositoryData() {
  try {
    const result = await getRepositories({
      username,
      perPage: 10,
      page: page.value,
    });

    repositories.value.push(...result.repos);

    if (result.hasNextPage) {
      hasNextPage.value = true;
    } else {
      hasNextPage.value = false;
    }
  } catch (error) {
    alert('Error fetching repositories');
    console.error(error);
  }
}

const handleScroll = throttle(() => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (!hasNextPage.value) return;

  if (scrollTop + clientHeight >= scrollHeight - 150) {
    page.value += 1;
    getRepositoryData();
  }
}, 100);

onMounted(async () => {
  getRepositoryData();

  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
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
    <Icon
      v-if="hasNextPage"
      icon="mdi:arrow-down"
      class="text-6xl mx-auto text-light-300 animate-bounce mt-5"
    ></Icon>
  </div>
</template>

<style scoped></style>
