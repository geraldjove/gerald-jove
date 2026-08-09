<script setup>
import { useRoute, RouterLink } from "vue-router";
import { ref } from "vue";

const navSwitch = ref(false);

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/works", label: "Works" },
  { to: "/contact", label: "Contact" },
];

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};

const navToggle = () => {
  navSwitch.value = !navSwitch.value;
};

const scrollToTop = () => {
  window.scrollTo(0, 0);
};
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-4">
    <nav
      class="glass-strong mx-auto flex max-w-screen-xl items-center justify-between rounded-2xl px-4 py-3 sm:px-6"
    >
      <!-- Logo -->
      <RouterLink
        to="/"
        class="font-display text-2xl font-extrabold tracking-tight text-white transition-colors duration-200 hover:text-accent"
        @click="scrollToTop()"
        v-motion
        :initial="{ opacity: 0, y: -20 }"
        :enter="{ opacity: 1, y: 0 }"
        :delay="100"
        :duration="700"
        >GJ<span class="text-accent">.</span></RouterLink
      >

      <!-- Desktop links -->
      <ul class="hidden items-center gap-1 sm:flex">
        <li v-for="link in links" :key="link.to">
          <RouterLink
            :to="link.to"
            class="relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
            :class="
              isActiveLink(link.to)
                ? 'text-accent'
                : 'text-slate-300 hover:text-white'
            "
          >
            {{ link.label }}
            <span
              v-if="isActiveLink(link.to)"
              class="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
            ></span>
          </RouterLink>
        </li>
      </ul>

      <!-- Burger -->
      <button
        @click="navToggle"
        aria-label="Toggle navigation menu"
        class="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white transition-colors hover:bg-white/5 sm:hidden"
      >
        <i :class="navSwitch ? 'pi pi-times' : 'pi pi-bars'"></i>
      </button>
    </nav>

    <!-- Mobile menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="navSwitch"
        class="glass-strong mx-auto mt-2 max-w-screen-xl rounded-2xl p-3 sm:hidden"
      >
        <ul class="flex flex-col gap-1">
          <li v-for="link in links" :key="link.to">
            <RouterLink
              :to="link.to"
              @click="
                navToggle();
                scrollToTop();
              "
              class="block rounded-xl px-4 py-3 text-center font-medium transition-colors duration-200"
              :class="
                isActiveLink(link.to)
                  ? 'bg-accent text-ink-900'
                  : 'text-slate-200 hover:bg-white/5'
              "
              >{{ link.label }}</RouterLink
            >
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>
