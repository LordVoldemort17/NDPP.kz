<template>
  <loader v-if="loading" />
  <section v-else class="news">
    <div class="container">
      <div class="news__inner">
        <div class="news__all" v-if="news">
          <p class="title">{{ $t("allNews") }}</p>
          <div class="cards">
            <div
              class="news-card"
              v-for="(item, i) in news"
              :key="i"
              @click="redirect(item.id)"
            >
              <div class="content">
                <h3>{{ item.title }}</h3>
                <p v-html="item.firstParagraph"></p>
                <span>{{ item.created_at }}</span>
              </div>
              <div class="img">
                <img
                  v-if="item.img_uri"
                  :src="`${$config.baseUrl}storage/${item.img_uri}`"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  ref,
  useRouter,
  onMounted,
  useRoute,
  useStore,
  computed,
  watch,
} from "@nuxtjs/composition-api";
import Loader from "~/components/global/Loader.vue";

export default {
  components: {
    Loader,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const loading = computed(() => store.state.press.isLoading);

    const news = computed(() => {
      return store.state.press.news.data.map((item) => {
        // Проверяем, что content существует и является строкой
        if (typeof item.content === "string") {
          const firstParagraphMatch = item.content.match(/<p>(.*?)<\/p>/s);
          const firstParagraph =
            firstParagraphMatch && firstParagraphMatch[1]
              ? firstParagraphMatch[1]
              : "";
          return {
            ...item,
            firstParagraph: firstParagraph,
          };
        } else {
          // Если content отсутствует или не является строкой, возвращаем item как есть
          return item;
        }
      });
    });

    onMounted(async () => {
      await store.dispatch("press/fetchNewsData");
    });

    const redirect = (id) => {
      if (id) {
        router.push("/news/" + id);
      }
    };

    return {
      store,
      loading,
      news,
      router,
      redirect,
    };
  },
};
</script>

<style></style>
