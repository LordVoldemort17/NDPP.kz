<template>
  <loader v-if="loading" />
  <section v-else class="resp">
    <div class="container">
      <div class="resp__inner">
        <Breadcrumb>
          <li class="breadcrumb-item">
            <nuxt-link to="/">{{ $t("home") }}</nuxt-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ $t("responsibility") }}
          </li>
        </Breadcrumb>
        <div class="resp__title">
          <p class="title">{{ $t("responsibility") }}</p>
        </div>
        <div class="resp__content">
          <nav class="resp__menu">
            <ul v-if="responsibility">
              <li
                v-for="(item, i) in responsibility"
                :key="i"
                @click="setActiveTab(i)"
                :class="{ active: i === activeTab }"
              >
                <span
                  class="icon"
                  v-if="item && item.icon"
                  v-html="item.icon"
                ></span>
                <p v-if="item && item.title">
                  {{ item.title }}
                </p>
              </li>
            </ul>
          </nav>
          <div class="resp__main" v-if="activeTabContent">
            <h2 v-if="activeTabContent.title">{{ activeTabContent.title }}</h2>
            <div
              v-if="activeTabContent.content"
              v-html="activeTabContent.content"
            ></div>
            <!-- <p v-for="(item, i) in activeTabContent.description" :key="i">
              {{ item }}
            </p>
            <img
              v-if="activeTabContent.img"
              :src="require(`~/images/${activeTabContent.img}`)"
              alt=""
            />
            <p v-for="(item, i) in activeTabContent.subtitle" :key="i">
              {{ item }}
            </p> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Loader from "~/components/global/Loader.vue";
import Breadcrumb from "@/components/global/Breadcrumb.vue";
import {
  onMounted,
  ref,
  useStore,
  computed,
  useRoute,
  useRouter,
  watch,
} from "@nuxtjs/composition-api";

export default {
  components: { Breadcrumb, Loader },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const activeTab = ref(0);
    const store = useStore();
    const loading = computed(() => store.state.responsibilities.isLoading);
    const responsibility = computed(
      () => store.state.responsibilities.data.data
    );

    const activeTabContent = computed(() => {
      return responsibility.value[activeTab.value];
    });

    const setActiveTab = (index) => {
      activeTab.value = index;
      const newId = index + 1;
      router.push("/responsibility/" + newId.toString());
    };

    const setActiveTabFromRoute = () => {
      const routeId = parseInt(route.value.params.id);
      if (routeId && routeId > 0 && routeId <= responsibility.value.length) {
        activeTab.value = routeId - 1;
      } else {
        activeTab.value = 0;
        router.push("/responsibility/1"); // Здесь исправлено
      }
    };

    watch(
      () => route.value.params.id,
      (newId) => {
        setActiveTabFromRoute();
      }
    );

    onMounted(async () => {
      await store.dispatch("responsibilities/fetchAboutData");
      setActiveTabFromRoute();
    });

    return {
      loading,
      store,
      responsibility,
      activeTab,
      setActiveTab,
      activeTabContent,
      router,
      route,
    };
  },
};
</script>

<style lang="scss">
.resp {
  padding: 24px 0 50px;
  &__title {
    padding-top: 20px;
  }
  &__content {
    display: grid;
    grid-template-columns: 288px 1fr;
    gap: 24px;
    padding-top: 24px;
    ul {
      font-size: 16px;
      font-weight: 500;
      display: flex;
      flex-direction: column;
      gap: 10px;
      li {
        display: flex;
        align-items: center;
        padding: 10px;
        cursor: pointer;
        transition: 0.2s;
        .icon {
          width: 24px;
          height: 24px;
          margin-right: 10px;
          display: block;
          svg {
            width: 24px;
            height: 24px;
            transition: 0.2s;
            path {
              transition: 0.2s;
            }
          }
        }
        p {
          font-size: 16px;
          font-weight: 500;
          display: block;
          width: calc(100% - 34px);
        }
        &.active {
          color: #f7a600;
          background-color: #fff3df;
          .icon {
            svg {
              path {
                fill: #f7a600;
              }
            }
          }
        }
      }
    }
  }
  &__main {
    display: flex;
    flex-direction: column;
    gap: 10px;
    h2 {
      font-size: 20px;
      font-weight: 500;
    }
    p {
      font-size: 16px;
      margin: 0;
      line-height: 20px;
    }
    img {
      width: 100%;
      max-height: 420px;
    }
  }
}

@media screen and (max-width: 768px) {
  .resp {
    padding: 20px 0 36px 0;
    &__title {
      display: none;
    }
    &__content {
      padding-top: 20px;
      grid-template-columns: 1fr;
    }
    &__menu {
      display: none;
    }
    &__main {
      gap: 8px;
      img {
        margin: 10px 0;
      }
      h2 {
        font-size: 18px;
      }
      p {
        font-size: 14px;
        line-height: 18px;
      }
    }
  }
}
</style>
