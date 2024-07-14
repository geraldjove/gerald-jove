<script setup>
const scrollDown = () => {
  const nextSection = document.getElementById("next-section");
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <section class="bg-[#1a1a1a]">
    <div
      class="min-h-[100px] ms-auto flex justify-end items-center rounded-full p-5"
    >
      <button
        class="border-[#009efa] border-2 rounded-full sm:p-5 p-3"
        v-motion
        :initial="{ opacity: 0, x: 0, scale: 0 }"
        :enter="{ opacity: 1, x: 0, scale: 1 }"
        :delay="200"
        :duration="1200"
        @click="scrollDown"
      >
        <i class="pi pi-angle-double-down text-3xl text-[#009efa]"></i>
      </button>
    </div>
  </section>
</template>
