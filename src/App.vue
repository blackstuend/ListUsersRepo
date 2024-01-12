<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import throttle from 'lodash/throttle';
import { Icon } from '@iconify/vue';
import { Repository } from './entities/Repository';

import GithubCard from './components/GithubCard.vue';
import { getRepositories } from './apis';

const username = import.meta.env.VITE_USERNAME;

const topVirtualBoxRef = ref<HTMLElement | null>(null);
const bottomVirtualBoxRef = ref<HTMLElement | null>(null);

const repositories = ref<Repository[]>([]);
const page = ref<number>(1);
const hasNextPage = ref<boolean>(false);
const repositoryList = ref<Repository[]>([]);

async function getRepositoryData() {
  try {
    const result = await getRepositories({
      username,
      perPage: 10,
      page: page.value,
    });

    repositories.value.push(...result.repos);
    repositoryList.value.push(...result.repos);

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

const handleSetVirtualBoxHeight = () => {
  const { scrollTop } = document.documentElement;

  const maxCardLength = 30;
  const headerHeight = 100;
  const cardHeight = 120;

  const startIndex = Math.max(
    Math.floor((scrollTop - headerHeight) / cardHeight),
    0,
  );

  const endIndex = Math.min(
    startIndex + maxCardLength,
    repositories.value.length,
  );

  const topVirtualBoxHeight = startIndex * cardHeight;
  const bottomVirtualBoxHeight =
    (repositories.value.length - endIndex) * cardHeight;

  topVirtualBoxRef.value!.style.height = `${topVirtualBoxHeight}px`;
  bottomVirtualBoxRef.value!.style.height = `${bottomVirtualBoxHeight}px`;

  repositoryList.value = repositories.value.slice(startIndex, endIndex);
};

const handleGetNextPageRepositoryData = throttle(() => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (!hasNextPage.value) return;

  if (scrollTop + clientHeight >= scrollHeight - 150) {
    page.value += 1;
    getRepositoryData();
  }
}, 300);

const handleScroll = () => {
  handleGetNextPageRepositoryData();

  handleSetVirtualBoxHeight();
};

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
      <div ref="topVirtualBoxRef"></div>
      <GithubCard
        v-for="repo in repositoryList"
        :key="repo.url"
        :watchers-count="repo.watchersCount"
        :title="repo.title"
        :description="repo.description"
        :url="repo.url"
        :stars-count="repo.starsCount"
        :forks-count="repo.forksCount"
        :language="repo.language"
      ></GithubCard>
      <div ref="bottomVirtualBoxRef"></div>
    </div>
    <Icon
      v-if="hasNextPage"
      icon="mdi:arrow-down"
      class="text-6xl mx-auto text-light-300 animate-bounce mt-5"
    ></Icon>
  </div>
</template>

<style scoped></style>
