<template>
  <loader v-if="loading" />
  <div v-else>
    <main class="main">
      <div class="main__inner">
        <div class="container">
          <div class="main__content" v-if="main && main.main">
            <h1>{{ main.main.title }}</h1>
            <p>
              {{ main.main.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="main__video" v-if="videoUrl">
        <video ref="videoRef" autoplay muted loop playsinline>
          <source
            muted
            :src="`${$config.baseUrl}storage/${videoUrl}`"
            type="video/mp4"
          />
        </video>
      </div>
    </main>
    <section class="main-catalog" v-if="main && main.products">
      <div class="container">
        <div class="main-catalog__inner">
          <div class="main-catalog__header">
            <h2 class="title">
              {{ $t("catalog") }}
            </h2>
            <nuxt-link to="/catalog">
              {{ $t("viewAll") }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <mask
                  id="mask0_465_3572"
                  style="mask-type: alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="16"
                  height="16"
                >
                  <rect width="16" height="16" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_465_3572)">
                  <path
                    d="M5.34996 14.6667L4.16663 13.4834L9.64996 8.00004L4.16663 2.51671L5.34996 1.33337L12.0166 8.00004L5.34996 14.6667Z"
                    fill="#F7A600"
                  />
                </g>
              </svg>
            </nuxt-link>
          </div>
          <div class="main-catalog__cards">
            <div
              class="catalog-card"
              v-for="(item, i) in main.products"
              :key="i"
              @click="redirect(item.id)"
            >
              <div class="catalog-card__img">
                <img
                  v-if="item.photo_uri"
                  :src="`${$config.baseUrl}storage/${item.photo_uri}`"
                  alt=""
                />
              </div>
              <span class="catalog-card__suptitle"> {{ item.code ?? "" }}</span>
              <p class="catalog-card__title">
                {{ item.title }}
              </p>
              <span
                v-if="item.category && item.category"
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
    <section class="main-about" v-if="main && main.about_us">
      <div class="container">
        <div class="main-about__inner">
          <div class="main-about__content">
            <div>
              <h2 v-if="main && main.about_us">{{ main.about_us.title }}</h2>
              <div>
                <p v-if="main && main.about_us">
                  {{ main.about_us.description }}
                </p>
              </div>
              <nuxt-link to="/about">
                <button>
                  {{ $t("learnMore") }}
                </button>
              </nuxt-link>
            </div>
          </div>
          <img src="../images/main/main-about-bg.jpg" alt="" />
        </div>
      </div>
    </section>
    <section class="main-partners">
      <div class="container">
        <div class="main-partners__inner">
          <p class="title">{{ $t("ourPartners") }}</p>
          <div class="main-partners__cards">
            <div v-for="(partner, i) in partnersWithLogos" :key="i">
              <img
                v-if="partner.logo_uri"
                :src="`${$config.baseUrl}storage/${partner.logo_uri}`"
                alt="Логотип партнера"
              />
            </div>
            <!-- <div>
              <img src="../images/main/partner-1.png" alt="" />
            </div>
            <div>
              <img src="../images/main/partner-2.png" alt="" />
            </div>
            <div>
              <img src="../images/main/partner-3.png" alt="" />
            </div>
            <div>
              <img src="../images/main/partner-4.png" alt="" />
            </div> -->
          </div>
        </div>
      </div>
    </section>
    <section class="maps">
      <div class="maps__inner">
        <div class="maps__center">
          <img
            class="maps__desktop"
            src="../images/main/desktop-maps.png"
            alt=""
          />
          <img class="maps__mobile" src="../images/mobile-maps.png" alt="" />
        </div>
      </div>
    </section>
    <section class="main-news" v-if="main && main.news">
      <div class="container">
        <div class="main-news__inner">
          <div class="main-news__header">
            <p class="title">{{ $t("latestNews") }}</p>
            <nuxt-link to="/press">
              {{ $t("viewAll") }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <mask
                  id="mask0_465_3572"
                  style="mask-type: alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="16"
                  height="16"
                >
                  <rect width="16" height="16" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_465_3572)">
                  <path
                    d="M5.34996 14.6667L4.16663 13.4834L9.64996 8.00004L4.16663 2.51671L5.34996 1.33337L12.0166 8.00004L5.34996 14.6667Z"
                    fill="#F7A600"
                  />
                </g>
              </svg>
            </nuxt-link>
          </div>
          <div class="main-news__cards">
            <div class="news-card" v-for="(item, i) in news" :key="i">
              <div class="content">
                <h3>{{ item.title }}</h3>
                <p v-html="item.firstParagraph"></p>
                <span>{{ item.publication_date }}</span>
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
    </section>
  </div>
</template>

<script>
import {
  ref,
  onMounted,
  useStore,
  computed,
  useRouter,
  useContext,
  watch,
} from "@nuxtjs/composition-api";
import TheHeader from "~/components/global/TheHeader.vue";
import Loader from "~/components/global/Loader.vue";

export default {
  components: { TheHeader, Loader },
  name: "IndexPage",
  setup() {
    const { $config } = useContext();

    const router = useRouter();

    const videoRef = ref(null);

    const store = useStore();

    const loading = computed(() => store.state.home.isLoading);

    const main = computed(() => store.state.home.data.data);

    const news = computed(() => {
      return store.state.home.data.data.news.map((item) => {
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
          return item;
        }
      });
    });

    const partnersWithLogos = computed(() => {
      // Проверка наличия данных о партнерах
      if (main.value && main.value.partners && main.value.partners.length > 0) {
        return main.value.partners.map((partner) => {
          let logoUrl = "";
          if (partner.logo_uri) {
            try {
              const parsedLogos = JSON.parse(partner.logo_uri);
              if (parsedLogos.length > 0 && parsedLogos[0].download_link) {
                logoUrl = parsedLogos[0].download_link;
              }
            } catch (error) {
              console.error("Ошибка при разборе logo_uri:", error);
            }
          }
          return {
            ...partner,
            logo_uri: logoUrl,
          };
        });
      } else {
        // Возвращаем пустой массив, если данных нет
        return [];
      }
    });

    const videoUrl = computed(() => {
      try {
        if (main.value?.main && typeof main.value.main.video_uri === "string") {
          const videoUriArray = JSON.parse(main.value.main.video_uri);

          if (videoUriArray.length > 0 && videoUriArray[0].download_link) {
            return `${videoUriArray[0].download_link}`;
          }
        }
      } catch (e) {
        console.error("Ошибка при разборе videoUri:", e);
      }
      return "";
    });

    watch(videoUrl, (newUrl) => {
      if (newUrl && videoRef.value) {
        videoRef.value.load();
        videoRef.value.play().catch((error) => {
          console.error("Ошибка воспроизведения видео:", error);
        });
      }
    });

    onMounted(async () => {
      await store.dispatch("home/fetchMainData");
    });

    const redirect = (event) => {
      if (event) {
        router.push("/catalog/" + event);
      }
    };

    return {
      loading,
      main,
      videoRef,
      videoUrl,
      redirect,
      router,
      news,
      partnersWithLogos,
    };
  },
};
</script>

<style lang="scss">
.main {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  &__header {
    background: transparent;
    .header__logo {
      svg {
        .logo-txt {
          fill: white;
        }
      }
    }
    .header__language {
      span {
        color: white;
      }
      svg {
        path {
          fill: white;
        }
      }
    }
    nav {
      ul {
        li {
          a {
            color: white;
          }
        }
        .menu-title {
          color: white;
          svg {
            path {
              fill: white;
            }
          }
        }
      }
    }
  }
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  &__content {
    min-height: 100vh;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 250px 0 250px 0;
    h1 {
      margin: 0;
      font-size: 48px;
      color: white;
      line-height: 116%;
      font-weight: 600;
    }
    p {
      margin-top: 12px;
      font-size: 16px;
      line-height: 125%;
      color: white;
    }
  }
  &__video {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.44) 0%,
        rgba(0, 0, 0, 0.44) 100%
      );
      z-index: 1;
    }
  }
}

