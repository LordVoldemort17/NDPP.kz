<template>
  <loader v-if="loading" />
  <section class="contacts" v-else>
    <div class="container">
      <div class="contacts__inner">
        <Breadcrumb>
          <li class="breadcrumb-item">
            <nuxt-link to="/">
              {{ $t("home") }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ $t("contacts") }}
          </li>
        </Breadcrumb>
        <div class="contacts__wrap">
          <div class="contacts__info">
            <div class="contacts__header">
              <div class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <mask
                    id="mask0_339_3852"
                    style="mask-type: alpha"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  >
                    <rect width="24" height="24" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_339_3852)">
                    <path
                      d="M19.95 21C17.8667 21 15.8083 20.5458 13.775 19.6375C11.7417 18.7292 9.89167 17.4417 8.225 15.775C6.55833 14.1083 5.27083 12.2583 4.3625 10.225C3.45417 8.19167 3 6.13333 3 4.05C3 3.75 3.1 3.5 3.3 3.3C3.5 3.1 3.75 3 4.05 3H8.1C8.33333 3 8.54167 3.07917 8.725 3.2375C8.90833 3.39583 9.01667 3.58333 9.05 3.8L9.7 7.3C9.73333 7.56667 9.725 7.79167 9.675 7.975C9.625 8.15833 9.53333 8.31667 9.4 8.45L6.975 10.9C7.30833 11.5167 7.70417 12.1125 8.1625 12.6875C8.62083 13.2625 9.125 13.8167 9.675 14.35C10.1917 14.8667 10.7333 15.3458 11.3 15.7875C11.8667 16.2292 12.4667 16.6333 13.1 17L15.45 14.65C15.6 14.5 15.7958 14.3875 16.0375 14.3125C16.2792 14.2375 16.5167 14.2167 16.75 14.25L20.2 14.95C20.4333 15.0167 20.625 15.1375 20.775 15.3125C20.925 15.4875 21 15.6833 21 15.9V19.95C21 20.25 20.9 20.5 20.7 20.7C20.5 20.9 20.25 21 19.95 21Z"
                      fill="#F7A600"
                    />
                  </g>
                </svg>
              </div>
              <p class="title">{{ $t("ourContacts") }}</p>
            </div>
            <div class="items">
              <div class="item" v-for="(item, i) in contacts" :key="i">
                <span>{{ item.title }}</span>
                <p>
                  {{ item.content }}
                </p>
              </div>
            </div>
          </div>
          <div class="contacts__map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3439.91958937504!2d71.31304895989997!3d42.92674329192775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38a70475eaaaaaab%3A0x7b00d526d6211e38!2z0JrQsNC30YTQvtGB0YTQsNGC!5e0!3m2!1sru!2skz!4v1700904718521!5m2!1sru!2skz"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Breadcrumb from "@/components/global/Breadcrumb.vue";
import Loader from "~/components/global/Loader.vue";
import { ref, useStore, computed, onMounted } from "@nuxtjs/composition-api";

export default {
  components: {
    Breadcrumb,
    Loader,
  },
  setup() {
    const store = useStore();
    const loading = computed(() => store.state.contacts.isLoading);
    const contacts = computed(() => store.state.contacts.data.data);
    // const contacts = ref([
    //   {
    //     label: "Почта",
    //     content: "office@ndpp.kz",
    //     type: "email",
    //   },
    //   {
    //     label: "Приемная",
    //     content: "900 058",
    //     type: "tel",
    //   },
    //   {
    //     label: "Департамент информационных технологий",
    //     content: "900 027",
    //     type: "tel",
    //   },
    //   {
    //     label: "Юридический отдел",
    //     content: "900 012",
    //     type: "tel",
    //   },
    //   {
    //     label: "Отдел по управлению персоналом",
    //     content: "900 043",
    //     type: "tel",
    //   },
    //   {
    //     label: "Планово-экономический отдел",
    //     content: "900 046",
    //     type: "tel",
    //   },
    //   {
    //     label: "Бухгалтерия",
    //     content: "900 062",
    //     type: "tel",
    //   },
    //   {
    //     label: "Производственно-технический отдел",
    //     content: "900 041",
    //     type: "tel",
    //   },
    //   {
    //     label: "Отдел энергетики",
    //     content: "900 067",
    //     type: "tel",
    //   },
    //   {
    //     label: "Сектор оборудования и зап. частей",
    //     content: "900 055",
    //     type: "tel",
    //   },
    //   {
    //     label: "Отдел сбыта и логистики",
    //     content: "900 068",
    //     type: "tel",
    //   },
    //   {
    //     label: "Отдел охраны труда и промышленной безопасности",
    //     content: "900 037",
    //     type: "tel",
    //   },
    // ]);

    onMounted(async () => {
      await store.dispatch("contacts/fetchContactsData");
    });

    return {
      contacts,
      store,
      loading,
    };
  },
};
</script>

<style></style>
