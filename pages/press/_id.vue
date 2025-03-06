<template>
  <section class="career">
    <div class="career__inner">
      <div class="container">
        <Breadcrumb>
          <li class="breadcrumb-item">
            <nuxt-link to="/">{{ $t("home") }}</nuxt-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ $t("pressCenter") }}
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
import { ref, onMounted, watch } from "@nuxtjs/composition-api";
import { useRouter, useRoute } from "@nuxtjs/composition-api";
import News from "../../components/partials/Press/News.vue";
import Media from "../../components/partials/Press/Media.vue";
import FootballTable from "~/components/partials/Press/FootballTable.vue";

export default {
  components: {
    Breadcrumb,
    News,
    Media,
    FootballTable,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const tabs = ref([
      { name: "newsAndEvents", component: "News" },
      { name: "FootballTable", component: "FootballTable" },
      { name: "mediaGallery", component: "Media" },
    ]);

    const activeTab = ref(0);

    const changeTab = (index) => {
      activeTab.value = index;
      router.push(`/press/${index + 1}`);
    };

    const setActiveTabFromRoute = () => {
      const routeId = parseInt(route.value.params.id);
      if (routeId && routeId > 0 && routeId <= tabs.value.length) {
        activeTab.value = routeId - 1;
      } else {
        activeTab.value = 0;
        router.push("/press/1");
      }
    };

    watch(
      () => route.value.params.id,
      () => {
        setActiveTabFromRoute();
      }
    );

    // Инициализация при монтировании компонента
    onMounted(() => {
      setActiveTabFromRoute();
    });

    return {
      tabs,
      activeTab,
      changeTab,
    };
  },
};
</script>

<style></style>
