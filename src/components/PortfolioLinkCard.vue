<script setup>
import { ref, defineProps } from "vue";

defineProps({
  image: String,
  title: String,
  description: String,
  link: String,
});
</script>

<template>
  <div class="w-full border border-gray-200 rounded-lg min-h-[350px]">
    <div class="max-h-[250px] overflow-hidden">
      <img :src="image" alt="alt-image" class="w-full rounded-lg" />
    </div>
    <div class="p-5 space-y-2">
      <div>
        <h1 class="text-xl font-bold text-[#009efa] text-center">
          {{ title }}
        </h1>
      </div>
      <div><hr class="my-2" /></div>
      <div>
        <p class="text-white">
          {{ description }}
        </p>
      </div>
      <div>
        <a :href="link" target="_blank">
          <button
            class="bg-[#009efa] min-w-full rounded-xl font-bold uppercase min-h-[50px]"
          >
            Go to Portfolio
          </button></a
        >
      </div>
    </div>
  </div>
</template>
