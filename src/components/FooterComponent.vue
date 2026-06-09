<script setup>
import { RouterLink } from "vue-router";

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/works", label: "Works" },
  { to: "/contact", label: "Contact" },
];

const socials = [
  { icon: "pi-linkedin", url: "https://www.linkedin.com/in/geraldjove", label: "LinkedIn" },
  { icon: "pi-github", url: "https://github.com/geraldjove", label: "GitHub" },
  { icon: "pi-facebook", url: "https://www.facebook.com/gkbjove/", label: "Facebook" },
  { icon: "pi-instagram", url: "https://www.instagram.com/geraldjove/", label: "Instagram" },
];
</script>

<template>
  <footer class="border-t border-white/10 bg-ink-950">
    <div class="mx-auto max-w-screen-xl px-6 py-12">
      <div class="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
        <!-- Brand -->
        <RouterLink
          to="/"
          @click="scrollToTop()"
          class="font-display text-2xl font-extrabold text-white"
        >
          GJ<span class="text-accent">.</span>
        </RouterLink>

        <!-- Nav -->
        <nav class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            @click="scrollToTop()"
            class="text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-accent"
          >
            {{ link.label }}
          </RouterLink>
        </nav>

        <!-- Socials -->
        <div class="flex items-center gap-3">
          <a
            v-for="social in socials"
            :key="social.icon"
            :href="social.url"
            target="_blank"
            rel="noopener"
            :aria-label="social.label"
            class="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
          >
            <i :class="['pi', social.icon]"></i>
          </a>
        </div>
      </div>

      <div class="mt-8 border-t border-white/10 pt-6 text-center">
        <p class="text-sm text-slate-500">
          © 2026 Gerald Jove. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
