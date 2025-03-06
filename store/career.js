import { useApiRequest } from '~/hooks/useApiRequest';

export const state = () => ({
  data: {},
  vacancies: {},
  hr: {},
  vacancy: {},
  isLoading: true,
  sendLoading: false,
});

export const actions = {
  async fetchCareersData({ commit, rootState }) {
    commit('SET_LOADING', true);

    try {
      const requestFunction = async () => {
        const response = await this.$axios.get('/career-programs', {
          headers: { 'Content-Language': rootState.language },
        });
        commit('SET_CAREERS_DATA', response.data);
      };

      const { fetchData } = useApiRequest(requestFunction);
      await fetchData();
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      // Возможно, хотите добавить здесь дополнительную логику обработки ошибок
    } finally {
      commit('SET_LOADING', false); // Устанавливается в false, даже если произошла ошибка
    }
  },
  async fetchVacanciesData({ commit, rootState }) {
    commit('SET_LOADING', true);

    try {
      const requestFunction = async () => {
        const response = await this.$axios.get('/vacancies', {
          headers: { 'Content-Language': rootState.language },
        });

        const response2 = await this.$axios.get('/hr-contacts', {
          headers: { 'Content-Language': rootState.language },
        })


        commit('SET_VACANCIES_DATA', response.data);
        commit('SET_HR_DATA', response2.data)
      };

      const { fetchData } = useApiRequest(requestFunction);
      await fetchData();
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      // Возможно, хотите добавить здесь дополнительную логику обработки ошибок
    } finally {
      commit('SET_LOADING', false); // Устанавливается в false, даже если произошла ошибка
    }
  },
  async fetchVacancyData({ commit, rootState }, id) {
    commit('SET_LOADING', true);

    try {
      const requestFunction = async () => {
        const response = await this.$axios.get('/vacancy/' + id, {
          headers: { 'Content-Language': rootState.language },
        });
        commit('SET_VACANCY_DATA', response.data);
      };

      const { fetchData } = useApiRequest(requestFunction);
      await fetchData();
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      // Возможно, хотите добавить здесь дополнительную логику обработки ошибок
    } finally {
      commit('SET_LOADING', false); // Устанавливается в false, даже если произошла ошибка
    }
  },
  async fetchFilterData({ commit, rootState }, { city, employment_type } = {}) {
    try {
      let queryString = '/vacancies';
      const queryParams = [];

      if (city && city !== '') queryParams.push(`city=${encodeURIComponent(city)}`);
      if (employment_type && employment_type !== '') queryParams.push(`employment_type=${encodeURIComponent(employment_type)}`);

      if (queryParams.length > 0) {
        queryString += `?${queryParams.join('&')}`;
      }

      const response = await this.$axios.get(queryString, {
        headers: { 'Content-Language': rootState.language },
      });

      if (response.data) {
        commit('SET_VACANCIES_DATA', response.data);
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      // Возможно, хотите добавить здесь дополнительную логику обработки ошибок
    } finally {
    }
  },
  async sendCareer({ commit, rootState }, id, payload) {
    try {
      commit('SET_SEND_LOADING', true);

      const response = await this.$axios.post('/vacancy-request/' + id, payload, {
        headers: { 'Content-Language': rootState.language },
      });

      return response.data;
    } catch (error) {
      console.error('Ошибка при получении данных:', error)
      throw error;
    } finally {
      commit('SET_SEND_LOADING', false);
    }
  }
};


export const mutations = {
  SET_CAREERS_DATA(state, data) {
    state.data = data;
  },
  SET_LOADING(state, loading) {
    state.isLoading = loading;
  },
  SET_SEND_LOADING(state, loading) {
    state.sendLoading = loading;
  },
  SET_VACANCIES_DATA(state, data) {
    state.vacancies = data;
  },
  SET_VACANCY_DATA(state, data) {
    state.vacancy = data;
  },
  SET_HR_DATA(state, data) {
    state.hr = data;
  },
};
