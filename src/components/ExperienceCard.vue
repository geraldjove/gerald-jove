<script setup>
import { defineProps } from "vue";

defineProps({
  exp: Object,
});
</script>

<template>
  <div class="border border-white p-5 rounded-xl">
    <h3 class="font-bold"># {{ exp.id }}</h3>
    <div
      class="bg-[#009efa] w-[30px] sm:w-[30px] sm:h-[5px] h-[5px] mb-5"
      v-motion
      :initial="{ opacity: 0, x: 100, scale: 1 }"
      :visible-once="{ opacity: 1, x: 0, scale: 1 }"
      :delay="200"
      :duration="1200"
    ></div>
    <h1 class="sm:text-[2rem] font-bold text-[#009efa]">
      {{ exp.title }}
    </h1>
    <h3 class="sm:text-[1.5rem] font-bold italic">
      {{ exp.company }} - {{ exp.location }}
    </h3>
    <h3 class="sm:text-[1rem] font-bold mb-4">{{ exp.date }}</h3>
    <ul class="ml-10">
      <li
        v-for="responsibility in exp.responsibilities"
        :key="responsibility.id"
        class="list-disc"
      >
        {{ responsibility }}
      </li>
    </ul>
  </div>
</template>
