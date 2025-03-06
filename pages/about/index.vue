<template>
  <loader v-if="loading" />
  <div class="about" v-else>
    <div class="container">
      <div class="about__inner">
        <Breadcrumb>
          <li class="breadcrumb-item">
            <nuxt-link to="/">
              {{ $t("home") }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ $t("about") }}
          </li>
        </Breadcrumb>
        <section class="about-banner" v-if="about && about.about_us">
          <h2>{{ about.about_us.title }}</h2>
          <p>
            {{ about.about_us.description }}
          </p>
        </section>
        <section class="about-history" v-if="about && about.history">
          <p class="title">{{ $t("history") }}</p>
          <div class="about-history__tabs">
            <span
              v-for="(tab, index) in about.history"
              :key="index"
              @click="changeTab(index)"
              :class="{ active: activeTab === index }"
              v-if="
                tab.translated_histories && tab.translated_histories.length > 0
              "
            >
              {{ tab.title }}
            </span>
          </div>
          <div class="about-history__content" v-if="about.history">
            <div
              class="card"
              v-for="(item, i) in about.history[activeTab].translated_histories"
              :key="i"
            >
              <h3>{{ item.title }}</h3>
              <p v-html="item.content"></p>
            </div>
          </div>
        </section>
      </div>
    </div>
    <section class="about-mission" v-if="about && about.missions">
      <div class="container">
        <div class="about-mission__inner">
          <p class="title">{{ about.about_us.mission_title }}</p>
          <p class="about-description">
            {{ about.about_us.mission_description }}
          </p>
          <div class="about-mission__cards" v-if="about.missions">
            <div
              class="about-mission__card"
              v-for="(item, i) in about.missions"
              :key="i"
            >
              <div class="icon">
                <img
                  v-if="item.ico_uri"
                  :src="`${$config.baseUrl}storage/${item.ico_uri}`"
                  alt=""
                />
              </div>
              <span class="title">{{ item.title }}</span>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="about-staff" v-if="about && about.team">
      <div class="container">
        <div class="about-staff__inner">
          <p class="title">{{ $t("companyLeadership") }}</p>
          <div class="about-staff__cards">
            <div class="card" v-for="(item, i) in about.team" :key="i">
              <div>
                <span>{{ item.title }} </span>
                <p>{{ item.role }}</p>
              </div>
              <img
                v-if="item.img_uri"
                :src="`${$config.baseUrl}storage/${item.img_uri}`"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="about-table" v-if="about && about.production_performance">
      <div class="container">
        <div class="about-table__inner">
          <p class="title">{{ $t("productionIndicators") }}</p>
          <div class="about-table__body">
            <table>
              <thead>
                <th>{{ $t("products") }}</th>
                <th>{{ $t("unitsOfMeasurement") }}</th>
                <th>2021 г.</th>
                <th>2022 г.</th>
                <th>2023 г.</th>
              </thead>
              <tr v-for="(item, i) in about.production_performance" :key="i">
                <td>{{ item.title ?? "" }}</td>
                <td>{{ item.units_of_measurement ?? "" }}</td>
                <td>{{ item.value_2021 ?? "" }}</td>
                <td>{{ item.value_2022 ?? "" }}</td>
                <td>{{ item.value_2023 ?? "" }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Breadcrumb from "@/components/global/Breadcrumb.vue";
import Loader from "~/components/global/Loader.vue";

import {
  ref,
  onMounted,
  useRoute,
  useStore,
  computed,
  watch,
} from "@nuxtjs/composition-api";

export default {
  components: {
    Breadcrumb,
    Loader,
  },
  setup() {
    const store = useStore();

    const loading = computed(() => store.state.about.isLoading);

    const about = computed(() => store.state.about.data.data);

    const activeTab = ref(0);

    const changeTab = (index) => {
      activeTab.value = index;
    };

    onMounted(async () => {
      await store.dispatch("about/fetchAboutData");
    });

    return {
      about,
      store,
      activeTab,
      changeTab,
      loading,
    };
  },
};
</script>

<style></style>
