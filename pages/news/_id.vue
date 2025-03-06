<template>
  <loader v-if="loading" />
  <section v-else class="press">
    <div class="container">
      <div class="press__inner">
        <Breadcrumb>
          <li class="breadcrumb-item">
            <nuxt-link to="/">
              {{ $t("home") }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item">
            <nuxt-link to="/press/1">
              {{ $t("pressCenter") }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ $t("newsPage") }}
          </li>
        </Breadcrumb>
        <div class="press__content" v-if="news">
          <div class="date" v-if="news && news.publication_date">
            {{ news.publication_date }}
          </div>
          <h2 v-if="news && news.title">{{ news.title }}</h2>
          <img
            v-if="news && news.img_uri"
            :src="`${$config.baseUrl}storage/${news.img_uri}`"
            alt=""
          />
          <div
            v-if="news && news.content"
            v-html="news.content"
            class="content"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Breadcrumb from "@/components/global/Breadcrumb.vue";
import Loader from "~/components/global/Loader.vue";
import {
  ref,
  useRouter,
  useRoute,
  useStore,
  computed,
  onMounted,
} from "@nuxtjs/composition-api";

export default {
  components: {
    Breadcrumb,
    Loader,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const loading = computed(() => store.state.press.isLoading);
    const news = computed(() => store.state.press.newsId.data);

    onMounted(async () => {
      await store.dispatch("press/newsId", route.value.params.id);
    });

    return {
      router,
      route,
      loading,
      store,
      news,
    };
  },
};
</script>

<style lang="scss">
.press {
  &__content {
    padding-top: 24px;
    padding-bottom: 50px;
    max-width: 808px;
    width: 100%;
    .date {
      color: #8a8b8a;
      font-size: 14px;
      font-weight: 400;
    }
    & > h2 {
      margin: 10px 0;
      font-size: 24px;
      font-weight: 700;
      line-height: 125%;
    }
    & > img {
      margin: 0 0 24px 0;
      max-height: 328px;
      width: 100%;
      display: block;
      object-fit: contain;
      object-position: left;
    }
    .content {
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 16px;
      line-height: 125%;
      img {
        margin: 0 0 24px 0;
        max-height: 328px;
        width: 100%;
        display: block;
        object-fit: contain;
        object-position: left;
      }
    }
  }
}

@media (max-width: 580px) {
  .press {
    &__content {
      & > img {
        height: 200px;
      }
    }
  }
}
</style>
