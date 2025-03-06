import { useApiRequest } from '~/hooks/useApiRequest';

export const state = () => ({
  data: {},
  product: {},
  isLoading: true,
});

export const actions = {
  async fetchAboutData({ commit, rootState }) {
    commit('SET_LOADING', true);

    try {
      const requestFunction = async () => {
        const response = await this.$axios.get('/products', {
          headers: { 'Content-Language': rootState.language },
        });
        commit('SET_ABOUT_DATA', response.data);
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
  async fetchFilterData({ commit, rootState }, { category, sort, search } = {}) {
    try {
      let queryString = '/products';
      const queryParams = [];
      if (category && category !== '') queryParams.push(`category=${encodeURIComponent(category)}`);
      if (sort && sort !== '') queryParams.push(`sort=${encodeURIComponent(sort)}`);
      if (search && search.trim() !== '') queryParams.push(`search=${encodeURIComponent(search.trim())}`);

      if (queryParams.length > 0) {
        queryString += `?${queryParams.join('&')}`;
      }

      const response = await this.$axios.get(queryString, {
        headers: { 'Content-Language': rootState.language },
      });

      if (response.data) {
        commit('SET_ABOUT_DATA', response.data);
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      // Возможно, хотите добавить здесь дополнительную логику обработки ошибок
    } finally {
    }
  },
  async productId({ commit, rootState }, id) {
    commit('SET_LOADING', true);

    try {
      const requestFunction = async () => {
        const response = await this.$axios.get('/product/' + id, {
          headers: { 'Content-Language': rootState.language },
        });
        commit('SET_PRODUCT_DATA', response.data);
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
};


export const mutations = {
  SET_ABOUT_DATA(state, data) {
    state.data = data;
  },
  SET_LOADING(state, loading) {
    state.isLoading = loading;
  },
  SET_PRODUCT_DATA(state, data) {
    state.product = data;
  }
};
