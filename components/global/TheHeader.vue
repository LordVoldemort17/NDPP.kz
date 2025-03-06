<template>
  <header class="header">
    <div class="container">
      <div
        class="header__inner"
        :class="{ 'header__mob-open': mobileMenuOpened }"
      >
        <nuxt-link to="/" class="header__logo">
          <svg
            width="163"
            height="34"
            viewBox="0 0 163 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_339_2666)">
              <path
                d="M32.8988 0H27.8196C27.6318 0 27.5334 0.23343 27.6676 0.368101L45.3644 18.1357L35.9034 27.6345C34.9019 28.6401 33.2833 28.6401 32.2818 27.6345L21.9266 17.2379L24.9491 14.2033L21.5153 10.7557L14.6387 17.6599L28.6602 31.7375C31.6648 34.7542 36.5294 34.7542 39.534 31.7375L52.7865 18.432C52.9564 18.2614 52.9564 17.9921 52.7865 17.8215L36.5204 1.50832C35.5636 0.547663 34.258 0 32.8988 0Z"
                fill="#F7A600"
              />
              <path
                d="M25.2354 33.6409L7.53863 15.8643L16.9996 6.36546C18.0011 5.35992 19.6197 5.35992 20.6212 6.36546L30.9764 16.7621L27.9539 19.7967L31.3877 23.2443L38.2643 16.3401L24.2518 2.26248C21.2472 -0.754159 16.3826 -0.754159 13.3779 2.26248L0.125474 15.568C-0.044429 15.7386 -0.044429 16.0079 0.125474 16.1785L16.3826 32.5007C17.3394 33.4613 18.645 34.009 20.0042 34.009H25.0745C25.2622 34.009 25.3606 33.7756 25.2265 33.6409H25.2354Z"
                fill="#F7A600"
              />
              <path
                d="M61.7188 4.12988H67.6564L80.0773 21.3409V4.12988H85.6215V29.87H79.7196L67.263 12.695V29.87H61.7188V4.12988Z"
                fill="#1D1D1B"
                class="logo-txt"
              />
              <path
                d="M89.6094 4.12988H100.447C107.539 4.12988 113.226 9.91177 113.226 17.0314C113.226 24.151 107.539 29.8611 100.447 29.8611H89.6094V4.12988ZM100.662 24.3755C104.623 24.3755 107.718 21.0536 107.718 17.0404C107.718 13.0272 104.623 9.63345 100.662 9.63345H95.1536V24.3844H100.662V24.3755Z"
                fill="#1D1D1B"
                class="logo-txt"
              />
              <path
                d="M115.686 4.12988H127.319C133.15 4.12988 138.122 8.53812 138.122 14.2841C138.122 20.0301 133.186 24.4383 127.319 24.4383H121.239V29.8611H115.694V4.12988H115.686ZM127.275 19.0245C130.297 19.0245 132.604 16.8159 132.604 14.2931C132.604 11.7702 130.154 9.56162 127.132 9.56162H121.23V19.0335H127.275V19.0245Z"
                fill="#1D1D1B"
                class="logo-txt"
              />
              <path
                d="M140.572 4.12988H152.206C158.037 4.12988 163.008 8.53812 163.008 14.2841C163.008 20.0301 158.072 24.4383 152.206 24.4383H146.125V29.8611H140.581V4.12988H140.572ZM152.161 19.0245C155.184 19.0245 157.491 16.8159 157.491 14.2931C157.491 11.7702 155.041 9.56162 152.018 9.56162H146.116V19.0335H152.161V19.0245Z"
                fill="#1D1D1B"
                class="logo-txt"
              />
            </g>
            <defs>
              <clipPath id="clip0_339_2666">
                <rect width="163" height="34" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </nuxt-link>
        <nav :class="{ open: mobileMenuOpened }">
          <ul>
            <li
              v-for="(item, index) in menu"
              :key="`menu-${index}`"
              class="menu-item"
              @click="handleMenuItemClick(index)"
              @mouseover="() => handleDropdownMenu(index)"
              @mouseleave="closeDropdown"
            >
              <nuxt-link
                :to="item.to"
                class="menu-title"
                :class="{ 'drop-active': isActiveLink(item.to) }"
              >
                {{ $t(item.name) }}
                <span v-if="item.dropdown">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <mask
                      id="mask0_465_295"
                      style="mask-type: alpha"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                    >
                      <rect width="20" height="20" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_465_295)">
                      <path
                        d="M10.0002 12.4999L5.8335 8.33325H14.1668L10.0002 12.4999Z"
                        fill="#1D1D1B"
                      />
                    </g>
                  </svg>
                </span>
              </nuxt-link>
              <div
                class="dropdown-hover"
                v-if="item.dropdown"
                :class="{
                  open: openDropdownMenu && wichDropdownMenu === index,
                }"
              >
                <div
                  class="dropdown-content"
                  v-if="item.name != 'responsibility'"
                >
                  <nuxt-link
                    v-for="(dropdownItem, dropdownIndex) in item.dropdown"
                    :key="`dropdown-${index}-${dropdownIndex}`"
                    :to="`${item.to}/${dropdownIndex + 1}`"
                    @click="closeMobileMenu()"
                  >
                    {{ $t(dropdownItem) }}
                  </nuxt-link>
                </div>
                <div v-else class="dropdown-content">
                  <nuxt-link
                    v-for="(dropdownItem, dropdownIndex) in item.dropdown"
                    :key="`dropdown-${index}-${dropdownIndex}`"
                    :to="`${item.to}/${dropdownIndex + 1}`"
                    @click="closeMobileMenu()"
                  >
                    {{ dropdownItem }}
                  </nuxt-link>
                </div>
              </div>
            </li>
          </ul>
        </nav>
        <div class="header__language">
          <div
            class="language"
            @mouseover="openDropdownLang"
            @mouseleave="closeDropdownLang"
          >
            <div class="language-wrap">
              <span>{{ language }}</span>
              <div class="img-box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <mask
                    id="mask0_401_2167"
                    style="mask-type: alpha"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                  >
                    <rect width="20" height="20" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_401_2167)">
                    <path
                      d="M10 12.4999L5.83333 8.33325H14.1667L10 12.4999Z"
                      fill="#1D1D1B"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <ul class="language-list" v-if="isDropdownOpenLang">
              <li
                v-for="lang in availableLanguages"
                :key="lang"
                @click="changeLanguage(lang)"
                :class="{ 'active-lang': lang == language }"
              >
                {{ lang }}
              </li>
            </ul>
          </div>
          <div class="menu-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              v-if="!mobileMenuOpened"
              @click="mobileMenuOpened = true"
            >
              <mask
                id="mask0_401_3149"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_401_3149)">
                <path
                  d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z"
                  fill="#1D1D1B"
                />
              </g>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              v-else
              @click="mobileMenuOpened = false"
            >
              <mask
                id="mask0_401_2179"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_401_2179)">
                <path
                  d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                  fill="#1D1D1B"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import {
  ref,
  watch,
  useRoute,
  useRouter,
  computed,
  useStore,
  useContext,
  onMounted,
} from "@nuxtjs/composition-api";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const isDropdownOpenLang = ref(false);
    const availableLanguages = ["en", "ru", "kz"];
    const { i18n } = useContext();
    const language = computed(() => store.state.language);

    const responsibility = ref([]);

    onMounted(async () => {
      await store.dispatch("responsibilities/fetchAboutData");
      responsibility.value = store.state.responsibilities.data.data.map(
        (item) => item.title
      );

      console.log(computedResponsibility.value);
    });

    const computedResponsibility = computed(() => responsibility.value);

    const menu = computed(() => [
      { name: "home", to: "/" },
      { name: "about", to: "/about" },
      { name: "catalog", to: "/catalog" },
      { name: "partners", to: "/partner" },
      {
        name: "responsibility",
        to: "/responsibility",
        dropdown: computedResponsibility.value,
      },
      {
        name: "pressCenter",
        to: "/press",
        dropdown: ["newsEvents", "mediaGallery"],
      },
      { name: "career", to: "/career" },
      { name: "contacts", to: "/contacts" },
    ]);

    const openDropdownMenu = ref(false);
    const wichDropdownMenu = ref(null);
    const mobileMenuOpened = ref(false);

    const openDropdownLang = () => {
      isDropdownOpenLang.value = true;
    };

    const closeDropdownLang = () => {
      isDropdownOpenLang.value = false;
    };

    const changeLanguage = (newLanguage) => {
      store.dispatch("setLanguage", newLanguage);
      i18n.setLocale(newLanguage);
      closeDropdownLang();
    };

    const isActiveLink = (path) => {
      if (path === "/") {
        return route.value.path === "/";
      }
      return route.value.path.startsWith(path);
    };

    const handleDropdownMenu = (index) => {
      openDropdownMenu.value = true;
      wichDropdownMenu.value = index;
    };

    const closeDropdown = () => {
      openDropdownMenu.value = false;
      wichDropdownMenu.value = null;
    };

    watch(route, (newRoute) => {
      openDropdownMenu.value = false;
      wichDropdownMenu.value = null;
    });

    const closeMobileMenu = () => {
      mobileMenuOpened.value = false;
      closeDropdown();
    };

    const handleMenuItemClick = (index) => {
      if (menu.value[index].dropdown) {
        // Переключение состояния dropdown
        openDropdownMenu.value =
          !openDropdownMenu.value || wichDropdownMenu.value !== index;
        wichDropdownMenu.value = index;
      } else {
        // Закрытие мобильного меню, если нет dropdown
        closeMobileMenu();
      }
    };

    return {
      store,
      route,
      router,
      openDropdownMenu,
      handleDropdownMenu,
      wichDropdownMenu,
      mobileMenuOpened,
      closeMobileMenu,
      menu,
      isActiveLink,
      language,
      changeLanguage,
      availableLanguages,
      openDropdownLang,
      closeDropdownLang,
      isDropdownOpenLang,
      closeDropdown,
      handleMenuItemClick,
      responsibility,
      computedResponsibility,
    };
  },
};
</script>

<style></style>
