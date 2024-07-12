<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <section class="min-h-[100vh] bg-[#1a1a1a] p-4" id="projects">
    <div
      class="sm:min-h-screen max-w-screen-xl mx-auto text-white flex flex-col justify-center"
    >
      <div>
        <h1 class="font-monoton sm:text-9xl text-5xl">Projects</h1>
        <div
          class="bg-[#009efa] w-[120px] sm:w-[300px] sm:h-[10px] h-[5px] mb-5"
        ></div>
        <p class="mb-5">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum
          quas fugit recusandae repellendus similique facere officiis nisi quod
          fugiat quos. Sunt quisquam omnis quas nobis officia neque nostrum
          ipsam molestias. Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Voluptatum quas fugit recusandae repellendus similique facere
          officiis nisi quod fugiat quos. Sunt quisquam omnis quas nobis officia
          neque nostrum ipsam molestias.
        </p>
      </div>
      <div class="grid sm:grid-cols-12 gap-4 mb-5">
        <div
          class="bg-cgi-Mouse bg-cover bg-center min-h-[200px] sm:col-span-10 rounded-lg"
        ></div>
        <div
          class="bg-cgi-Phasmo1 bg-cover bg-center bg-no-repeat min-h-[200px] sm:col-span-2 rounded-lg"
        ></div>
        <div
          class="bg-purple-500 bg-cover bg-center min-h-[200px] sm:col-span-7 rounded-lg"
        ></div>
        <div
          class="bg-cgi-Massager bg-center bg-cover min-h-[200px] sm:col-span-5 rounded-lg"
        ></div>
        <div
          class="min-h-[200px] max-h-[200px] sm:col-span-6 rounded-lg overflow-hidden relative"
        >
          <video
            src="https://cdn.artstation.com/p/video_sources/000/739/763/blender-shoes.mp4"
            type="video/mp4"
            class="md:translate-y-[-400px] translate-y-[-180px]"
          ></video>
        </div>
        <div
          class="bg-cyan-500 min-h-[200px] max-h-[200px] sm:col-span-6 rounded-lg overflow-hidden relative"
        ></div>
      </div>
    </div>
    <div class="flex justify-center">
      <button
        class="text-white bg-[#009efa] hover:bg-[#4abdff] p-4 w-[250px] rounded-lg uppercase font-bold"
      >
        <RouterLink to="/projects">View More</RouterLink>
      </button>
    </div>
  </section>
</template>
