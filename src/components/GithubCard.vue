<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { Repository } from '../entities/Repository';

defineProps<Repository>();

const cardRef = ref<HTMLElement | null>(null);
const backupHTML = ref<string>('');
onMounted(() => {
  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry.isIntersecting) {
        // get entires' height and set it to the element
        // eslint-disable-next-line no-param-reassign
        (entry.target as HTMLElement).style.height =
          `${entry.boundingClientRect.height}px`;

        backupHTML.value = entry.target.innerHTML;
        // eslint-disable-next-line no-param-reassign
        entry.target.innerHTML = '';
        return;
      }

      // cancel the manual height
      // eslint-disable-next-line no-param-reassign
      (entry.target as HTMLElement).style.height = '';

      // eslint-disable-next-line no-param-reassign
      entry.target.innerHTML = backupHTML.value || entry.target.innerHTML;
    },
    {
      threshold: [0, 1],
      rootMargin: '0px 0px 100px 0px',
    },
  );

  intersectionObserver.observe(cardRef.value!);
});
</script>

<template>
  <div ref="cardRef" class="p-4 border border-gray-700 rounded">
    <div class="flex justify-between items-center mb-3">
      <a
        class="text-xl font-semibold hover:underline"
        target="_blank"
        :href="url"
        >{{ title }}</a
      >
      <div class="flex">
        <a
          href="#"
          class="flex items-center text-yellow-300 hover:text-yellow-400 mx-2"
        >
          <Icon icon="mdi:star" />
          <span class="ml-1">{{ starsCount }}</span>
        </a>
        <a
          href="#"
          class="flex items-center text-blue-400 hover:text-blue-500 mx-2"
        >
          <Icon icon="mdi:eye" />
          <span class="ml-1">{{ watchersCount }}</span>
        </a>
        <a
          href="#"
          class="flex items-center text-green-400 hover:text-green-500 mx-2"
        >
          <Icon icon="mdi:link" />
          <span class="ml-1">1</span>
        </a>
      </div>
    </div>
    <p class="mb-2">
      {{ description }}
    </p>
    <div class="text-gray-400 text-sm">
      {{ language }}
    </div>
  </div>
</template>
