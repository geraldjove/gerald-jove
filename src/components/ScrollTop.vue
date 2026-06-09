<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const visible = ref(false);

const onScroll = () => {
  visible.value = window.scrollY > 400;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
  >
    <button
      v-show="visible"
      @click="scrollToTop"
      aria-label="Scroll to top"
      class="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-accent text-ink-900 shadow-[0_0_30px_-6px_rgba(0,158,250,0.7)] transition-colors duration-200 hover:bg-accent-light"
    >
      <i class="pi pi-arrow-up text-lg"></i>
    </button>
  </transition>
</template>
