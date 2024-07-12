<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <nav class="bg-[#1a1a1a] sm:absolute min-w-[100vw]">
    <div
      class="max-w-screen-xl flex flex-wrap justify-between items-center mx-auto"
    >
      <a to="/" class="text-white font-bold text-3xl"
        >GJ<span class="text-[#009efa]">.</span></a
      >
      <ul class="flex">
        <li
          class="p-4 font-medium hover:bg-[#009efa] hover:rounded-b-lg text-white"
        >
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li
          class="p-4 font-medium hover:bg-[#009efa] hover:rounded-b-lg text-white"
        >
          <RouterLink to="/about">About</RouterLink>
        </li>
        <li
          class="p-4 font-medium hover:bg-[#009efa] hover:rounded-b-lg text-white"
        >
          <RouterLink to="/works">Works</RouterLink>
        </li>
        <li
          class="p-4 font-medium hover:bg-[#009efa] hover:rounded-b-lg text-white"
        >
          <RouterLink to="/contact">Contact</RouterLink>
        </li>
      </ul>
      <button class="text-white font-bold border border-white p-3 rounded-xl">
        <a
          href="https://drive.google.com/uc?export=download&id=19FSRCQP-5lCsknrKTliY38CvT2cpDGPFx63q3KuKCgs"
          download="gerald-jove-web-developer-resume"
          target="_blank"
          >Download CV</a
        >
        <i class="pi pi-download ms-2" style="font-size: 1.25rem"></i>
      </button>
    </div>
  </nav>
</template>
