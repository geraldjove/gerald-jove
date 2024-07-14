<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <section class="min-h-[100vh] overflow-hidden bg-[#1a1a1a] p-4" id="projects">
    <div
      class="sm:min-h-screen max-w-screen-xl mx-auto text-white flex flex-col justify-center"
    >
      <div>
        <h1
          class="font-monoton sm:text-9xl text-5xl"
          v-motion
          :initial="{ opacity: 0, x: -100, scale: 1 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="100"
          :duration="1200"
        >
          Works
        </h1>
        <div
          class="bg-[#009efa] w-[120px] sm:w-[300px] sm:h-[10px] h-[5px] mb-5"
          v-motion
          :initial="{ opacity: 0, x: -100, scale: 1 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="300"
          :duration="1200"
        ></div>
        <p
          class="mb-5"
          v-motion
          :initial="{ opacity: 0, x: 0, scale: 0 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="500"
          :duration="1200"
        >
          I have worked on a diverse range of projects that showcase my skills
          in 3D modeling, graphics design, video editing, and web development.
          From creating visually stunning 3D models and animations to designing
          engaging graphics and editing high-quality videos, my projects reflect
          my technical proficiency and creative flair. Additionally, my web
          development projects demonstrate my ability to integrate various
          technologies and frameworks to build dynamic and responsive websites.
        </p>
      </div>
      <div class="grid sm:grid-cols-12 gap-4 mb-5">
        <div
          class="bg-cgi-Mouse bg-cover bg-center min-h-[200px] sm:col-span-10 rounded-lg"
          v-motion
          :initial="{ opacity: 0, x: -100, scale: 1 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="600"
          :duration="1200"
        ></div>
        <div
          class="bg-cgi-Phasmo1 bg-cover bg-center bg-no-repeat min-h-[200px] sm:col-span-2 rounded-lg"
          v-motion
          :initial="{ opacity: 0, x: 100, scale: 1 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="700"
          :duration="1200"
        ></div>
        <div
          class="bg-programming-Forex bg-cover bg-center min-h-[200px] sm:col-span-7 rounded-lg"
          v-motion
          :initial="{ opacity: 0, x: -100, scale: 1 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="800"
          :duration="1200"
        ></div>
        <div
          class="bg-cgi-Massager bg-center bg-cover min-h-[200px] sm:col-span-5 rounded-lg"
          v-motion
          :initial="{ opacity: 0, x: 100, scale: 1 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="900"
          :duration="1200"
        ></div>
        <div
          class="min-h-[200px] max-h-[200px] sm:col-span-6 rounded-lg overflow-hidden relative"
          v-motion
          :initial="{ opacity: 0, x: -100, scale: 1 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="1000"
          :duration="1200"
        >
          <video
            src="https://cdn.artstation.com/p/video_sources/000/739/763/blender-shoes.mp4"
            type="video/mp4"
            class="md:translate-y-[-400px] translate-y-[-180px]"
          ></video>
        </div>
        <div
          class="bg-programming-Ecommerce bg-cover bg-center min-h-[200px] max-h-[200px] sm:col-span-6 rounded-lg overflow-hidden relative"
          v-motion
          :initial="{ opacity: 0, x: 100, scale: 1 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="1300"
          :duration="1200"
        ></div>
      </div>
    </div>
    <div class="flex justify-center">
      <RouterLink
        to="/works"
        v-motion
        :initial="{ opacity: 0, x: 0, scale: 0 }"
        :visible-once="{ opacity: 1, x: 0, scale: 1 }"
        :delay="1400"
        :duration="1200"
        ><button
          class="text-black hover:text-white bg-[#009efa] hover:bg-[#4abdff] p-4 w-[250px] rounded-lg uppercase font-bold"
        >
          View More
        </button></RouterLink
      >
    </div>
  </section>
</template>
