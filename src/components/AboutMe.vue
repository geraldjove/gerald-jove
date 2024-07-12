<script setup></script>

<template>
  <section class="min-h-[100vh] bg-[#1a1a1a]">
    <div
      class="sm:min-h-screen max-w-screen-xl mx-auto text-white flex flex-col justify-center p-4"
    >
      <!-- <div class="flex flex-col justify-center items-center mx-auto">
        <h1 class="text-3xl uppercase font-black">
          About <span class="text-[#009efa]">Me</span>
          <div
            class="bg-[#009efa] w-[110px] sm:w-[110px] sm:h-[5px] h-[5px]"
          ></div>
        </h1>
        <h1
          class="text-7xl uppercase font-black opacity-5 overlay-text text-center"
        >
          Gerald
        </h1>
      </div> -->
      <div class="flex flex-col justify-center items-center sm:mt-0 mt-5">
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
            <h1 class="font-black uppercase mb-2 text-xl">
              Web <span class="text-[#009efa]">Developer</span> & Multimedia
              <span class="text-[#009efa]">Artist</span>
            </h1>
            <p class="mb-5">
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
            <button
              class="me-auto text-black font-bold bg-[#009efa] p-5 rounded-full"
            >
              Download CV
              <i class="pi pi-download ms-2" style="font-size: 1.25rem"></i>
            </button>
          </div>
        </div>
        <div class="grid sm:grid-cols-2 gap-4 p-5">
          <div class="rounded-lg min-h-[200px] border border-white"></div>
          <div class="rounded-lg min-h-[200px] border border-white"></div>
          <div class="rounded-lg min-h-[200px] border border-white"></div>
          <div class="rounded-lg min-h-[200px] border border-white"></div>
        </div>
      </div>
    </div>
  </section>
</template>
