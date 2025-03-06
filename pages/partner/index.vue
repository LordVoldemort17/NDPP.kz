<template>
  <loader v-if="loading" />
  <section v-else class="partner">
    <div class="container">
      <div class="partner__inner">
        <Breadcrumb>
          <li class="breadcrumb-item">
            <nuxt-link to="/">
              {{ $t("home") }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ $t("partners") }}
          </li>
        </Breadcrumb>
        <p class="title">{{ $t("partners") }}</p>
        <p class="description" v-if="partners && partners.content">
          {{ partners.content.title }}
        </p>
        <p class="partner__description" v-if="partners && partners.content">
          {{ partners.content.description }}
        </p>
        <div class="partner__cards" v-if="partners && partners.docs">
          <div
            class="partner__card"
            v-for="(item, i) in partners.docs"
            :key="i"
          >
            <iframe
              v-if="item.fullUri"
              :src="item.fullUri"
              frameborder="0"
            ></iframe>
            <p>
              {{ item.title }}
            </p>
            <div class="actions">
              <button class="main-light-button" @click="view(item.uri)">
                {{ $t("view") }}
              </button>
              <!-- <button class="main-button" @click="download(item.uri)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <mask
                    id="mask0_465_3708"
                    style="mask-type: alpha"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="18"
                    height="18"
                  >
                    <rect width="18" height="18" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_465_3708)">
                    <path
                      d="M9 12L5.25 8.25L6.3 7.1625L8.25 9.1125V3H9.75V9.1125L11.7 7.1625L12.75 8.25L9 12ZM4.5 15C4.0875 15 3.73438 14.8531 3.44063 14.5594C3.14688 14.2656 3 13.9125 3 13.5V11.25H4.5V13.5H13.5V11.25H15V13.5C15 13.9125 14.8531 14.2656 14.5594 14.5594C14.2656 14.8531 13.9125 15 13.5 15H4.5Z"
                      fill="#1D1D1B"
                    />
                  </g>
                </svg>
                {{ $t("download") }}
              </button> -->
            </div>
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
  useContext,
} from "@nuxtjs/composition-api";

export default {
  components: {
    Breadcrumb,
    Loader,
  },
  setup() {
    const { $config } = useContext();
    const store = useStore();
    const loading = computed(() => store.state.partners.isLoading);
    const partners = computed(() => {
      const data = store.state.partners.data.data;

      // Проверяем, существует ли массив 'docs' и обрабатываем его
      if (data && Array.isArray(data.docs)) {
        const processedDocs = data.docs.map((partner) => {
          let fullUri = "";
          if (partner.uri) {
            try {
              const parsedUri = JSON.parse(partner.uri);
              if (parsedUri.length > 0 && parsedUri[0].download_link) {
                fullUri = `${$config.baseUrl}storage/${parsedUri[0].download_link}`;
              }
            } catch (e) {
              console.error("Ошибка при разборе URI:", e);
            }
          }
          return { ...partner, fullUri };
        });

        // Возвращаем обработанный массив 'docs' вместе с остальными данными
        return { ...data, docs: processedDocs };
      }

      return data; // Возвращаем данные как есть, если 'docs' не существует
    });
    onMounted(async () => {
      await store.dispatch("partners/fetchAboutData");
    });

    const view = (uri) => {
      if (uri) {
        try {
          const parsedUri = JSON.parse(uri);
          if (parsedUri.length > 0 && parsedUri[0].download_link) {
            const url = `${$config.baseUrl}storage/${parsedUri[0].download_link}`;
            window.open(url, "_blank"); // Открывает ссылку в новой вкладке
          }
        } catch (e) {
          console.error("Ошибка при разборе URI:", e);
        }
      }
    };

    const download = (uri) => {
      if (uri) {
        try {
          const parsedUri = JSON.parse(uri);
          if (parsedUri.length > 0 && parsedUri[0].download_link) {
            const url = `${$config.baseUrl}storage/${parsedUri[0].download_link}`;
            const link = document.createElement("a");
            link.href = url;
            link.download = parsedUri[0].original_name || "download.pdf"; // Предполагается, что original_name - это имя файла
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Удаляем элемент после использования
          }
        } catch (e) {
          console.error("Ошибка при скачивании файла:", e);
        }
      }
    };

    return {
      store,
      loading,
      partners,
      view,
      download,
    };
  },
};
</script>

<style></style>
