<script setup>
import profilePhoto from "@/assets/img/profile-photo.jpg";
import ScrollDown from "@/components/ScrollDown.vue";
import { RouterLink } from "vue-router";

const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
};

const socials = [
  { icon: "pi-linkedin", url: "https://www.linkedin.com/in/geraldjove", label: "LinkedIn" },
  { icon: "pi-github", url: "https://github.com/geraldjove", label: "GitHub" },
  { icon: "pi-facebook", url: "https://www.facebook.com/gkbjove/", label: "Facebook" },
  { icon: "pi-instagram", url: "https://www.instagram.com/geraldjove/", label: "Instagram" },
];
</script>

<template>
  <section
    id="cover"
    class="bg-grid relative flex min-h-screen items-center overflow-hidden bg-ink-950"
  >
    <!-- Ambient glow blobs -->
    <div
      class="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent/20 blur-[120px]"
    ></div>
    <div
      class="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-accent-dark/20 blur-[120px]"
    ></div>

    <div
      class="mx-auto grid max-w-screen-xl grid-cols-1 items-center gap-12 px-6 pt-28 pb-20 sm:grid-cols-2 sm:pt-20"
    >
      <!-- Text column -->
      <div class="flex flex-col">
        <span
          class="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="200"
          :duration="800"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"
            ></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
          </span>
          Available for work
        </span>

        <h1
          class="font-display text-5xl font-extrabold leading-[1.05] text-white sm:text-7xl"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="300"
          :duration="900"
        >
          Hi, I'm <span class="text-gradient">Gerald</span>
        </h1>

        <h2
          class="mt-4 font-display text-2xl font-bold text-slate-200 sm:text-3xl"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="450"
          :duration="900"
        >
          Web Developer
          <span class="text-accent">&amp;</span> Multimedia Artist
        </h2>

        <p
          class="mt-6 max-w-md text-base leading-relaxed text-slate-400"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="600"
          :duration="900"
        >
          I build fast, responsive web experiences and craft striking 3D art,
          animation, and visuals — blending engineering with creativity to bring
          ideas to life.
        </p>

        <div
          class="mt-8 flex flex-wrap items-center gap-4"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="750"
          :duration="900"
        >
          <RouterLink to="/contact" @click="scrollToTop()">
            <button
              class="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-bold text-ink-900 transition-all duration-200 hover:bg-accent-light hover:shadow-[0_0_40px_-8px_rgba(0,158,250,0.8)]"
            >
              Get in Touch
              <i class="pi pi-arrow-up-right"></i>
            </button>
          </RouterLink>
          <RouterLink to="/works" @click="scrollToTop()">
            <button
              class="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:border-accent/60 hover:text-accent"
            >
              View My Work
            </button>
          </RouterLink>
        </div>

        <!-- Socials -->
        <div
          class="mt-8 flex items-center gap-3"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="900"
          :duration="900"
        >
          <a
            v-for="social in socials"
            :key="social.icon"
            :href="social.url"
            target="_blank"
            rel="noopener"
            :aria-label="social.label"
            class="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
          >
            <i :class="['pi', social.icon, 'text-lg']"></i>
          </a>
        </div>
      </div>

      <!-- Image column -->
      <div
        class="relative mx-auto flex justify-center"
        v-motion
        :initial="{ opacity: 0, scale: 0.85 }"
        :enter="{ opacity: 1, scale: 1 }"
        :delay="400"
        :duration="1000"
      >
        <div class="relative animate-float">
          <!-- decorative ring -->
          <div
            class="absolute -inset-4 rounded-full border border-accent/20"
          ></div>
          <img
            :src="profilePhoto"
            alt="Portrait of Gerald Jove"
            class="img-ring relative z-10 h-64 w-64 rounded-full object-cover sm:h-80 sm:w-80"
          />
          <!-- floating accent badge -->
          <div
            class="glass absolute -bottom-2 -left-4 z-20 rounded-2xl px-4 py-3 text-center"
          >
            <p class="font-display text-2xl font-extrabold text-white">6+</p>
            <p class="text-xs text-slate-400">Years Exp.</p>
          </div>
        </div>
      </div>
    </div>

    <ScrollDown class="absolute bottom-6 left-1/2 -translate-x-1/2" />
  </section>
</template>
