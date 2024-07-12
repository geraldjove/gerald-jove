<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <nav class="bg-[#1a1a1a] sm:absolute min-w-[100vw]">
    <div
      class="max-w-screen-xl flex flex-wrap justify-between items-center mx-auto"
    >
      <RouterLink to="/" class="text-white font-bold text-3xl"
        >GJ<span class="text-[#009efa]">.</span></RouterLink
      >
      <ul class="flex">
        <RouterLink to="/"
          ><li
            class="p-4 font-medium hover:bg-[#009efa] hover:rounded-b-lg text-white"
          >
            Home
          </li></RouterLink
        >
        <RouterLink to="/about"
          ><li
            class="p-4 font-medium hover:bg-[#009efa] hover:rounded-b-lg text-white"
          >
            About
          </li></RouterLink
        >
        <RouterLink to="/works"
          ><li
            class="p-4 font-medium hover:bg-[#009efa] hover:rounded-b-lg text-white"
          >
            Works
          </li></RouterLink
        >
        <RouterLink to="/contact"
          ><li
            class="p-4 font-medium hover:bg-[#009efa] hover:rounded-b-lg text-white"
          >
            Contact
          </li></RouterLink
        >
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
