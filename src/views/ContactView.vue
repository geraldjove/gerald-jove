<script setup>
import Cover from "@/components/Cover.vue";
import { ref } from "vue";

const refData = ref({
  email: "",
  subject: "",
  message: "",
});
</script>

<template>
  <Cover
    title="Contact"
    subtitle="Get in Touch and Let's Work Together"
    alignment="center"
  />
  <section class="min-h-[100vh] bg-[#1a1a1a] overflow-hidden" id="next-section">
    <div
      class="container min-h-[100vh] mx-auto flex justify-center items-center p-5"
    >
<<<<<<< HEAD
      <div class="border border-white min-w-full rounded-xl">
        <div class="grid sm:grid-cols-2">
=======
      <div
        v-motion
        :initial="{ opacity: 0, y: 0, scale: 0 }"
        :visible-once="{ opacity: 1, y: 0, scale: 1 }"
        :delay="100"
        :duration="1200"
        class="border border-white min-w-full rounded-xl"
      >
        <div class="grid sm:grid-cols-2 grid-cols-1">
>>>>>>> fb33519d8239c3d18355db2176d6d864f901c844
          <div class="min-h-[100px] p-5">
            <div
              class="text-white font-bold sm:text-2xl min-h-[500px] flex flex-col justify-center sm:ms-10"
            >
              <h1
                class="sm:text-7xl text-2xl font-black tracking-wider text-white uppercase mb-5"
              >
                Let's Bring Your Vision into
                <span class="text-[#009efa] italic">Reality</span>!
              </h1>
<<<<<<< HEAD
              <h1 class="flex items-center p-5">
                <i class="pi pi-send mr-5"></i> geraldkevinjove@gmail.com
              </h1>
              <h1 class="p-5">
                <i class="pi pi-phone mr-5"></i> (+63) 966-331-0965
              </h1>
              <h1 class="p-5">
=======
              <h1
                v-motion
                :initial="{ opacity: 0, y: 0, scale: 0 }"
                :visible-once="{ opacity: 1, y: 0, scale: 1 }"
                :delay="200"
                :duration="1200"
                class="flex sm:flex-row flex-col items-center p-5 sm:text-[1.5rem] text-[0.85rem] text-center"
              >
                <i class="pi pi-send mr-5"></i> geraldkevinjove@gmail.com
              </h1>
              <h1
                v-motion
                :initial="{ opacity: 0, y: 0, scale: 0 }"
                :visible-once="{ opacity: 1, y: 0, scale: 1 }"
                :delay="300"
                :duration="1200"
                class="flex sm:flex-row flex-col items-center p-5 text-center"
              >
                <i class="pi pi-phone mr-5"></i> (+63) 966-331-0965
              </h1>
              <h1
                v-motion
                :initial="{ opacity: 0, y: 0, scale: 0 }"
                :visible-once="{ opacity: 1, y: 0, scale: 1 }"
                :delay="400"
                :duration="1200"
                class="flex sm:flex-row flex-col items-center p-5 text-center"
              >
>>>>>>> fb33519d8239c3d18355db2176d6d864f901c844
                <i class="pi pi-map-marker mr-5"></i> Caloocan City, Philippines
              </h1>
            </div>
            <div
              class="min-h-[50px] sm:max-w-full my-5 flex justify-around items-center border rounded-xl border-[#009efa] text-white"
              :duration="1200"
            >
              <a href="https://www.linkedin.com/in/geraldjove" target="_blank"
                ><i class="pi pi-linkedin p-5 hover:text-[#009efa]"></i
              ></a>
              <a href="https://github.com/geraldjove" target="_blank"
                ><i class="pi pi-github p-5 hover:text-[#009efa]"></i
              ></a>
              <a href="https://www.facebook.com/gkbjove/" target="_blank"
                ><i class="pi pi-facebook p-5 hover:text-[#009efa]"></i
              ></a>
              <a href="https://www.instagram.com/geraldjove/" target="_blank"
                ><i class="pi pi-instagram p-5 hover:text-[#009efa]"></i
              ></a>
            </div>
          </div>
          <div
            class="min-h-[100px] bg-[#009efa] rounded-r-xl p-5 flex flex-col justify-center"
          >
            <h1
              class="sm:text-7xl text-2xl font-black tracking-wider text-black uppercase mb-5 text-center"
            >
              Send an <span class="text-white italic">Email</span>!
            </h1>
            <form
              action="https://formspree.io/f/mvoeqbpk"
              method="POST"
              class="flex flex-col"
            >
              <label for="email" class="font-bold text-xl">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                v-model="refData.email"
                placeholder="yourname@email.com"
                class="rounded-lg mb-3 min-h-[40px]"
              />
              <label for="subject" class="font-bold text-xl">Subject: </label>
              <select
                name="subject"
                id="subject"
                v-model="refData.subject"
                class="rounded-lg mb-3 min-h-[40px]"
              >
                <option value="general-inquiry">General Inquiry</option>
                <option value="customer-support">Customer Support</option>
                <option value="hire-me">Hire Me</option>
                <option value="others">Others</option>
              </select>
              <label for="message" class="font-bold text-xl"
                >Send a Message</label
              >
              <textarea
                name="message"
                id="message"
                v-model="refData.message"
                cols="30"
                rows="10"
                class="mb-3 rounded-xl"
              ></textarea>
              <button
                type="submit"
                class="bg-[#1a1a1a] rounded-xl min-h-[50px]"
              >
                <span class="font-bold text-white uppercase">Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
