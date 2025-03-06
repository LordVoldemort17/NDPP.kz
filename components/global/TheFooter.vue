<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__inner">
        <div>
          <div class="logo">
            <img src="../../images/Logo-light.svg" alt="" />
          </div>
          <div class="company">
            <p>© 1978 - 2023 ТОО «НДФЗ»</p>
            <p>
              {{ $t("developedWithLove") }}
              <a href="">digital lab</a>
            </p>
          </div>
        </div>
        <div>
          <p>{{ $t("siteNavigation") }}</p>
          <nuxt-link
            :to="item.link"
            v-for="(item, i) in footer.navigate"
            :key="i"
          >
            {{ $t(item.name) }}
          </nuxt-link>
        </div>
        <div>
          <p>{{ $t("security") }}</p>
          <nuxt-link
            :to="item.link"
            v-for="(item, i) in footer.documents"
            :key="i"
          >
            {{ $t(item.name) }}
          </nuxt-link>
        </div>
        <div>
          <p>{{ $t("ourContacts") }}</p>
          <nuxt-link :to="item.link" v-for="(item, i) in footer.info" :key="i">
            {{ item.name }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { ref } from "@nuxtjs/composition-api";

export default {
  setup() {
    const footer = ref({
      navigate: [
        { name: "home", link: "/" },
        { name: "about", link: "/about" },
        { name: "catalog", link: "/catalog" },
        { name: "partners", link: "/partner" },
        { name: "responsibility", link: "/responsibility/1" },
        { name: "pressCenter", link: "/press" },
        { name: "career", link: "/career" },
        { name: "contacts", link: "/contacts" },
      ],
      documents: [
        { name: "privacyPolicy", link: "/privacy-policy" },
        { name: "cookieUsage", link: "/cookie-policy" },
      ],
      info: [
        {
          name: "+7 (7262) 90 00 58",
          link: "tel:+77262900058",
          type: "phone",
        },
        {
          name: "office@ndpp.kz",
          link: "mailto:office@ndpp.kz",
          type: "email",
        },
      ],
    });

    return {
      footer,
    };
  },
};
</script>

<style></style>
