<script setup>
import profilePhoto from "@/assets/img/profile-photo.jpg";
</script>
<template>
  <section class="min-h-[100vh] bg-[#1a1a1a]" id="hero">
    <div class="grid sm:grid-cols-2 max-w-screen-xl mx-auto p-4">
      <div
        class="sm:min-h-screen flex flex-col justify-center text-white mx-auto mb-5"
      >
        <h3>
          <span class="text-cyan-500 italic">function </span>
          <span class="text-green-500">greetings</span
          ><span class="text-[#FB2458]">()</span>{
        </h3>
        <h3><span class="text-red-500">return</span> { '</h3>
        <h1 class="sm:text-7xl font-bold uppercase">Hello!</h1>
        <h1 class="sm:text-7xl text-5xl font-bold uppercase">
          I am
          <span class="text-[#009efa] font-monoton font-medium">Gerald</span>,
        </h1>
        <h1 class="text-3xl font-medium">
          <span class="bg-[#009efa] px-4 leading-normal italic"
            >Web Developer • Multimedia Artist</span
          >
        </h1>
        <h3 class="mb-5">'};</h3>
        <button
          class="bg-[#009efa] max-w-[150px] p-2 rounded-full font-bold text-black flex justify-center items-center"
        >
          <a href="#contact">Get in Touch</a>
          <i class="pi pi-arrow-circle-right ms-2"></i>
        </button>
      </div>
      <div class="flex flex-col justify-center">
        <img
          :src="profilePhoto"
          class="rounded-full sm:hard-shadow img-border"
        />
      </div>
    </div>
  </section>
</template>
