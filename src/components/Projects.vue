<script setup>
import { RouterLink } from "vue-router";

const scrollToTop = () => {
  window.scroll({ top: 0, left: 0, behavior: "instant" });
};
</script>

<template>
  <section class="relative overflow-hidden bg-ink-900 py-24" id="projects">
    <div class="mx-auto max-w-screen-xl px-6">
      <!-- Header -->
      <div
        class="mb-12 flex flex-col items-start"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0 }"
        :duration="800"
      >
        <span class="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Selected Work
        </span>
        <h2 class="font-display text-4xl font-extrabold text-white sm:text-5xl">
          Featured <span class="text-gradient">Works</span>
        </h2>
        <div class="mt-4 h-1 w-20 rounded-full bg-accent"></div>
        <p class="mt-6 max-w-3xl leading-relaxed text-slate-400">
          A diverse range of projects spanning 3D modeling, graphic design,
          video editing, and web development — from visually stunning 3D models
          and animations to dynamic, responsive websites built with modern
          technologies.
        </p>
      </div>

      <!-- Bento grid -->
      <div
        class="grid auto-rows-[200px] grid-cols-2 gap-4 sm:grid-cols-12"
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :visible-once="{ opacity: 1, y: 0 }"
        :duration="900"
      >
        <div
          class="bg-cgi-Mouse group relative col-span-2 overflow-hidden rounded-2xl border border-white/10 bg-cover bg-center sm:col-span-8"
        >
          <div class="absolute inset-0 bg-ink-950/0 transition-colors duration-300 group-hover:bg-ink-950/20"></div>
        </div>
        <div
          class="bg-cgi-Phasmo1 col-span-1 overflow-hidden rounded-2xl border border-white/10 bg-cover bg-center transition-transform duration-300 hover:scale-[1.02] sm:col-span-4"
        ></div>
        <div
          class="bg-programming-Forex col-span-1 overflow-hidden rounded-2xl border border-white/10 bg-cover bg-center transition-transform duration-300 hover:scale-[1.02] sm:col-span-7"
        ></div>
        <div
          class="bg-cgi-Massager col-span-1 overflow-hidden rounded-2xl border border-white/10 bg-cover bg-center transition-transform duration-300 hover:scale-[1.02] sm:col-span-5"
        ></div>
        <div
          class="col-span-2 overflow-hidden rounded-2xl border border-white/10 sm:col-span-6"
        >
          <video
            src="https://cdn.artstation.com/p/video_sources/000/739/763/blender-shoes.mp4"
            type="video/mp4"
            autoplay
            muted
            loop
            playsinline
            class="h-full w-full object-cover"
          ></video>
        </div>
        <div
          class="bg-programming-Ecommerce col-span-2 overflow-hidden rounded-2xl border border-white/10 bg-cover bg-center transition-transform duration-300 hover:scale-[1.02] sm:col-span-6"
        ></div>
      </div>

      <!-- CTA -->
      <div
        class="mt-12 flex justify-center"
        v-motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :visible-once="{ opacity: 1, scale: 1 }"
        :duration="700"
      >
        <RouterLink to="/works" @click="scrollToTop()">
          <button
            class="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3 font-bold uppercase tracking-wide text-ink-900 transition-all duration-200 hover:bg-accent-light hover:shadow-[0_0_40px_-8px_rgba(0,158,250,0.8)]"
          >
            View All Works <i class="pi pi-arrow-right"></i>
          </button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
