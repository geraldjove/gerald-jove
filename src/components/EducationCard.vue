<script setup>
import { defineProps } from "vue";

defineProps({
  edu: Object,
});
</script>

<template>
  <div class="border border-white p-5 rounded-xl grid sm:grid-cols-2">
    <div>
      <h3 class="font-bold"># {{ edu.id }}</h3>
      <div
        class="bg-[#009efa] w-[30px] sm:w-[30px] sm:h-[5px] h-[5px] mb-5"
        v-motion
        :initial="{ opacity: 0, x: 100, scale: 1 }"
        :visible-once="{ opacity: 1, x: 0, scale: 1 }"
        :delay="200"
        :duration="1200"
      ></div>
      <h1 class="sm:text-[2rem] font-bold text-[#009efa]">
        {{ edu.course }}
      </h1>
      <h3 class="sm:text-[1.5rem] font-bold italic">
        {{ edu.institute }} - {{ edu.location }}
      </h3>
      <h3 class="sm:text-[1rem] font-bold mb-4">{{ edu.date }}</h3>
    </div>
    <div class="flex sm:justify-end justify-center">
      <img :src="edu.logo" alt="logo-edu" class="rounded-xl" />
    </div>
  </div>
</template>
