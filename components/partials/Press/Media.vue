<template>
  <div>
    <loader v-if="loading" />
    <section v-else class="gallery">
      <div class="container">
        <div class="gallery__inner">
          <div class="gallery__block" v-for="(item, i) in gallery" :key="i">
            <p class="gallery__title" v-if="item.title">
              {{ item.title }}
            </p>
            <div class="gallery__items" v-if="item.content">
              <div
                v-for="(mediaItem, idx) in parseContent(item.content)"
                :key="idx"
                :class="{ large: isLarge(idx, windowWidth) }"
                @click="
                  openModalWithSlider(
                    parseContent(item.content),
                    item.title,
                    idx
                  )
                "
              >
                <img
                  style="cursor: pointer"
                  v-if="isImage(mediaItem)"
                  :src="`${$config.baseUrl}storage/${mediaItem}`"
                  alt=""
                />
                <!-- <div v-if="isVideo(mediaItem)" class="play-button">Play</div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="gallery__modal" v-if="isModalOpen">
      <div class="gallery__modal__card">
        <div class="main-slider">
          <div
            v-for="(slide, index) in galleryImages"
            :key="index"
            v-show="index === currentIndex"
          >
            <img :src="`${$config.baseUrl}storage/${slide}`" alt="" />
          </div>
          <p class="main-slider__index">
            <span> {{ currentTitle }}</span>
            <b>—</b>
            <span>{{ currentIndex + 1 }} из {{ galleryImages.length }}</span>
          </p>
          <button class="left" @click="prevSlide">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <mask
                id="mask0_742_4292"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_742_4292)">
                <path
                  d="M16 22L6 12L16 2L17.775 3.775L9.55 12L17.775 20.225L16 22Z"
                  fill="#F7A600"
                />
              </g>
            </svg>
          </button>
          <button class="right" @click="nextSlide">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <mask
                id="mask0_742_12"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_742_12)">
                <path
                  d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2L18.025 12L8.025 22Z"
                  fill="#F7A600"
                />
              </g>
            </svg>
          </button>
        </div>

        <div class="nav-slider">
          <div
            v-for="(slide, index) in galleryImages"
            :key="index"
            @click="setCurrentIndex(index)"
            :class="{ active: index === currentIndex }"
          >
            <img :src="`${$config.baseUrl}storage/${slide}`" alt="" />
          </div>
        </div>
        <button class="close-slider" @click="isModalOpen = false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <mask
              id="mask0_76_5335"
              style="mask-type: alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="32"
              height="32"
            >
              <rect width="32" height="32" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_76_5335)">
              <path
                d="M8.53268 25.3334L6.66602 23.4667L14.1327 16.0001L6.66602 8.53341L8.53268 6.66675L15.9993 14.1334L23.466 6.66675L25.3327 8.53341L17.866 16.0001L25.3327 23.4667L23.466 25.3334L15.9993 17.8667L8.53268 25.3334Z"
                fill="white"
              />
            </g>
          </svg>
        </button>
      </div>
    </section>
  </div>
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
  onUnmounted,
  reactive,
} from "@nuxtjs/composition-api";
import Loader from "~/components/global/Loader.vue";
// import VueSlickCarousel from "vue-slick-carousel";

export default {
  components: {
    Loader,
    // VueSlickCarousel,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const loading = computed(() => store.state.press.isLoading);
    const gallery = computed(() => store.state.press.gallery.data);

    onMounted(async () => {
      await store.dispatch("press/fetchGalleryData");
    });

    const parseContent = (content) => {
      try {
        return JSON.parse(content);
      } catch (e) {
        console.error("Ошибка при разборе JSON:", e);
        return [];
      }
    };

    const isModalOpen = ref(false);
    const galleryImages = ref([]);
    const currentIndex = ref(0);
    const currentTitle = ref("");
    const slickOptions = reactive({
      initialSlide: currentIndex.value,
      // другие опции для слайдера
    });

    const isImage = (filename) => {
      return /\.(jpg|jpeg|png|gif)$/i.test(filename);
    };

    const windowWidth = ref(window.innerWidth);
    const breakpoint = 767;

    const isLarge = (index) => {
      if (windowWidth.value > breakpoint) {
        // Для экранов шире 767px
        const patternIndex = index % 9;
        return patternIndex === 1 || patternIndex === 3 || patternIndex === 8;
      } else {
        // Для экранов 767px или уже
        const row = Math.floor(index / 4); // Разделение на строки по 4 элемента
        const patternIndex = index % 4;
        // Первая и вторая картинки в строке меньше, третья и четвертая - больше
        return patternIndex === 2 || patternIndex === 3;
      }
    };

    const updateWindowWidth = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", updateWindowWidth);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", updateWindowWidth);
    });

    function openModalWithSlider(images, title, index) {
      console.log(images);
      galleryImages.value = images;
      currentTitle.value = title;
      currentIndex.value = index;
      isModalOpen.value = true;
    }

    const setCurrentIndex = (index) => {
      currentIndex.value = index;
    };

    const nextSlide = () => {
      currentIndex.value =
        (currentIndex.value + 1) % galleryImages.value.length;
    };

    const prevSlide = () => {
      currentIndex.value =
        currentIndex.value - 1 < 0
          ? galleryImages.value.length - 1
          : currentIndex.value - 1;
    };

    return {
      router,
      store,
      loading,
      gallery,
      parseContent,
      isImage,
      isLarge,
      isModalOpen,
      galleryImages,
      openModalWithSlider,
      slickOptions,
      setCurrentIndex,
      nextSlide,
      prevSlide,
      currentIndex,
      currentTitle,
    };
  },
};
</script>

