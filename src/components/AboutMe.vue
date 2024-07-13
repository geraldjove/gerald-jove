<script setup></script>

<template>
  <section class="min-h-[100vh] bg-[#1a1a1a]" id="about">
    <div
      class="sm:min-h-screen max-w-screen-xl mx-auto text-white flex flex-col justify-center p-4"
    >
      <div
        class="flex flex-col justify-center items-center sm:mt-0 mt-5"
        v-motion
        :initial="{ opacity: 0, y: 0, scale: 0 }"
        :visible-once="{ opacity: 1, y: 0, scale: 1 }"
        :delay="100"
        :duration="1200"
      >
        <h1 class="text-3xl uppercase font-black">
          About <span class="text-[#009efa]">Me</span>
        </h1>
        <h1
          class="text-7xl uppercase font-black opacity-5 overlay-text text-center sm:mb-[-25px] mb-[-70px]"
        >
          Gerald
        </h1>
      </div>
      <div class="grid sm:grid-cols-2">
        <div class="grid sm:grid-cold-2 p-5">
          <div
            class="rounded-lg min-h-[200px] flex flex-col justify-center p-5"
          >
            <h1
              class="font-black uppercase mb-2 text-xl"
              v-motion
              :initial="{ opacity: 0, x: -100, scale: 1 }"
              :visible-once="{ opacity: 1, x: 0, scale: 1 }"
              :delay="100"
              :duration="1200"
            >
              Web <span class="text-[#009efa]">Developer</span> & Multimedia
              <span class="text-[#009efa]">Artist</span>
            </h1>
            <p
              v-motion
              :initial="{ opacity: 0, y: 100, scale: 1 }"
              :visible-once="{ opacity: 1, y: 0, scale: 1 }"
              :delay="200"
              :duration="1200"
            >
              With expertise in front-end, back-end, and full-stack web
              development, I offer a comprehensive skill set. Proficient in
              HTML5, CSS3, Bootstrap, and JavaScript, I create visually
              appealing and responsive websites. I am experienced in version
              control with Git and GitHub and adept in back-end technologies
              like Node.js, Express.js, and MongoDB. Additionally, I excel in
              React.js for dynamic interfaces and API integration. As a
              multimedia artist and digital marketing specialist, I bring
              creativity and strategic thinking to projects, ensuring success
              across various domains.
            </p>
            <div
              class="min-h-[50px] sm:max-w-full my-5 flex justify-center items-center border rounded-xl border-[#009efa]"
              v-motion
              :initial="{ opacity: 0, y: 0, scale: 0 }"
              :visible-once="{ opacity: 1, y: 0, scale: 1 }"
              :delay="300"
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
            <a
              href="https://drive.google.com/uc?export=download&id=19FSRCQP-5lCsknrKTliY38CvT2cpDGPFx63q3KuKCgs"
              download="gerald-jove-web-developer-resume"
              target="_blank"
              class="mx-auto"
              v-motion
              :initial="{ opacity: 0, y: 100, scale: 0 }"
              :visible-once="{ opacity: 1, y: 0, scale: 1 }"
              :delay="400"
              :duration="1200"
              ><button
                class="text-black font-bold bg-[#009efa] hover:bg-[#4abdff] hover:text-white p-5 rounded-full"
              >
                Download CV
                <i
                  class="pi pi-download ms-2"
                  style="font-size: 1.25rem"
                ></i></button
            ></a>
          </div>
        </div>
        <div class="grid sm:grid-cols-2 gap-4 p-5">
          <div
            class="rounded-lg min-h-[200px] bg-cgi-Phasmo1 bg-cover bg-center"
            v-motion
            :initial="{ opacity: 0, y: 0, scale: 0 }"
            :visible-once="{ opacity: 1, y: 0, scale: 1 }"
            :delay="100"
            :duration="1200"
          ></div>
          <div
            class="rounded-lg min-h-[200px] bg-programming-Forex bg-cover bg-center"
            v-motion
            :initial="{ opacity: 0, y: 0, scale: 0 }"
            :visible-once="{ opacity: 1, y: 0, scale: 1 }"
            :delay="300"
            :duration="1200"
          ></div>
          <div
            class="rounded-lg min-h-[200px] bg-programming-Ecommerce bg-center bg-cover"
            v-motion
            :initial="{ opacity: 0, y: 0, scale: 0 }"
            :visible-once="{ opacity: 1, y: 0, scale: 1 }"
            :delay="500"
            :duration="1200"
          ></div>
          <div
            class="rounded-lg min-h-[200px] bg-cgi-Demons bg-cover bg-center"
            v-motion
            :initial="{ opacity: 0, y: 0, scale: 0 }"
            :visible-once="{ opacity: 1, y: 0, scale: 1 }"
            :delay="700"
            :duration="1200"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>
