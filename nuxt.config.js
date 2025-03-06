export default {
  target: 'static',
  ssr: false,
  head: {
    title: 'NDPP | Инновации и экология в мире фосфора',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og:description', name: 'og:description', content: 'Инновации и экология в мире фосфора' }
    ],
    link: [
      { hid: 'og:image', name: 'og:image', content: '/favicon.ico' },
      { hid: 'og:icon', name: 'og:icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'normalize.css',
    '~/styles/index.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/language.js',
    { src: '~/plugins/nuxtClientInit.js', mode: 'client' },
    {
      src: '~/plugins/vue-video-background.js',
      mode: 'client'
    },
    { src: './plugins/vue-slick-carousel.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/composition-api/module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://admin.ndpp.kz/api',
  },

  env: {
    baseUrl: process.env.BASE_URL
  },

  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL
  },

  i18n: {
    locales: ["ru", "en", "kz"],
    defaultLocale: 'ru',
    strategy: 'no_prefix',
    vueI18nLoader: true,
    vueI18n: {
      fallbackLocale: 'ru',
      messages: {
        en: require('./langs/en.json'),
        ru: require('./langs/ru.json'),
        kz: require('./langs/kz.json')
      }
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
    },
    loaders: {
      scss: {
        implementation: require('sass')
      },
    },
  }
}
