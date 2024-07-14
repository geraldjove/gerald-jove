<script setup>
import profilePhoto from "@/assets/img/profile-photo.jpg";
import ScrollDown from "@/components/ScrollDown.vue";
import { RouterLink } from "vue-router";

const scrollToTop = () => {
  window.scrollTo(0, 0);
};
</script>
<template>
  <section
    class="bg-[#1a1a1a] min-h-[100vh] overflow-hidden flex flex-col justify-center items-center"
    id="cover"
  >
    <div
      class="grid min-h-[100%] sm:grid-cols-2 max-w-screen-xl mx-auto sm:mt-10 p-4"
    >
      <div class="flex flex-col justify-center text-white mx-auto mb-5">
        <h3
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :delay="200"
          :duration="1200"
        >
          <span class="text-cyan-500 italic">function </span>
          <span class="text-green-500">greetings</span
          ><span class="text-[#FB2458]">()</span>{
        </h3>
        <h3
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :delay="300"
          :duration="1200"
        >
          <span class="text-red-500">return </span>'
        </h3>
        <h1
          class="sm:text-7xl font-bold uppercase"
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :variants="{ custom: { scale: 2 } }"
          :hovered="{ scale: 1.2 }"
          :delay="400"
          :duration="1200"
        >
          Hello!
        </h1>
        <h1
          class="sm:text-7xl text-5xl font-bold uppercase"
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :variants="{ custom: { scale: 2 } }"
          :hovered="{ scale: 1.2 }"
          :delay="500"
          :duration="1200"
        >
          I am
          <span class="text-[#009efa] font-monoton font-medium">Gerald</span>,
        </h1>
        <h1
          class="text-3xl font-medium"
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :variants="{ custom: { scale: 2 } }"
          :hovered="{ scale: 1.2 }"
          :delay="600"
          :duration="1200"
        >
          <span class="bg-[#009efa] px-4 leading-normal italic"
            >Web Developer • Multimedia Artist</span
          >
        </h1>
        <h3
          class="mb-5"
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :delay="700"
          :duration="1200"
        >
          '};
        </h3>
        <RouterLink to="/contact" class="me-auto">
          <button
            class="bg-[#009efa] hover:text-white hover:bg-[#4abdff] max-w-[150px] p-2 rounded-full font-bold text-black flex justify-center items-center"
            @click="scrollToTop()"
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0, scale: 1 }"
            :variants="{ custom: { scale: 2 } }"
            :hovered="{ scale: 1.2 }"
            :delay="800"
            :duration="1200"
          >
            Get in Touch
            <i class="pi pi-arrow-circle-right ms-2"></i></button
        ></RouterLink>
      </div>
      <div
        class="flex flex-col my-auto"
        v-motion
        :initial="{ opacity: 0, y: 0, scale: 0 }"
        :enter="{ opacity: 1, y: 0, scale: 1 }"
        :delay="200"
        :duration="1200"
      >
        <img
          :src="profilePhoto"
          class="rounded-full sm:hard-shadow img-border"
        />
      </div>
    </div>
    <ScrollDown class="ms-auto" />
  </section>
</template>
