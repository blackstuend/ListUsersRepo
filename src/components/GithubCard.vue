<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Repository } from '../entities/Repository';

defineProps<Repository>();
</script>

<template>
  <div class="p-4 border border-gray-700 rounded h-[120px]">
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
    <p class="mb-2 truncate">
      {{ description }}
    </p>
    <div class="text-gray-400 text-sm">
      {{ language }}
    </div>
  </div>
</template>