@media (max-width: 1000px) {
  .main {
    &__header {
      .header__mob-open {
        .header__logo {
          svg {
            .logo-txt {
              fill: #1d1d1b;
            }
          }
        }
        .header__language {
          span {
            color: #1d1d1b;
          }
          svg {
            path {
              fill: #1d1d1b;
            }
          }
        }
        nav {
          ul {
            li {
              a {
                color: #1d1d1b;
              }
            }
            .nuxt-link-exact-active {
              color: #f7a600 !important ;
            }
            .menu-title {
              color: #1d1d1b;
              svg {
                path {
                  fill: #1d1d1b;
                }
              }
            }
          }
        }
      }
    }
  }
}

.main-catalog {
  padding: 50px 0;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    h2 {
      margin: 0;
    }
    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #f7a600;
      font-size: 12px;
      font-weight: 600;
      svg {
        width: 16px;
        height: 16px;
        margin-left: 6px;
      }
    }
  }
  &__cards {
    display: flex;
    justify-content: space-between;
    width: 100%;
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    .catalog-card {
      width: 288px;
      min-width: 288px;
      max-width: 288px;
      & + .catalog-card {
        margin-left: 24px;
      }
    }
  }
}

.main-about {
  background: #f8f8f7;
  padding: 70px 0;
  &__inner {
    border-radius: 0px 40px;
    overflow: hidden;
    display: flex;
    & > img {
      width: 50%;
      height: 480px;
      object-fit: cover;
      object-position: center center;
    }
  }
  &__content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 24px 60px;
    background: white;
    h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 500;
    }
    p {
      margin-top: 10px;
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
      margin-bottom: 0;
    }
    button {
      background: #f7a600;
      color: black;
      border: none;
      height: 48px;
      font-size: 16px;
      font-weight: 500;
      padding: 0 16px;
      margin-top: 20px;
    }
  }
}

