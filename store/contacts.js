import { useApiRequest } from '~/hooks/useApiRequest';

export const state = () => ({
  data: {},
  isLoading: true,
});

export const actions = {
  async fetchContactsData({ commit, rootState }) {
    commit('SET_LOADING', true);

    try {
      const requestFunction = async () => {
        const response = await this.$axios.get('/contacts', {
          headers: { 'Content-Language': rootState.language },
        });
        commit('SET_CONTACTS_DATA', response.data);
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
  SET_CONTACTS_DATA(state, data) {
    state.data = data;
  },
  SET_LOADING(state, loading) {
    state.isLoading = loading;
  },
};
