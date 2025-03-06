<template>
  <loader v-if="loading" />
  <section v-else class="catalog">
    <div class="container">
      <div class="catalog__inner">
        <Breadcrumb>
          <li class="breadcrumb-item">
            <nuxt-link to="/">
              {{ $t("home") }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ $t("catalog") }}
          </li>
        </Breadcrumb>
        <p class="title">
          {{ $t("catalog") }}
        </p>
        <div class="actions">
          <input
            @input="loadFilter"
            v-model="search"
            type="text"
            placeholder="Поиск"
          />
          <select
            @change="loadFilter"
            v-model="categorySelected"
            name=""
            id=""
            v-if="catalogs && catalogs.categories"
          >
            <option value="">{{ $t("category") }}</option>
            <option
              :value="item.id"
              v-for="(item, i) in catalogs.categories"
              :key="i"
            >
              {{ item.title }}
            </option>
          </select>
          <select
            @change="loadFilter"
            v-model="sortSelected"
            v-if="catalogs && catalogs.sorts"
          >
            <option value="">{{ $t("sort") }}</option>
            <option
              :value="item.id"
              v-for="(item, i) in catalogs.sorts"
              :key="i"
            >
              {{ item.title }}
            </option>
          </select>
        </div>
        <div class="catalog__cards" v-if="catalogs && catalogs.products">
          <div
            class="catalog-card"
            @click="openDetail(item.id)"
            v-for="(item, i) in catalogs.products"
            :key="i"
          >
            <div class="catalog-card__img">
              <img
                v-if="item.photo_uri"
                :src="`${$config.baseUrl}storage/${item.photo_uri}`"
                alt=""
              />
            </div>
            <span class="catalog-card__suptitle" v-if="item.code">
              {{ item.code }}
            </span>
            <p class="catalog-card__title" v-if="item.title">
              {{ item.title }}
            </p>
            <span
              v-if="item.category"
              class="catalog-card__category"
              :style="`background: #B0117D`"
            >
              {{ item.category ?? "" }}
            </span>
          </div>
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
    const store = useStore();
    const loading = computed(() => store.state.catalog.isLoading);
    const catalogs = computed(() => store.state.catalog.data.data);

    const search = ref("");
    const categorySelected = ref("");
    const sortSelected = ref("");

    const openDetail = (event) => {
      router.push("/catalog/" + event);
    };

    onMounted(async () => {
      await store.dispatch("catalog/fetchAboutData");
    });

    const loadFilter = () => {
      store.dispatch("catalog/fetchFilterData", {
        category: categorySelected.value,
        sort: sortSelected.value,
        search: search.value,
      });
    };

    return {
      router,
      openDetail,
      store,
      loading,
      catalogs,
      search,
      categorySelected,
      sortSelected,
      loadFilter,
    };
  },
};
</script>

<style></style>
