<template>
  <loader v-if="loading" />
  <div v-else class="program">
    <div class="program-main" v-if="program && program.first_block">
      <div class="container">
        <div class="program-main__inner">
          <div class="info">
            <h3
              v-if="program && program.first_block && program.first_block.title"
              v-html="program.first_block.title"
            ></h3>
            <p
              v-if="
                program &&
                program.first_block &&
                program.first_block.description
              "
            >
              {{ program.first_block.description }}
            </p>
          </div>
          <div class="img">
            <img
              v-if="
                program && program.first_block && program.first_block.img_uri
              "
              :src="`${$config.baseUrl}storage/${program.first_block.img_uri}`"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div class="program-about">
      <div class="container">
        <div class="program-about__inner">
          <div
            class="info"
            v-if="program && program.budget && program.budget.content"
          >
            <h3>{{ program.budget.content.title }}</h3>
            <div v-html="program.budget.content.description"></div>
          </div>
          <div
            class="cards"
            v-if="program && program.budget && program.budget.values"
          >
            <div
              class="card"
              v-for="(item, i) in program.budget.values"
              :key="i"
            >
              <span v-if="item.title">
                {{ item.title }}
              </span>
              <p v-if="item.value">
                {{ item.value }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="program-invests">
      <div class="container">
        <div class="program-invests__inner">
          <div
            class="info"
            v-if="program && program.grant && program.grant.content"
          >
            <h3>
              {{ program.grant.content.title }}
            </h3>
            <p v-html="program.grant.content.description"></p>
          </div>
          <div
            class="cards"
            v-if="program && program.grant && program.grant.values"
          >
            <div
              class="card"
              v-for="(item, i) in program.grant.values"
              :key="i"
            >
              <div class="icon" v-if="item.imageUrl">
                <img :src="item.imageUrl" alt="" />
              </div>
              <span v-if="item.title">
                {{ item.title }}
              </span>
              <p v-if="item.description">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "~/components/global/Loader.vue";
import {
  ref,
  useStore,
  computed,
  onMounted,
  useContext,
} from "@nuxtjs/composition-api";

export default {
  components: {
    Loader,
  },
  setup() {
    const { $config } = useContext();
    const store = useStore();
    const loading = computed(() => store.state.career.isLoading);
    const program = computed(() => {
      return {
        ...store.state.career.data.data,
        grant: {
          ...store.state.career.data.data.grant,
          values: store.state.career.data.data.grant.values.map((item) => {
            let imageUrl = "";
            if (item.ico_uri) {
              try {
                const parsedUri = JSON.parse(item.ico_uri);
                if (parsedUri.length > 0 && parsedUri[0].download_link) {
                  imageUrl = `${$config.baseUrl}storage/${parsedUri[0].download_link}`;
                }
              } catch (e) {
                console.error("Ошибка при разборе URI:", e);
              }
            }
            return {
              ...item,
              imageUrl,
            };
          }),
        },
      };
    });

    onMounted(async () => {
      await store.dispatch("career/fetchCareersData");
    });

    return {
      program,
      loading,
      store,
    };
  },
};
</script>

<style></style>
