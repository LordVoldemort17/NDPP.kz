<template>
  <loader v-if="loading" />
  <section v-else class="career">
    <div class="career__inner">
      <div class="container">
        <Breadcrumb>
          <li class="breadcrumb-item">
            <nuxt-link to="/">{{ $t("home") }}</nuxt-link>
          </li>
          <li class="breadcrumb-item">
            <nuxt-link to="/career"> {{ $t("career") }}</nuxt-link>
          </li>
          <li
            class="breadcrumb-item active"
            aria-current="page"
            v-if="vacancy && vacancy.title"
          >
            {{ vacancy.title }}
          </li>
        </Breadcrumb>
        <div class="vacancy-inner">
          <div class="vacancy-inner__wrap">
            <h3 v-if="vacancy && vacancy.title">{{ vacancy.title }}</h3>
            <h4 v-if="vacancy && vacancy.salary">{{ vacancy.salary }}</h4>
            <div class="flex">
              <div v-if="vacancy && vacancy.experience">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <mask
                    id="mask0_202_16356"
                    style="mask-type: alpha"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                  >
                    <rect width="20" height="20" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_202_16356)">
                    <path
                      d="M3.33268 17.5001C2.87435 17.5001 2.48199 17.3369 2.1556 17.0105C1.82921 16.6841 1.66602 16.2917 1.66602 15.8334V6.66675C1.66602 6.20842 1.82921 5.81605 2.1556 5.48967C2.48199 5.16328 2.87435 5.00008 3.33268 5.00008H6.66602V3.33341C6.66602 2.87508 6.82921 2.48272 7.1556 2.15633C7.48199 1.82994 7.87435 1.66675 8.33268 1.66675H11.666C12.1243 1.66675 12.5167 1.82994 12.8431 2.15633C13.1695 2.48272 13.3327 2.87508 13.3327 3.33341V5.00008H16.666C17.1243 5.00008 17.5167 5.16328 17.8431 5.48967C18.1695 5.81605 18.3327 6.20842 18.3327 6.66675V15.8334C18.3327 16.2917 18.1695 16.6841 17.8431 17.0105C17.5167 17.3369 17.1243 17.5001 16.666 17.5001H3.33268ZM8.33268 5.00008H11.666V3.33341H8.33268V5.00008ZM16.666 12.5001H12.4993V14.1667H7.49935V12.5001H3.33268V15.8334H16.666V12.5001ZM9.16602 12.5001H10.8327V10.8334H9.16602V12.5001ZM3.33268 10.8334H7.49935V9.16675H12.4993V10.8334H16.666V6.66675H3.33268V10.8334Z"
                      fill="#1D1D1B"
                    />
                  </g>
                </svg>
                <span>
                  {{ $t("workExperience") }}: {{ vacancy.experience }}
                </span>
              </div>
              <div v-if="vacancy && vacancy.employment_type">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <mask
                    id="mask0_202_16359"
                    style="mask-type: alpha"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                  >
                    <rect width="20" height="20" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_202_16359)">
                    <path
                      d="M4.16667 6.66675H15.8333V5.00008H4.16667V6.66675ZM4.16667 18.3334C3.70833 18.3334 3.31597 18.1702 2.98958 17.8438C2.66319 17.5174 2.5 17.1251 2.5 16.6667V5.00008C2.5 4.54175 2.66319 4.14939 2.98958 3.823C3.31597 3.49661 3.70833 3.33341 4.16667 3.33341H5V1.66675H6.66667V3.33341H13.3333V1.66675H15V3.33341H15.8333C16.2917 3.33341 16.684 3.49661 17.0104 3.823C17.3368 4.14939 17.5 4.54175 17.5 5.00008V9.72925C17.2361 9.60425 16.9653 9.50008 16.6875 9.41675C16.4097 9.33341 16.125 9.27091 15.8333 9.22925V8.33341H4.16667V16.6667H9.41667C9.51389 16.9723 9.62847 17.264 9.76042 17.5417C9.89236 17.8195 10.0486 18.0834 10.2292 18.3334H4.16667ZM15 19.1667C13.8472 19.1667 12.8646 18.7605 12.0521 17.948C11.2396 17.1355 10.8333 16.1529 10.8333 15.0001C10.8333 13.8473 11.2396 12.8647 12.0521 12.0522C12.8646 11.2397 13.8472 10.8334 15 10.8334C16.1528 10.8334 17.1354 11.2397 17.9479 12.0522C18.7604 12.8647 19.1667 13.8473 19.1667 15.0001C19.1667 16.1529 18.7604 17.1355 17.9479 17.948C17.1354 18.7605 16.1528 19.1667 15 19.1667ZM16.3958 16.9792L16.9792 16.3959L15.4167 14.8334V12.5001H14.5833V15.1667L16.3958 16.9792Z"
                      fill="#1D1D1B"
                    />
                  </g>
                </svg>
                <span> {{ vacancy.employment_type }} </span>
              </div>
              <div v-if="vacancy && vacancy.city">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <mask
                    id="mask0_202_16362"
                    style="mask-type: alpha"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                  >
                    <rect width="20" height="20" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_202_16362)">
                    <path
                      d="M10.0007 9.99996C10.459 9.99996 10.8513 9.83677 11.1777 9.51038C11.5041 9.18399 11.6673 8.79163 11.6673 8.33329C11.6673 7.87496 11.5041 7.4826 11.1777 7.15621C10.8513 6.82982 10.459 6.66663 10.0007 6.66663C9.54232 6.66663 9.14996 6.82982 8.82357 7.15621C8.49718 7.4826 8.33398 7.87496 8.33398 8.33329C8.33398 8.79163 8.49718 9.18399 8.82357 9.51038C9.14996 9.83677 9.54232 9.99996 10.0007 9.99996ZM10.0007 16.125C11.6951 14.5694 12.952 13.1562 13.7715 11.8854C14.5909 10.6145 15.0007 9.48607 15.0007 8.49996C15.0007 6.98607 14.518 5.74649 13.5527 4.78121C12.5875 3.81593 11.4034 3.33329 10.0007 3.33329C8.59787 3.33329 7.41385 3.81593 6.44857 4.78121C5.48329 5.74649 5.00065 6.98607 5.00065 8.49996C5.00065 9.48607 5.41037 10.6145 6.22982 11.8854C7.04926 13.1562 8.30621 14.5694 10.0007 16.125ZM10.0007 18.3333C7.76454 16.4305 6.0944 14.6632 4.99023 13.0312C3.88607 11.3993 3.33398 9.88885 3.33398 8.49996C3.33398 6.41663 4.00412 4.7569 5.3444 3.52079C6.68468 2.28468 8.23676 1.66663 10.0007 1.66663C11.7645 1.66663 13.3166 2.28468 14.6569 3.52079C15.9972 4.7569 16.6673 6.41663 16.6673 8.49996C16.6673 9.88885 16.1152 11.3993 15.0111 13.0312C13.9069 14.6632 12.2368 16.4305 10.0007 18.3333Z"
                      fill="#1D1D1B"
                    />
                  </g>
                </svg>
                {{ vacancy.city }}
              </div>
            </div>
            <div class="block" v-if="vacancy && vacancy.description">
              <p class="title">{{ $t("description") }}:</p>
              <div v-html="vacancy.description" class="description"></div>
            </div>
            <div class="block" v-if="vacancy && vacancy.liabilities">
              <p class="title">{{ $t("responsibilities") }}:</p>
              <div v-html="vacancy.liabilities"></div>
            </div>
            <div class="block" v-if="vacancy && vacancy.requirements">
              <p class="title">{{ $t("requirements") }}:</p>
              <div v-html="vacancy.requirements"></div>
            </div>
          </div>
          <form class="vacancy-inner__form" @submit.prevent="sendVacancies()">
            <p class="title">{{ $t("applyForJob") }}</p>
            <p class="description">
              {{ $t("leaveYourDetails") }}
            </p>
            <div class="text-field">
              <label for=""> {{ $t("firstName") }}</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Аскар"
                required
              />
              <ul v-if="errors.name">
                <li v-for="error in errors.name" class="error-message">
                  {{ error }}
                </li>
              </ul>
            </div>
            <div class="text-field">
              <label for="">
                {{ $t("lastName") }}
              </label>
              <input
                v-model="form.surname"
                type="text"
                placeholder="Аскаров"
                required
              />
              <ul v-if="errors.surname">
                <li v-for="error in errors.surname" class="error-message">
                  {{ error }}
                </li>
              </ul>
            </div>
            <div class="text-field">
              <label for="">
                {{ $t("phone") }}
              </label>
              <input
                v-model="form.phone_number"
                type="tel"
                placeholder="+7 ("
                required
              />
              <ul v-if="errors.phone_number">
                <li v-for="error in errors.phone_number" class="error-message">
                  {{ error }}
                </li>
              </ul>
            </div>
            <div class="text-field">
              <label for="">E-mail</label>
              <input
                v-model="form.email"
                type="text"
                placeholder="ndpp@gmail.com"
                required
              />
              <ul v-if="errors.email">
                <li v-for="error in errors.email" class="error-message">
                  {{ error }}
                </li>
              </ul>
            </div>
            <button class="main-button" type="submit">
              {{ $t("apply") }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Breadcrumb from "@/components/global/Breadcrumb.vue";
import {
  ref,
  useRouter,
  useRoute,
  useStore,
  computed,
  onMounted,
} from "@nuxtjs/composition-api";
import Loader from "~/components/global/Loader.vue";

export default {
  components: {
    Breadcrumb,
    Loader,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const loading = computed(() => store.state.career.isLoading);
    const vacancy = computed(() => store.state.career.vacancy.data);

    const form = ref({
      name: "",
      surname: "",
      phone_number: "+7",
      email: "",
    });

    const errors = ref({});

    const sendVacancies = async () => {
      try {
        // Попытка отправить данные
        await store.dispatch(
          "career/sendCareer",
          route.value.params.id,
          form.value
        );
        // Очистка ошибок, если отправка прошла успешно
        errors.value = {};
      } catch (err) {
        // Обработка ошибок, если запрос не удался
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.data
        ) {
          errors.value = err.response.data.data;
        } else {
          // Общее сообщение об ошибке, если структура ошибки неизвестна
          errors.value = { message: "Произошла ошибка при отправке формы" };
        }
      }
    };

    onMounted(async () => {
      await store.dispatch("career/fetchVacancyData", route.value.params.id);
    });

    return {
      store,
      form,
      sendVacancies,
      errors,
      router,
      route,
      loading,
      vacancy,
    };
  },
};
</script>

<style></style>
