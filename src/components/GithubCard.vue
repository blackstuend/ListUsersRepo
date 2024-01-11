<script setup lang="ts">
import { Repository } from '../entities/Repository';

defineProps<Repository>();
</script>

<template>
  <div class="p-4 border border-gray-700 rounded">
    <div class="flex justify-between items-center mb-3">
      <h2 class="text-xl font-semibold">{{ title }}</h2>
      <div class="flex">
        <a
          href="#"
          class="flex items-center text-yellow-300 hover:text-yellow-400 mx-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-star h-5 w-5"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.866 12.321l.354-.633.337-.579-2.074-2.233c-.34-.365-.537-.831-.537-1.333
                                             0-.827.428-1.555 1.073-1.928A2.447 2.447 0 0 1 4 .5c.69 0 1.3.281 1.747.736l.327.335.318-.306A2.456
                                             2.456 0 0 1 8 0c.69 0 1.3.281 1.747.736l.327.335.318-.306A2.456 2.456 0 0 1 12 0c.657 0
                                             1.251.269 1.674.7.645.373 1.073 1.101 1.073 1.928 
                                             0 .502-.197.968-.537 1.333l-2.074 2.233.337.579.354.633 2.461.14c.561.032 1
                                             .47 1 1.033 0 .513-.381.936-.88.993l-2.892.331.201 2.863c.046.517-.387.951-.903.951-.117
                                             0-.236-.022-.348-.067l-2.637-1.199-2.637 1.199a.833.833 0 0 1-.348.067c-.516
                                             0-.95-.434-.903-.951l.201-2.863-2.892-.331a1.005 1.005 0 0 
                                             1-.88-.993c0-.563.439-1.001 1-1.033l2.461-.14z"
            />
          </svg>
          <span class="ml-1">{{ starsCount }}</span>
        </a>
        <a
          href="#"
          class="flex items-center text-blue-400 hover:text-blue-500 mx-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-eye h-5 w-5"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 
                                             5.5S16 8 16 8ZM8 12.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z"
            />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />
          </svg>
          <span class="ml-1">{{ watchersCount }}</span>
        </a>
        <a
          href="#"
          class="flex items-center text-green-400 hover:text-green-500 mx-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-git-branch h-5 w-5"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.5 3.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 
                                             0ZM4 3.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0ZM8 
                                             1a2.5 2.5 0 0 1 1.5 4.5H11a1 1 0 0 
                                             1 1 1v1.086c-1.051.21-2 .926-2 
                                             2.414a2.5 2.5 0 0 0 2 2.447v.553a1 1 0 0 
                                             1-1 1H9.5A2.5 2.5 0 0 1 8 
                                             12.09V11a1 1 0 0 1-1-1V8.914c0-1.488.949-2.204 
                                             2-2.414V5a1 1 0 0 1-1-1V2.5h-.5A2.5 2.5 0 0 
                                             1 6 5H4.086a1.505 1.505 0 0 0-.144-.349A2.5 
                                             2.5 0 0 1 4.5 1H8ZM4 5H6A2.5 2.5 0 0 
                                             1 8 6.5V8H4V5Z"
            />
          </svg>
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
