<template>
  <main :class="{ app: !isHomePage }">
    <the-header :class="headerClass" />
    <nuxt class="app-inner" />
    <the-footer />
  </main>
</template>

<script>
import TheFooter from "~/components/global/TheFooter.vue";
import TheHeader from "~/components/global/TheHeader.vue";

export default {
  components: {
    TheHeader,
    TheFooter,
  },
  data() {
    return {
      isScrolled: false,
    };
  },
  computed: {
    isHomePage() {
      return this.$route.path === "/";
    },
    headerClass() {
      if (this.isHomePage && !this.isScrolled) {
        return "main__header";
      }
      return "";
    },
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 100;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss">
.app {
  padding-top: 88px;
}

.app-inner {
  min-height: 50vh;
}

@media (max-width: 767px) {
  .app {
    padding-top: 66px;
  }
}
</style>
