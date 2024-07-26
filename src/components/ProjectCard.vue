<script setup>
import { ref, defineProps, computed } from "vue";

const showFullDescription = ref(false);

const props = defineProps({
  project: Object,
});

const truncatedDescription = computed(() => {
  let description = props.project.description;
  if (!showFullDescription.value) {
    description = description.substring(0, 90) + "...";
  }

  return description;
});

const toggleShowFullDescription = () => {
  showFullDescription.value = !showFullDescription.value;
};
</script>

<template>
  <!-- Project Card -->
  <div
    class="border-2 mx-auto border-[#383838] ssm:min-h-[600px] sm:max-h-[600px] rounded-xl text-white overflow-hidden flex flex-col"
  >
    <div
      class="flex justify-center items-center overflow-hidden sm:max-h-[200px] sm:min-h-[200px]"
    >
      <img class="rounded-t-xl w-full" :src="project.img" />
    </div>
    <div class="p-5 flex-grow">
      <div class="mb-2">
        <h1 class="text-xl font-bold text-[#009efa] text-center">
          {{ project.title }}
        </h1>
      </div>
      <div><hr class="my-2" /></div>
      <div class="overflow-hidden">
        <p>
          {{ truncatedDescription }}
          <span @click="toggleShowFullDescription" class="text-[#009efa]">
            {{ showFullDescription ? "Show Less" : "Show More" }}</span
          >
        </p>
      </div>
      <!-- Stack Used -->
    </div>

    <!-- Portfolio Live & Code Button -->
    <div v-if="project.hasCode === true" class="grid grid-cols-2 mt-auto">
      <a :href="project.live" target="_blank"
        ><button
          class="bg-[#009efa] min-w-full rounded-bl-xl font-bold uppercase min-h-[50px]"
        >
          Live
        </button></a
      >
      <a :href="project.code" target="_blank"
        ><button
          class="bg-[#e93e63] min-w-full rounded-br-xl font-bold uppercase min-h-[50px]"
        >
          Code
        </button></a
      >
    </div>
    <!-- Portfolio Single Button -->
    <div v-else class="mt-auto">
      <button
        class="bg-[#009efa] min-w-full rounded-b-xl font-bold uppercase min-h-[50px]"
      >
        Go to Portolio
      </button>
    </div>
  </div>
</template>
