<script setup>
const scrollDown = () => {
  const nextSection = document.getElementById("next-section");
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <button
    @click="scrollDown"
    aria-label="Scroll to next section"
    class="grid h-12 w-12 place-items-center rounded-full border-2 border-accent/60 text-accent transition-colors duration-200 hover:bg-accent/10"
    v-motion
    :initial="{ opacity: 0, scale: 0 }"
    :enter="{ opacity: 1, scale: 1 }"
    :delay="1100"
    :duration="900"
  >
    <i class="pi pi-angle-double-down animate-bounce text-2xl"></i>
  </button>
</template>
