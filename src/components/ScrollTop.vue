<script setup>
const scrollToHero = () => {
  const heroSection = document.getElementById("hero");
  if (heroSection) {
    heroSection.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <section class="bg-[#1a1a1a]">
    <div
      class="min-h-[100px] ms-auto flex justify-end items-center rounded-full p-5"
    >
      <button
        class="border-[#009efa] border-2 rounded-full p-5 me-10"
        @click="scrollToHero"
      >
        <i class="pi pi-angle-double-up text-3xl text-[#009efa]"></i>
      </button>
    </div>
  </section>
</template>