.main-partners {
  padding: 50px 0;
  &__cards {
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      width: calc(25% - 18px);
      img {
        width: 100%;
        object-fit: contain;
        object-position: center center;
        max-width: 80%;
      }
    }
  }
}

.maps {
  background: white;
  overflow: hidden;
  width: 100%;
  &__center {
    width: 100%;
  }
  &__desktop {
    width: 142%;
    margin-left: -21%;
    height: 922px;
    object-fit: cover;
    object-position: center center;
  }
  &__mobile {
    display: none;
  }
}

.main-news {
  padding: 50px 0;
  background: #f8f8f7;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #f7a600;
      font-size: 12px;
      font-weight: 600;
      svg {
        width: 16px;
        height: 16px;
        margin-left: 6px;
      }
    }
  }
  &__cards {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    .news-card {
      & + .news-card {
        margin-left: 24px;
      }
    }
  }
  .news-card {
    border-radius: 0px 12px;
    background: #fff;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.12);
    padding: 16px;
    display: flex;
    cursor: pointer;
    .img {
      width: 122px;
      max-height: 144px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      width: calc(100% - (122px + 12px));
      margin-right: 12px;
      h3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;
        color: #1d1d1b;
        margin-bottom: 6px;
      }
      p {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        color: #1d1d1b;
        margin-bottom: 6px;
      }
      span {
        display: block;
        font-size: 14px;
        color: #8a8b8a;
        font-weight: 400;
        line-height: 18px;
      }
      div {
        width: 100%;
        img {
          display: none;
        }
        * {
          max-width: 100%;
        }
      }
    }
  }
}

@media (max-width: 992px) {
  .main-news {
    &__cards {
      flex-direction: column;
      .news-card {
        width: 100%;
        & + .news-card {
          margin-left: 0;
          margin-top: 16px;
        }
      }
    }
  }
}

@media (max-width: 767px) {
  .main {
    &__content {
      h1 {
        font-size: 32px;
        line-height: 38px;
        font-weight: 500;
      }
      p {
        margin-top: 8px;
        font-size: 14px;
        line-height: 18px;
        font-weight: 300;
      }
    }
  }

  .main-catalog {
    padding: 36px 0;
    .container {
      padding-right: 0;
    }
    &__header {
      padding-right: 16px;
      .title {
        font-size: 20px;
        line-height: 26px;
      }
    }
    &__cards {
      padding-right: 16px;
      .catalog-card {
        & + .catalog-card {
          margin-left: 16px;
        }
      }
    }
  }

  .main-about {
    padding: 36px 0;
    &__inner {
      flex-direction: column;
      & > img {
        width: 100%;
        height: 210px;
      }
    }
    &__content {
      width: 100%;
      padding: 20px 16px;
      h2 {
        font-size: 20px;
      }
      p {
        margin-top: 8px;
        font-size: 14px;
        line-height: 18px;
      }
      button {
        margin-top: 16px;
      }
    }
  }

  .main-partners {
    padding: 36px 0;
    .title {
      font-size: 20px;
      line-height: 26px;
    }
    &__cards {
      margin-top: 20px;
      flex-wrap: wrap;
      div {
        width: calc(50% - 3px);
      }
    }
  }

  .maps {
    &__desktop {
      display: none;
    }
    &__mobile {
      display: block;
      width: 100%;
    }
  }

  .main-news {
    padding: 36px 0;
    &__cards {
      .news-card {
        .img {
          width: 100px;
          height: 130px;
        }
        .content {
          width: calc(100% - 112px);
          h3 {
            font-size: 14px;
            line-height: 18px;
            margin-bottom: 6px;
          }
          p {
            font-size: 12px;
            line-height: 16px;
            margin-bottom: 6px;
          }
          span {
            font-size: 12px;
            line-height: 14px;
          }
        }
      }
    }
  }
}
</style>
