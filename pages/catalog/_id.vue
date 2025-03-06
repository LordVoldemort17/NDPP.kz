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
          <li class="breadcrumb-item">
            <nuxt-link to="/catalog"> {{ $t("catalog") }}</nuxt-link>
          </li>
          <li
            class="breadcrumb-item active"
            aria-current="page"
            v-if="product && product.title"
          >
            {{ product.title }}
          </li>
        </Breadcrumb>
        <div class="current">
          <div class="current-content">
            <div class="current-category">
              {{ $t("feedPhosphates") }}
            </div>
            <p class="current-title" v-if="product && product.title">
              {{ product.title }}
            </p>
            <p class="current-txt" v-if="product && product.code">
              {{ product.code }}
            </p>
            <ul class="current-categories">
              <!-- <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <mask
                    id="mask0_111_13830"
                    style="mask-type: alpha"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                  >
                    <rect width="20" height="20" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_111_13830)">
                    <path
                      d="M4.1665 17.5C3.45816 17.5 2.95469 17.184 2.65608 16.5521C2.35747 15.9201 2.43038 15.3333 2.87483 14.7917L7.49983 9.16667V4.16667H6.6665C6.43038 4.16667 6.23247 4.08681 6.07275 3.92708C5.91302 3.76736 5.83316 3.56944 5.83316 3.33333C5.83316 3.09722 5.91302 2.89931 6.07275 2.73958C6.23247 2.57986 6.43038 2.5 6.6665 2.5H13.3332C13.5693 2.5 13.7672 2.57986 13.9269 2.73958C14.0866 2.89931 14.1665 3.09722 14.1665 3.33333C14.1665 3.56944 14.0866 3.76736 13.9269 3.92708C13.7672 4.08681 13.5693 4.16667 13.3332 4.16667H12.4998V9.16667L17.1248 14.7917C17.5693 15.3333 17.6422 15.9201 17.3436 16.5521C17.045 17.184 16.5415 17.5 15.8332 17.5H4.1665ZM5.83316 15H14.1665L11.3332 11.6667H8.6665L5.83316 15ZM4.1665 15.8333H15.8332L10.8332 9.75V4.16667H9.1665V9.75L4.1665 15.8333Z"
                      fill="#1C1B1F"
                    />
                  </g>
                </svg>
                Химическая формула: Ca₃(PO₄)₂
              </li> -->
              <li v-if="product && product.sort">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <mask
                    id="mask0_111_13842"
                    style="mask-type: alpha"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                  >
                    <rect width="20" height="20" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_111_13842)">
                    <path
                      d="M5.8335 16.6668V15.0002H14.1668V16.6668H5.8335ZM9.16683 13.3335V6.521L7.00016 8.66683L5.8335 7.50016L10.0002 3.3335L14.1668 7.50016L13.0002 8.66683L10.8335 6.521V13.3335H9.16683Z"
                      fill="#1C1B1F"
                    />
                  </g>
                </svg>
                {{ $t("sort") }}: {{ product.sort }}
              </li>
            </ul>
            <div
              class="current-block"
              v-if="product && product.usage_description"
            >
              <div class="current-block-header" @click="usageTab = !usageTab">
                <div class="txt">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <mask
                      id="mask0_668_820"
                      style="mask-type: alpha"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                    >
                      <rect width="20" height="20" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_668_820)">
                      <path
                        d="M9.1665 14.1666H10.8332V9.16663H9.1665V14.1666ZM9.99984 7.49996C10.2359 7.49996 10.4339 7.4201 10.5936 7.26038C10.7533 7.10065 10.8332 6.90274 10.8332 6.66663C10.8332 6.43052 10.7533 6.2326 10.5936 6.07288C10.4339 5.91315 10.2359 5.83329 9.99984 5.83329C9.76373 5.83329 9.56581 5.91315 9.40609 6.07288C9.24637 6.2326 9.1665 6.43052 9.1665 6.66663C9.1665 6.90274 9.24637 7.10065 9.40609 7.26038C9.56581 7.4201 9.76373 7.49996 9.99984 7.49996ZM9.99984 18.3333C8.84706 18.3333 7.76373 18.1145 6.74984 17.677C5.73595 17.2395 4.854 16.6458 4.104 15.8958C3.354 15.1458 2.76025 14.2638 2.32275 13.25C1.88525 12.2361 1.6665 11.1527 1.6665 9.99996C1.6665 8.84718 1.88525 7.76385 2.32275 6.74996C2.76025 5.73607 3.354 4.85413 4.104 4.10413C4.854 3.35413 5.73595 2.76038 6.74984 2.32288C7.76373 1.88538 8.84706 1.66663 9.99984 1.66663C11.1526 1.66663 12.2359 1.88538 13.2498 2.32288C14.2637 2.76038 15.1457 3.35413 15.8957 4.10413C16.6457 4.85413 17.2394 5.73607 17.6769 6.74996C18.1144 7.76385 18.3332 8.84718 18.3332 9.99996C18.3332 11.1527 18.1144 12.2361 17.6769 13.25C17.2394 14.2638 16.6457 15.1458 15.8957 15.8958C15.1457 16.6458 14.2637 17.2395 13.2498 17.677C12.2359 18.1145 11.1526 18.3333 9.99984 18.3333Z"
                        fill="#1D1D1B"
                      />
                    </g>
                  </svg>
                  <p>{{ $t("application") }}</p>
                </div>
                <div class="arrow" :class="{ 'arrow-active': usageTab }">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <mask
                      id="mask0_668_824"
                      style="mask-type: alpha"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                    >
                      <rect width="20" height="20" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_668_824)">
                      <path
                        d="M5.8335 11.6667L10.0002 7.5L14.1668 11.6667H5.8335Z"
                        fill="#1D1D1B"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div class="current-description" v-if="usageTab">
                {{ product.usage_description }}
              </div>
            </div>
            <div
              class="current-block"
              v-if="product && product.packaging_description"
            >
              <div
                class="current-block-header"
                @click="packageTab = !packageTab"
              >
                <div class="txt">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <mask
                      id="mask0_668_78"
                      style="mask-type: alpha"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                    >
                      <rect width="20" height="20" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_668_78)">
                      <path
                        d="M9.16667 18.1041V10.4791L2.5 6.62496V13.3125C2.5 13.618 2.57292 13.8958 2.71875 14.1458C2.86458 14.3958 3.06944 14.5972 3.33333 14.75L9.16667 18.1041ZM10.8333 18.1041L16.6667 14.75C16.9306 14.5972 17.1354 14.3958 17.2813 14.1458C17.4271 13.8958 17.5 13.618 17.5 13.3125V6.62496L10.8333 10.4791V18.1041ZM14.1458 6.64579L16.6042 5.20829L10.8333 1.89579C10.5694 1.74301 10.2917 1.66663 10 1.66663C9.70833 1.66663 9.43056 1.74301 9.16667 1.89579L7.52083 2.83329L14.1458 6.64579ZM10 9.04163L12.4792 7.62496L5.875 3.79163L3.375 5.22913L10 9.04163Z"
                        fill="#1D1D1B"
                      />
                    </g>
                  </svg>
                  <p>{{ $t("packaging") }}</p>
                </div>
                <div class="arrow" :class="{ 'arrow-active': packageTab }">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <mask
                      id="mask0_668_824"
                      style="mask-type: alpha"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                    >
                      <rect width="20" height="20" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_668_824)">
                      <path
                        d="M5.8335 11.6667L10.0002 7.5L14.1668 11.6667H5.8335Z"
                        fill="#1D1D1B"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div class="current-description" v-if="packageTab">
                {{ product.packaging_description }}
              </div>
            </div>
            <div
              class="current-block"
              v-if="product && product.logistics_description"
            >
              <div
                class="current-block-header"
                @click="logisticTab = !logisticTab"
              >
                <div class="txt">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <mask
                      id="mask0_668_1102"
                      style="mask-type: alpha"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                    >
                      <rect width="20" height="20" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_668_1102)">
                      <path
                        d="M5.00016 16.6667C4.30572 16.6667 3.71544 16.4237 3.22933 15.9375C2.74322 15.4514 2.50016 14.8612 2.50016 14.1667H0.833496V5.00004C0.833496 4.54171 0.996691 4.14935 1.32308 3.82296C1.64947 3.49657 2.04183 3.33337 2.50016 3.33337H14.1668V6.66671H16.6668L19.1668 10V14.1667H17.5002C17.5002 14.8612 17.2571 15.4514 16.771 15.9375C16.2849 16.4237 15.6946 16.6667 15.0002 16.6667C14.3057 16.6667 13.7154 16.4237 13.2293 15.9375C12.7432 15.4514 12.5002 14.8612 12.5002 14.1667H7.50016C7.50016 14.8612 7.25711 15.4514 6.771 15.9375C6.28488 16.4237 5.69461 16.6667 5.00016 16.6667ZM5.00016 15C5.23627 15 5.43419 14.9202 5.59391 14.7605C5.75363 14.6007 5.8335 14.4028 5.8335 14.1667C5.8335 13.9306 5.75363 13.7327 5.59391 13.573C5.43419 13.4132 5.23627 13.3334 5.00016 13.3334C4.76405 13.3334 4.56613 13.4132 4.40641 13.573C4.24669 13.7327 4.16683 13.9306 4.16683 14.1667C4.16683 14.4028 4.24669 14.6007 4.40641 14.7605C4.56613 14.9202 4.76405 15 5.00016 15ZM15.0002 15C15.2363 15 15.4342 14.9202 15.5939 14.7605C15.7536 14.6007 15.8335 14.4028 15.8335 14.1667C15.8335 13.9306 15.7536 13.7327 15.5939 13.573C15.4342 13.4132 15.2363 13.3334 15.0002 13.3334C14.7641 13.3334 14.5661 13.4132 14.4064 13.573C14.2467 13.7327 14.1668 13.9306 14.1668 14.1667C14.1668 14.4028 14.2467 14.6007 14.4064 14.7605C14.5661 14.9202 14.7641 15 15.0002 15ZM14.1668 10.8334H17.7085L15.8335 8.33337H14.1668V10.8334Z"
                        fill="#1D1D1B"
                      />
                    </g>
                  </svg>
                  <p>{{ $t("transportAndApplication") }}</p>
                </div>
                <div class="arrow" :class="{ 'arrow-active': logisticTab }">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <mask
                      id="mask0_668_824"
                      style="mask-type: alpha"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                    >
                      <rect width="20" height="20" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_668_824)">
                      <path
                        d="M5.8335 11.6667L10.0002 7.5L14.1668 11.6667H5.8335Z"
                        fill="#1D1D1B"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div class="current-description" v-if="logisticTab">
                {{ product.logistics_description }}
              </div>
            </div>
            <div class="current-sert" v-if="product && product.document_uri">
              <p>Сертификаты::</p>
              <div class="current-sert__block" v-if="parsedUriSert">
                <div v-for="(item, index) in parsedUriSert" :key="index">
                  <span>{{ item.original_name }}</span>
                  <button @click="view(item)">Посмотреть</button>
                </div>
              </div>
            </div>
            <div
              class="current-sert"
              v-if="product && product.characteristics_uri"
            >
              <p>{{ $t("characteristics") }}:</p>
              <div class="current-sert__block" v-if="parsedUri">
                <div v-for="(item, index) in parsedUri" :key="index">
                  <span>characteristics.pdf</span>
                  <button @click="view(item)">Посмотреть</button>
                </div>
              </div>
            </div>
            <div
              class="current-table"
              v-if="product && product.characteristics"
            >
              <p class="current-h">
                {{ $t("productionIndicators") }}
              </p>
              <div class="current-table__body">
                <table>
                  <thead>
                    <th>№</th>
                    <th>{{ $t("indicatorName") }}</th>
                    <th>{{ $t("indicatorValue") }}</th>
                  </thead>
                  <tr v-for="(item, i) in product.characteristics" :key="i">
                    <td>{{ item.id ?? "" }}</td>
                    <td>{{ item.title ?? "" }}</td>
                    <td>{{ item.value ?? "" }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="current-img">
            <img
              v-if="product && product.photo_uri"
              :src="`${$config.baseUrl}storage/${product.photo_uri}`"
              alt=""
            />
            <div class="logo">
              <img src="../../images/product-logo.svg" alt="" />
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
  useRoute,
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
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const loading = computed(() => store.state.catalog.isLoading);
    const product = computed(() => store.state.catalog.product.data);

    const parsedUri = computed(() => {
      if (product.value && product.value.characteristics_uri) {
        try {
          return JSON.parse(product.value.characteristics_uri);
        } catch (e) {
          console.error("Ошибка при разборе URI:", e);
          return [];
        }
      }
      return [];
    });

    const parsedUriSert = computed(() => {
      if (product.value && product.value.document_uri) {
        try {
          return JSON.parse(product.value.document_uri);
        } catch (e) {
          console.error("Ошибка при разборе URI:", e);
          return [];
        }
      }
      return [];
    });

    const usageTab = ref(false);
    const packageTab = ref(false);
    const logisticTab = ref(false);

    const view = (item) => {
      if (item && item.download_link) {
        const url = `${$config.baseUrl}storage/${item.download_link}`;
        window.open(url, "_blank");
      }
    };

    onMounted(async () => {
      await store.dispatch("catalog/productId", route.value.params.id);
    });

    return {
      router,
      route,
      loading,
      store,
      product,
      usageTab,
      packageTab,
      logisticTab,
      view,
      parsedUri,
      parsedUriSert,
    };
  },
};
</script>

<style></style>
