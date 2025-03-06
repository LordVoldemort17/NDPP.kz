import { useApiRequest } from '~/hooks/useApiRequest';

export const state = () => ({
  news: {},
  newsId: {},
  footballTable: {},
  gallery: {},
  isLoading: true,
});

export const actions = {
  async fetchNewsData({ commit, rootState }) {
    commit('SET_LOADING', true);

    try {
      const requestFunction = async () => {
        const response = await this.$axios.get('/news', {
          headers: { 'Content-Language': rootState.language },
        });
        commit('SET_NEWS_DATA', response.data);
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
  async newsId({ commit, rootState }, id) {
    commit('SET_LOADING', true);

    try {
      const requestFunction = async () => {
        const response = await this.$axios.get('/news/' + id, {
          headers: { 'Content-Language': rootState.language },
        });
        commit('SET_NEWSID_DATA', response.data);
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
  async fetchFootbalTableData({ commit, rootState }) {
    commit('SET_LOADING', true);

    try {
      const requestFunction = async () => {
        const response = await this.$axios.get('/get_football_table', {
          headers: { 'Content-Language': rootState.language },
        });
        commit('SET_FOOTBALL_TABLE_DATA', response.data);
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
  async fetchGalleryData({ commit, rootState }) {
    commit('SET_LOADING', true);

    try {
      const requestFunction = async () => {
        const response = await this.$axios.get('/gallery', {
          headers: { 'Content-Language': rootState.language },
        });
        commit('SET_GALLERY_DATA', response.data);
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
  SET_NEWS_DATA(state, data) {
    state.news = data;
  },
  SET_FOOTBALL_TABLE_DATA(state, data) {
    state.footballTable = data;
  },
  SET_LOADING(state, loading) {
    state.isLoading = loading;
  },
  SET_NEWSID_DATA(state, data) {
    state.newsId = data;
  },
  SET_GALLERY_DATA(state, data) {
    state.gallery = data;
  },
};
