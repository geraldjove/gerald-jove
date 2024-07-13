<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <section class="min-h-[100vh] bg-[#1a1a1a] flex" id="contact">
    <div
      class="sm:min-h-screen max-w-screen-xl mx-auto text-white flex flex-col items-center justify-center p-4"
    >
      <div>
        <h1
          class="font-monoton sm:text-7xl text-5xl"
          v-motion
          :initial="{ opacity: 0, x: 0, scale: 0 }"
          :visible-once="{ opacity: 1, x: 0, scale: 1 }"
          :delay="100"
          :duration="1200"
        >
          Contact
        </h1>
      </div>
      <div
        class="bg-[#009efa] w-[120px] sm:w-[300px] sm:h-[10px] h-[5px] mb-5"
        v-motion
        :initial="{ opacity: 0, x: 100, scale: 1 }"
        :visible-once="{ opacity: 1, x: 0, scale: 1 }"
        :delay="200"
        :duration="1200"
      ></div>
      <div class="grid sm:grid-cols-5 p-5 min-h-[500px]">
        <div class="sm:col-span-3 flex flex-col items-center justify-center">
          <h1
            class="sm:text-8xl text-2xl font-black tracking-wider text-white uppercase"
            v-motion
            :initial="{ opacity: 0, x: -100, scale: 1 }"
            :visible-once="{ opacity: 1, x: 0, scale: 1 }"
            :delay="100"
            :duration="1200"
          >
            Let's Bring Your
            <span>Vision</span>
            into <span class="text-[#009efa] italic">Reality</span>!
          </h1>
        </div>
        <div
          class="bg-[#009efa] rounded-xl flex flex-col items-center sm:col-span-2"
          v-motion
          :initial="{ opacity: 0, y: 100, scale: 1 }"
          :visible-once="{ opacity: 1, y: 0, scale: 1 }"
          :delay="300"
          :duration="1200"
        >
          <RouterLink
            to="/contact"
            class="bg-black p-5 rounded-full min-w-[80%] mt-auto my-10 text-[#009efa] font-bold text-center"
          >
            <button>Contact Details</button></RouterLink
          >
          <h1 class="font-bold text-3xl text-black">OR</h1>
          <a
            to="mailto:geraldkevinjove@gmail.com"
            class="bg-black p-5 rounded-full min-w-[80%] mb-auto my-10 text-[#009efa] font-bold text-center"
          >
            <button>Direct Email</button></a
          >
        </div>
      </div>
    </div>
  </section>
</template>
