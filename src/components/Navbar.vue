<script setup>
import { useRoute, RouterLink } from "vue-router";
import { ref, onMounted } from "vue";

const navSwitch = ref(false);

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

onMounted(() => {
  const burgerElement = document.getElementById("burger");
  burgerElement.addEventListener("click", () => {});
});
</script>

<template>
  <nav
    class="bg-[#1a1a1a] sm:absolute fixed z-10 min-w-[100vw] overflow-hidden top-0"
  >
    <div
      class="sm:max-w-screen-xl min-w-[50px] sm:flex sm:flex-wrap justify-between items-center mx-auto px-2"
    >
      <div class="flex flex-wrap items-center">
        <RouterLink
          to="/"
          class="text-white font-bold text-3xl"
          v-motion
          :initial="{ opacity: 0, y: 0, scale: 0 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :variants="{ custom: { scale: 2 } }"
          :hovered="{ scale: 1.2 }"
          :delay="100"
          :duration="1200"
          >GJ<span class="text-[#009efa]">.</span></RouterLink
        >
        <!-- Burger Icons -->
        <div class="ms-auto sm:hidden block p-2" id="burger">
          <i
            @click="navToggle"
            :class="[
              navSwitch
                ? 'pi pi-times border p-4 rounded-xl text-white'
                : 'pi pi-bars text-white border-white border p-4 rounded-xl',
            ]"
          ></i>
        </div>
      </div>

      <!-- Mobile Navbar -->
      <div
        :class="[navSwitch ? 'block sm:hidden' : 'hidden']"
        id="navbar-mobile"
      >
        <ul class="text-white flex flex-col justify-center items-center mt-4">
          <RouterLink
            @click="
              navToggle();
              scrollToTop();
            "
            to="/"
            :class="[
              isActiveLink('/')
                ? 'bg-[#009efa] p-4 min-w-[100%] text-center rounded-lg'
                : 'p-4',
              'mx-2',
              'font-medium',
              'hover:bg-[#009efa]',
              'text-white',
            ]"
            >Home
          </RouterLink>
          <hr width="100px" class="mx-auto" />
          <RouterLink
            @click="
              navToggle();
              scrollToTop();
            "
            to="/about"
            :class="[
              isActiveLink('/about')
                ? 'bg-[#009efa] p-4 min-w-[100%] text-center rounded-lg'
                : 'p-4',
              'mx-2',
              'font-medium',
              'hover:bg-[#009efa]',
              'text-white',
            ]"
            >About</RouterLink
          >
          <hr width="100px" class="mx-auto" />
          <RouterLink
            @click="
              navToggle();
              scrollToTop();
            "
            to="/works"
            :class="[
              isActiveLink('/works')
                ? 'bg-[#009efa] p-4 min-w-[100%] text-center rounded-lg'
                : 'p-4',
              'mx-2',
              'font-medium',
              'hover:bg-[#009efa]',
              'text-white',
            ]"
            >Works</RouterLink
          >
          <hr width="100px" class="mx-auto" />
          <RouterLink
            @click="
              navToggle();
              scrollToTop();
            "
            to="/contact"
            :class="[
              isActiveLink('/contact')
                ? 'bg-[#009efa] p-4 min-w-[100%] text-center rounded-lg'
                : 'p-4',
              'mx-2',
              'font-medium',
              'hover:bg-[#009efa]',
              'text-white',
            ]"
            >Contact</RouterLink
          >
        </ul>
      </div>
      <!-- Desktop Navbar -->
      <div id="navbar-default" class="hidden sm:block">
        <ul class="flex">
          <RouterLink
            to="/"
            v-motion
            :initial="{ opacity: 0, y: -100, scale: 0 }"
            :enter="{ opacity: 1, y: 0, scale: 1 }"
            :delay="100"
            :duration="1200"
            :class="[
              isActiveLink('/') ? 'bg-[#009efa] rounded-b-lg p-4 mx-2' : 'p-4',
              'mx-2',
              'font-medium',
              'hover:bg-[#009efa]',
              'hover:rounded-b-lg',
              'text-white',
            ]"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/about"
            v-motion
            :initial="{ opacity: 0, y: -100, scale: 0 }"
            :enter="{ opacity: 1, y: 0, scale: 1 }"
            :delay="200"
            :duration="1200"
            :class="[
              isActiveLink('/about')
                ? 'bg-[#009efa] rounded-b-lg p-4 mx-2'
                : 'p-4',
              'mx-2',
              'font-medium',
              'hover:bg-[#009efa]',
              'hover:rounded-b-lg',
              'text-white',
            ]"
          >
            About
          </RouterLink>
          <RouterLink
            to="/works"
            v-motion
            :initial="{ opacity: 0, y: -100, scale: 0 }"
            :enter="{ opacity: 1, y: 0, scale: 1 }"
            :delay="300"
            :duration="1200"
            :class="[
              isActiveLink('/works')
                ? 'bg-[#009efa] rounded-b-lg p-4 mx-2'
                : 'p-4',
              'mx-2',
              'font-medium',
              'hover:bg-[#009efa]',
              'hover:rounded-b-lg',
              'text-white',
            ]"
          >
            Works
          </RouterLink>
          <RouterLink
            to="/contact"
            v-motion
            :initial="{ opacity: 0, y: -100, scale: 0 }"
            :enter="{ opacity: 1, y: 0, scale: 1 }"
            :delay="400"
            :duration="1200"
            :class="[
              isActiveLink('/contact')
                ? 'bg-[#009efa] rounded-b-lg p-4 mx-2'
                : 'p-4',
              'mx-2',
              'font-medium',
              'hover:bg-[#009efa]',
              'hover:rounded-b-lg',
              'text-white',
            ]"
          >
            Contact
          </RouterLink>
        </ul>
      </div>
      <div class="hidden sm:block">
        <a
          href="https://drive.google.com/uc?export=download&id=19FSRCQP-5lCsknrKTliY38CvT2cpDGPFx63q3KuKCgs"
          download="gerald-jove-web-developer-resume"
          target="_blank"
          v-motion
          :initial="{ opacity: 0, y: -100, scale: 0 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :delay="500"
          :duration="1200"
        >
          <button
            class="text-white font-bold border border-white p-3 rounded-xl"
          >
            Download CV

            <i
              class="pi pi-download ms-2"
              style="font-size: 1.25rem"
            ></i></button
        ></a>
      </div>
    </div>
  </nav>
</template>
