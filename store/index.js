export const state = () => ({
  language: 'ru'
})

export const mutations = {
  SET_LANGUAGE(state, language) {
    state.language = language
    if (process.client) {
      localStorage.setItem('userLanguage', language) // Сохранение языка в localStorage
    }
  },
  INIT_LANGUAGE(state) {
    if (process.client) {
      const supportedLanguages = ["en", "ru", "kz"]
      let userLang = localStorage.getItem('userLanguage') // Извлечение сохраненного языка из localStorage

      if (!userLang) {
        userLang = 'ru'
        localStorage.setItem('userLanguage', userLang) // Сохранение языка в localStorage при инициализации
      }

      state.language = userLang // Установка языка из localStorage или системного языка
    }
  }
}

export const actions = {
  nuxtClientInit({ commit }) {
    commit('INIT_LANGUAGE') // Инициализация языка при загрузке клиента
  },
  setLanguage({ commit, rootState }, language) {
    commit('SET_LANGUAGE', language);
  }
}
