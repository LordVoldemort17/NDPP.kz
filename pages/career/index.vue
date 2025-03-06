<template>
  <section class="career">
    <div class="career__inner">
      <div class="container">
        <Breadcrumb>
          <li class="breadcrumb-item">
            <nuxt-link to="/">{{ $t("home") }}</nuxt-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ $t("career") }}
          </li>
        </Breadcrumb>
        <div class="career__tabs">
          <span
            v-for="(tab, index) in tabs"
            :key="index"
            @click="changeTab(index)"
            :class="{ active: activeTab === index }"
          >
            {{ $t(tab.name) }}
          </span>
        </div>
      </div>
      <div class="career__content">
        <component :is="tabs[activeTab].component"></component>
      </div>
    </div>
  </section>
</template>

<script>
import Breadcrumb from "@/components/global/Breadcrumb.vue";
import { ref, useStore, computed, onMounted } from "@nuxtjs/composition-api";
import CareerProgram from "../../components/partials/Career/CareerProgram.vue";
import Vacancy from "../../components/partials/Career/Vacancy.vue";

export default {
  components: {
    Breadcrumb,
    CareerProgram,
    Vacancy,
  },
  setup() {
    const tabs = ref([
      { name: "careerPrograms", component: "CareerProgram" },
      { name: "vacancies", component: "Vacancy" },
    ]);

    const activeTab = ref(0);

    const changeTab = (index) => {
      activeTab.value = index;
    };

    return {
      tabs,
      activeTab,
      changeTab,
    };
  },
};
</script>

<style></style>
