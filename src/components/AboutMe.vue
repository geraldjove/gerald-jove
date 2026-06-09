<script setup>
import { RouterLink } from "vue-router";
import primeSneaks from "../assets/img/prime-sneaks.png";

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const socials = [
  { icon: "pi-linkedin", url: "https://www.linkedin.com/in/geraldjove", label: "LinkedIn" },
  { icon: "pi-github", url: "https://github.com/geraldjove", label: "GitHub" },
  { icon: "pi-facebook", url: "https://www.facebook.com/gkbjove/", label: "Facebook" },
  { icon: "pi-instagram", url: "https://www.instagram.com/geraldjove/", label: "Instagram" },
];

const resumeUrl =
  "https://drive.google.com/uc?export=download&id=1ncDho6gvyf3khQrSzrzT7ghcb5Uhugkf";
</script>

<template>
  <section
    class="relative overflow-hidden bg-ink-900 py-24"
    id="next-section"
  >
    <div class="mx-auto max-w-screen-xl px-6">
      <!-- Section header -->
      <div
        class="mb-14 flex flex-col items-center text-center"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0 }"
        :duration="800"
      >
        <span class="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Who I Am
        </span>
        <h2 class="font-display text-4xl font-extrabold text-white sm:text-5xl">
          About <span class="text-gradient">Me</span>
        </h2>
        <div class="mt-4 h-1 w-20 rounded-full bg-accent"></div>
      </div>

      <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <!-- Text -->
        <div
          v-motion
          :initial="{ opacity: 0, x: -40 }"
          :visible-once="{ opacity: 1, x: 0 }"
          :duration="900"
        >
          <h3 class="mb-4 font-display text-2xl font-bold text-white">
            Web <span class="text-accent">Developer</span> &amp; Multimedia
            <span class="text-accent">Artist</span>
          </h3>
          <p class="mb-6 leading-relaxed text-slate-400">
            With expertise in front-end, back-end, and full-stack web
            development, I offer a comprehensive skill set. Proficient in HTML5,
            CSS3, Bootstrap, and JavaScript, I create visually appealing and
            responsive websites. I'm experienced with Git &amp; GitHub and adept
            in back-end technologies like Node.js, Express.js, and MongoDB —
            plus React.js for dynamic interfaces and API integration. As a
            multimedia artist and digital marketing specialist, I bring
            creativity and strategic thinking to every project.
          </p>

          <!-- Socials -->
          <div class="mb-8 flex items-center gap-3">
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

          <div class="flex flex-wrap gap-4">
            <RouterLink to="/about" @click="scrollToTop()">
              <button
                class="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-bold text-ink-900 transition-all duration-200 hover:bg-accent-light hover:shadow-[0_0_40px_-8px_rgba(0,158,250,0.8)]"
              >
                About Page <i class="pi pi-arrow-up-right"></i>
              </button>
            </RouterLink>
            <a
              :href="resumeUrl"
              download="gerald-jove-web-developer-resume"
              target="_blank"
            >
              <button
                class="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:border-accent/60 hover:text-accent"
              >
                Download CV <i class="pi pi-download"></i>
              </button>
            </a>
          </div>
        </div>

        <!-- Image grid -->
        <div
          class="grid grid-cols-2 gap-4"
          v-motion
          :initial="{ opacity: 0, x: 40 }"
          :visible-once="{ opacity: 1, x: 0 }"
          :duration="900"
        >
          <div
            class="bg-cgi-Phasmo1 h-44 rounded-2xl border border-white/10 bg-cover bg-center transition-transform duration-300 hover:scale-[1.03]"
          ></div>
          <div
            class="bg-programming-Forex h-44 rounded-2xl border border-white/10 bg-cover bg-center transition-transform duration-300 hover:scale-[1.03]"
          ></div>
          <div
            class="h-44 overflow-hidden rounded-2xl border border-white/10 bg-ink-800 transition-transform duration-300 hover:scale-[1.03]"
          >
            <img
              :src="primeSneaks"
              alt="Prime Sneaks e-commerce project"
              class="h-full w-full object-cover"
            />
          </div>
          <div
            class="bg-cgi-Demons h-44 rounded-2xl border border-white/10 bg-cover bg-center transition-transform duration-300 hover:scale-[1.03]"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>