<style lang="scss">
.gallery {
  &__block {
    margin: 20px 0 36px 0;
  }
  &__title {
    color: #1d1d1b;
    font-size: 24px;
    font-weight: 600;
  }
  &__modal {
    background: rgba(0, 0, 0, 0.44);
    position: fixed;
    z-index: 111;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    padding: 50px 16px;
    height: 100vh;
    overflow: hidden;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .close-slider {
      border: none;
      background: transparent;
      padding: 0;
      height: 32px;
      width: 32px;
      position: absolute;
      right: 24px;
      top: 24px;
    }
    &__card {
      max-width: 1224px;
      background: white;
      max-height: calc(100vh - 100px);
      overflow: auto;
      width: 100%;
      position: relative;
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
      .main-slider {
        height: 500px;
        &__index {
          height: 44px;
          border-radius: 0px 16px;
          background: #fff;
          position: absolute;
          padding-left: 16px;
          padding-right: 16px;
          left: 24px;
          top: 24px;
          color: black;
          font-weight: 600;
          font-size: 16px;
          display: block;
          box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          b {
            margin-left: 10px;
            margin-right: 10px;
          }
        }
        div {
          height: 100%;
          width: 100%;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center center;
          }
        }
        .left {
          position: absolute;
          left: 30px;
          top: 40%;
          border-radius: 30px;
          background: #fff3df;
          border: none;
          width: 36px;
          height: 36px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .right {
          position: absolute;
          right: 30px;
          top: 40%;
          border-radius: 30px;
          background: #fff3df;
          border: none;
          width: 36px;
          height: 36px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .nav-slider {
        display: flex;
        padding: 16px;
        background: white;
        overflow: auto;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
          display: none;
        }
        .active {
          border: 3px solid #f7a600;
        }
        div {
          width: 172px;
          height: 110px;
          min-width: 172px;
          max-width: 172px;
          & + div {
            margin-left: 16px;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center center;
          }
        }
      }
    }
  }
}

.gallery__items {
  display: flex;
  flex-wrap: wrap;
  div {
    position: relative;
    width: calc(25% - 16px);
    margin-right: 24px;
    margin-top: 24px;
    height: 288px;
    &:nth-child(3n + 3) {
      margin-right: 0;
    }
    &.large {
      width: calc(50% - 16px);
    }
    .play-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
      display: block;
    }
  }
}

@media (max-width: 767px) {
  .gallery {
    &__modal {
      &__card {
        overflow: visible;
      }
      .close-slider {
        top: auto;
        left: calc(50% - 16px);
        bottom: -70px;
      }
      .main-slider {
        height: 260px;
        .left,
        .right {
          display: none;
        }
        &__index {
          left: 16px;
          top: 16px;
          height: 36px;
          font-size: 14px;
          padding-left: 16px;
          padding-right: 16px;
        }
      }
      .nav-slider {
        padding: 8px;
        div {
          width: 97px;
          height: 64px;
          min-width: 97px;
          max-width: 97px;
          & + div {
            margin-left: 8px;
          }
        }
      }
    }
  }

  .gallery__items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    div {
      position: relative;
      width: calc(50% - 4px);
      margin-right: 0;
      margin-top: 8px;
      height: 167px;
      &:nth-child(3n + 3) {
        margin-right: 0;
      }
      &.large {
        width: 100%;
      }
      .play-button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
        display: block;
      }
    }
  }
}
</style>
