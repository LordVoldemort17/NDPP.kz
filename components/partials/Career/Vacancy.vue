<template>
  <loader v-if="loading" />
  <div v-else class="vacancy">
    <div class="container">
      <div class="vacancy__inner">
        <div class="vacancy__content">
          <p class="title">{{ $t("currentVacancies") }}</p>
          <div class="vacancy__filter">
            <select
              @change="loadFilter"
              v-model="citySelected"
              name="Город"
              id=""
              v-if="cities"
            >
              <option value="">{{ $t("city") }}</option>
              <option :value="item" v-for="(item, i) in cities" :key="i">
                {{ item }}
              </option>
            </select>
            <select
              @change="loadFilter"
              v-model="employmentSelected"
              name="Занятость"
              id=""
              v-if="employmentTypes"
            >
              <option value="">{{ $t("employmentType") }}</option>
              <option
                :value="item"
                v-for="(item, i) in employmentTypes"
                :key="i"
              >
                {{ item }}
              </option>
            </select>
          </div>
          <div class="vacancy__cards" v-if="vacancies">
            <div class="vacancy__card" v-for="(item, i) in vacancies" :key="i">
              <p class="position" v-if="item.title">
                {{ item.title }}
              </p>
              <p class="salary" v-if="item.salary">
                {{ item.salary }}
              </p>
              <p class="description" v-html="item.description"></p>
              <div class="flex">
                <div v-if="item.experience">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <mask
                      id="mask0_339_2294"
                      style="mask-type: alpha"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                    >
                      <rect width="20" height="20" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_339_2294)">
                      <path
                        d="M3.33268 17.5C2.87435 17.5 2.48199 17.3368 2.1556 17.0104C1.82921 16.684 1.66602 16.2916 1.66602 15.8333V6.66663C1.66602 6.20829 1.82921 5.81593 2.1556 5.48954C2.48199 5.16315 2.87435 4.99996 3.33268 4.99996H6.66602V3.33329C6.66602 2.87496 6.82921 2.4826 7.1556 2.15621C7.48199 1.82982 7.87435 1.66663 8.33268 1.66663H11.666C12.1243 1.66663 12.5167 1.82982 12.8431 2.15621C13.1695 2.4826 13.3327 2.87496 13.3327 3.33329V4.99996H16.666C17.1243 4.99996 17.5167 5.16315 17.8431 5.48954C18.1695 5.81593 18.3327 6.20829 18.3327 6.66663V15.8333C18.3327 16.2916 18.1695 16.684 17.8431 17.0104C17.5167 17.3368 17.1243 17.5 16.666 17.5H3.33268ZM8.33268 4.99996H11.666V3.33329H8.33268V4.99996ZM16.666 12.5H12.4993V14.1666H7.49935V12.5H3.33268V15.8333H16.666V12.5ZM9.16602 12.5H10.8327V10.8333H9.16602V12.5ZM3.33268 10.8333H7.49935V9.16663H12.4993V10.8333H16.666V6.66663H3.33268V10.8333Z"
                        fill="#1D1D1B"
                      />
                    </g>
                  </svg>
                  <span>{{ item.experience }}</span>
                </div>
                <div v-if="item.employment_type">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <mask
                      id="mask0_339_2299"
                      style="mask-type: alpha"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                    >
                      <rect width="20" height="20" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_339_2299)">
                      <path
                        d="M4.16667 6.66663H15.8333V4.99996H4.16667V6.66663ZM4.16667 18.3333C3.70833 18.3333 3.31597 18.1701 2.98958 17.8437C2.66319 17.5173 2.5 17.125 2.5 16.6666V4.99996C2.5 4.54163 2.66319 4.14926 2.98958 3.82288C3.31597 3.49649 3.70833 3.33329 4.16667 3.33329H5V1.66663H6.66667V3.33329H13.3333V1.66663H15V3.33329H15.8333C16.2917 3.33329 16.684 3.49649 17.0104 3.82288C17.3368 4.14926 17.5 4.54163 17.5 4.99996V9.72913C17.2361 9.60413 16.9653 9.49996 16.6875 9.41663C16.4097 9.33329 16.125 9.27079 15.8333 9.22913V8.33329H4.16667V16.6666H9.41667C9.51389 16.9722 9.62847 17.2638 9.76042 17.5416C9.89236 17.8194 10.0486 18.0833 10.2292 18.3333H4.16667ZM15 19.1666C13.8472 19.1666 12.8646 18.7604 12.0521 17.9479C11.2396 17.1354 10.8333 16.1527 10.8333 15C10.8333 13.8472 11.2396 12.8645 12.0521 12.052C12.8646 11.2395 13.8472 10.8333 15 10.8333C16.1528 10.8333 17.1354 11.2395 17.9479 12.052C18.7604 12.8645 19.1667 13.8472 19.1667 15C19.1667 16.1527 18.7604 17.1354 17.9479 17.9479C17.1354 18.7604 16.1528 19.1666 15 19.1666ZM16.3958 16.9791L16.9792 16.3958L15.4167 14.8333V12.5H14.5833V15.1666L16.3958 16.9791Z"
                        fill="#1D1D1B"
                      />
                    </g>
                  </svg>
                  <span>{{ item.employment_type }}</span>
                  <!-- <span v-for="(schedule, n) in item.schedule" :key="n">
                    {{ schedule
                    }}<template v-if="n < item.schedule.length - 1"
                      >,
                    </template>
                  </span> -->
                </div>
                <div v-if="item.city">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <mask
                      id="mask0_339_2304"
                      style="mask-type: alpha"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                    >
                      <rect width="20" height="20" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_339_2304)">
                      <path
                        d="M10.0007 9.99996C10.459 9.99996 10.8513 9.83677 11.1777 9.51038C11.5041 9.18399 11.6673 8.79163 11.6673 8.33329C11.6673 7.87496 11.5041 7.4826 11.1777 7.15621C10.8513 6.82982 10.459 6.66663 10.0007 6.66663C9.54232 6.66663 9.14996 6.82982 8.82357 7.15621C8.49718 7.4826 8.33398 7.87496 8.33398 8.33329C8.33398 8.79163 8.49718 9.18399 8.82357 9.51038C9.14996 9.83677 9.54232 9.99996 10.0007 9.99996ZM10.0007 16.125C11.6951 14.5694 12.952 13.1562 13.7715 11.8854C14.5909 10.6145 15.0007 9.48607 15.0007 8.49996C15.0007 6.98607 14.518 5.74649 13.5527 4.78121C12.5875 3.81593 11.4034 3.33329 10.0007 3.33329C8.59787 3.33329 7.41385 3.81593 6.44857 4.78121C5.48329 5.74649 5.00065 6.98607 5.00065 8.49996C5.00065 9.48607 5.41037 10.6145 6.22982 11.8854C7.04926 13.1562 8.30621 14.5694 10.0007 16.125ZM10.0007 18.3333C7.76454 16.4305 6.0944 14.6632 4.99023 13.0312C3.88607 11.3993 3.33398 9.88885 3.33398 8.49996C3.33398 6.41663 4.00412 4.7569 5.3444 3.52079C6.68468 2.28468 8.23676 1.66663 10.0007 1.66663C11.7645 1.66663 13.3166 2.28468 14.6569 3.52079C15.9972 4.7569 16.6673 6.41663 16.6673 8.49996C16.6673 9.88885 16.1152 11.3993 15.0111 13.0312C13.9069 14.6632 12.2368 16.4305 10.0007 18.3333Z"
                        fill="#1D1D1B"
                      />
                    </g>
                  </svg>
                  <span>{{ item.city }}</span>
                </div>
              </div>
              <button class="main-button" @click="openDetail(item.id)">
                {{ $t("learnMore") }}
              </button>
            </div>
          </div>
        </div>
        <div class="vacancy__contacts" v-if="hr">
          <p class="title">{{ $t("hrContacts") }}</p>
          <div class="card">
            <a
              :href="item.type === 'hh' ? item.content : '/#'"
              target="_blank"
              v-for="(item, i) in hr"
              :key="i"
            >
              <svg
                v-if="item.type == 'tel'"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <mask
                  id="mask0_465_1578"
                  style="mask-type: alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_465_1578)">
                  <path
                    d="M19.95 21C17.8667 21 15.8083 20.5458 13.775 19.6375C11.7417 18.7292 9.89167 17.4417 8.225 15.775C6.55833 14.1083 5.27083 12.2583 4.3625 10.225C3.45417 8.19167 3 6.13333 3 4.05C3 3.75 3.1 3.5 3.3 3.3C3.5 3.1 3.75 3 4.05 3H8.1C8.33333 3 8.54167 3.07917 8.725 3.2375C8.90833 3.39583 9.01667 3.58333 9.05 3.8L9.7 7.3C9.73333 7.56667 9.725 7.79167 9.675 7.975C9.625 8.15833 9.53333 8.31667 9.4 8.45L6.975 10.9C7.30833 11.5167 7.70417 12.1125 8.1625 12.6875C8.62083 13.2625 9.125 13.8167 9.675 14.35C10.1917 14.8667 10.7333 15.3458 11.3 15.7875C11.8667 16.2292 12.4667 16.6333 13.1 17L15.45 14.65C15.6 14.5 15.7958 14.3875 16.0375 14.3125C16.2792 14.2375 16.5167 14.2167 16.75 14.25L20.2 14.95C20.4333 15.0167 20.625 15.1375 20.775 15.3125C20.925 15.4875 21 15.6833 21 15.9V19.95C21 20.25 20.9 20.5 20.7 20.7C20.5 20.9 20.25 21 19.95 21Z"
                    fill="#F7A600"
                  />
                </g>
              </svg>
              <svg
                v-else-if="item.type == 'email'"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <mask
                  id="mask0_465_1583"
                  style="mask-type: alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_465_1583)">
                  <path
                    d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM12 13L20 8V6L12 11L4 6V8L12 13Z"
                    fill="#F7A600"
                  />
                </g>
              </svg>
              <span v-else-if="item.type == 'hh'">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="24"
                  viewBox="0 0 33 24"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.39374 2V9.34069C8.5302 8.00818 9.89211 7.33682 11.4724 7.33682C12.286 7.33682 13.0157 7.48894 13.668 7.79294C14.3238 8.09388 14.8144 8.48088 15.1441 8.9504C15.477 9.42333 15.7023 9.94234 15.823 10.5144C15.9445 11.0833 16.005 11.9694 16.005 13.1696V21.0194H12.4744V13.95C12.4744 12.5481 12.4103 11.6584 12.276 11.2814C12.1415 10.9014 11.906 10.6036 11.5665 10.3821C11.2268 10.1573 10.8032 10.0447 10.2922 10.0447C9.70718 10.0447 9.18252 10.1903 8.72541 10.4748C8.2616 10.7624 7.92521 11.1923 7.71339 11.7676C7.49798 12.3431 7.39028 13.1928 7.39386 14.3171L7.39028 21.0196H3.86328V2H7.39374ZM21.2973 2V9.34069C22.4334 8.00818 23.7954 7.33682 25.3755 7.33682C26.186 7.33682 26.9188 7.48894 27.5748 7.79294C28.2269 8.09388 28.7178 8.48088 29.0471 8.9504C29.3801 9.42333 29.6054 9.94234 29.7265 10.5144C29.8476 11.0833 29.9082 11.9694 29.9082 13.1696V21.0194H26.3808V13.95C26.3808 12.5481 26.3139 11.6584 26.1792 11.2814C26.0446 10.9014 25.8094 10.6036 25.4696 10.3821C25.1333 10.1573 24.7062 10.0447 24.1953 10.0447C23.6102 10.0447 23.0857 10.1903 22.6284 10.4748C22.1679 10.7624 21.8317 11.1923 21.6162 11.7676C21.4044 12.3431 21.2971 13.1928 21.2971 14.3171V21.0196H17.7698V2H21.2973Z"
                    fill="#D71920"
                  />
                </svg>
                hh.kz
              </span>
              {{ item.type !== "hh" ? item.content : "" }}
              <svg
                v-if="item.type == 'hh'"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <mask
                  id="mask0_668_1594"
                  style="mask-type: alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_668_1594)">
                  <path
                    d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H12V5H5V19H19V12H21V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM9.7 15.7L8.3 14.3L17.6 5H14V3H21V10H19V6.4L9.7 15.7Z"
                    fill="#F7A600"
                  />
                </g>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref,
  useRouter,
  useStore,
  computed,
  onMounted,
} from "@nuxtjs/composition-api";
import Loader from "~/components/global/Loader.vue";

