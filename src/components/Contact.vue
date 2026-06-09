<script setup>
import { RouterLink } from "vue-router";

const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
};
</script>

<template>
  <section class="bg-grid relative overflow-hidden bg-ink-950 py-24" id="contact">
    <div class="mx-auto max-w-screen-xl px-6">
      <div
        class="glass-strong relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16"
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :visible-once="{ opacity: 1, y: 0 }"
        :duration="900"
      >
        <!-- glow -->
        <div
          class="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
        ></div>

        <span class="relative mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Let's Connect
        </span>
        <h2
          class="relative mx-auto max-w-3xl font-display text-4xl font-extrabold leading-tight text-white sm:text-6xl"
        >
          Let's Bring Your Vision into
          <span class="text-gradient">Reality</span>
        </h2>
        <p class="relative mx-auto mt-6 max-w-xl text-slate-400">
          Have a project in mind or just want to say hello? I'm always open to
          discussing new opportunities and creative collaborations.
        </p>

        <div class="relative mt-10 flex flex-wrap items-center justify-center gap-4">
          <RouterLink to="/contact" @click="scrollToTop()">
            <button
              class="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3 font-bold text-ink-900 transition-all duration-200 hover:bg-accent-light hover:shadow-[0_0_40px_-8px_rgba(0,158,250,0.8)]"
            >
              <i class="pi pi-send"></i> Get in Touch
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
