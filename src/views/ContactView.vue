<script setup>
import Cover from "@/components/Cover.vue";
import { ref } from "vue";

const refData = ref({
  email: "",
  subject: "general-inquiry",
  message: "",
});

const contactInfo = [
  { icon: "pi-envelope", label: "geraldkevinjove@gmail.com", href: "mailto:geraldkevinjove@gmail.com" },
  { icon: "pi-phone", label: "(+63) 966-331-0965", href: "tel:+639663310965" },
  { icon: "pi-map-marker", label: "Caloocan City, Philippines", href: null },
];

const socials = [
  { icon: "pi-linkedin", url: "https://www.linkedin.com/in/geraldjove", label: "LinkedIn" },
  { icon: "pi-github", url: "https://github.com/geraldjove", label: "GitHub" },
  { icon: "pi-facebook", url: "https://www.facebook.com/gkbjove/", label: "Facebook" },
  { icon: "pi-instagram", url: "https://www.instagram.com/geraldjove/", label: "Instagram" },
];
</script>

<template>
  <Cover title="Contact" subtitle="Get in Touch and Let's Work Together" />

  <section class="bg-grid bg-ink-900 py-24" id="next-section">
    <div class="mx-auto max-w-screen-xl px-6">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <!-- Info -->
        <div
          class="lg:col-span-2"
          v-motion
          :initial="{ opacity: 0, x: -40 }"
          :visible-once="{ opacity: 1, x: 0 }"
          :duration="900"
        >
          <h2 class="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Let's Bring Your Vision into
            <span class="text-gradient">Reality</span>
          </h2>
          <p class="mt-4 leading-relaxed text-slate-400">
            Whether you have a project in mind, a question, or just want to
            connect — my inbox is always open. I'll get back to you as soon as I
            can.
          </p>

          <div class="mt-8 space-y-4">
            <component
              :is="info.href ? 'a' : 'div'"
              v-for="info in contactInfo"
              :key="info.label"
              :href="info.href"
              class="glass flex items-center gap-4 rounded-xl p-4 transition-colors duration-200"
              :class="info.href ? 'hover:border-accent/40' : ''"
            >
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                <i :class="['pi', info.icon]"></i>
              </span>
              <span class="text-slate-200">{{ info.label }}</span>
            </component>
          </div>

          <div class="mt-6 flex items-center gap-3">
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

        <!-- Form -->
        <div
          class="glass-strong rounded-2xl p-8 lg:col-span-3"
          v-motion
          :initial="{ opacity: 0, x: 40 }"
          :visible-once="{ opacity: 1, x: 0 }"
          :duration="900"
        >
          <h3 class="mb-6 font-display text-2xl font-bold text-white">
            Send a <span class="text-accent">Message</span>
          </h3>
          <form
            action="https://formspree.io/f/mvoeqbpk"
            method="POST"
            class="flex flex-col gap-5"
          >
            <div>
              <label for="email" class="mb-2 block text-sm font-medium text-slate-300">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                v-model="refData.email"
                required
                placeholder="yourname@email.com"
                class="w-full rounded-xl border border-white/10 bg-ink-950 px-4 py-3 text-white [color-scheme:dark] placeholder-slate-500 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
            <div>
              <label for="subject" class="mb-2 block text-sm font-medium text-slate-300">Subject</label>
              <select
                name="subject"
                id="subject"
                v-model="refData.subject"
                class="w-full rounded-xl border border-white/10 bg-ink-950 px-4 py-3 text-white [color-scheme:dark] outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
              >
                <option value="general-inquiry">General Inquiry</option>
                <option value="customer-support">Customer Support</option>
                <option value="hire-me">Hire Me</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div>
              <label for="message" class="mb-2 block text-sm font-medium text-slate-300">Message</label>
              <textarea
                name="message"
                id="message"
                v-model="refData.message"
                rows="6"
                required
                placeholder="Tell me about your project..."
                class="w-full resize-none rounded-xl border border-white/10 bg-ink-950 px-4 py-3 text-white [color-scheme:dark] placeholder-slate-500 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
              ></textarea>
            </div>
            <button
              type="submit"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-bold text-ink-900 transition-all duration-200 hover:bg-accent-light hover:shadow-[0_0_40px_-8px_rgba(0,158,250,0.8)]"
            >
              Send Message <i class="pi pi-send"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
