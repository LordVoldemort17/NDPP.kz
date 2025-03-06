export default function ({ $axios, store }) {
  $axios.onRequest(config => {
    config.headers['accept-language'] = store.state.language
    return config
  })
}