export default {
  components: {
    Loader,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const loading = computed(() => store.state.career.isLoading);
    const vacancies = computed(() => store.state.career.vacancies.data);
    const hr = computed(() => store.state.career.hr.data);

    const cities = computed(() => {
      if (Array.isArray(vacancies.value)) {
        const allCities = vacancies.value.map((vacancy) => vacancy.city);
        return [...new Set(allCities)]; // Удаление дубликатов с помощью Set
      }
      return [];
    });

    const employmentTypes = computed(() => {
      if (Array.isArray(vacancies.value)) {
        const allEmploymentTypes = vacancies.value.map(
          (vacancy) => vacancy.employment_type
        );
        return [...new Set(allEmploymentTypes)]; // Удаление дубликатов
      }
      return [];
    });

    const citySelected = ref("");
    const employmentSelected = ref("");

    onMounted(async () => {
      await store.dispatch("career/fetchVacanciesData");
    });

    const openDetail = (event) => {
      router.push("/career/" + event);
    };

    const loadFilter = () => {
      store.dispatch("career/fetchFilterData", {
        city: citySelected.value,
        employment_type: employmentSelected.value,
      });
    };

    return {
      router,
      openDetail,
      loading,
      store,
      vacancies,
      cities,
      employmentTypes,
      loadFilter,
      citySelected,
      employmentSelected,
      hr,
    };
  },
};
</script>

<style></style>
