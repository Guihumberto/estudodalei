import colors from 'vuetify/es5/util/colors'

export default {
  ssr: "false",
  target: 'static',

  generate: {
    fallback: true
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Leges',
    title: 'Estudo da Lei',
    htmlAttrs: {
      lang: 'pt-br'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Estudo da legislação'
      },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/fantasma.png' }
    ]
  },
  runtimeConfig: {
    private: {
      stripeSecretKey: process.env.STRIPE_SECRET_KEY,
      db: process.env.DATABASE_URL
    },
    public: {
      appDomain: process.env.APP_DOMAIN,
      gitHash: process.env.GITHUB_SHA,
      releaseVersion: process.env.RELEASE_VERSION,
    }
  },
  pageTransition: 'page',
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/main.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@plugins/firebase.js',
    '@/plugins/vue2-filters',
    {src: '@/plugins/vue-scroll-reveal', ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/google-fonts',
    '@nuxtjs/pwa'
  ],
  googleFonts: {
    families: {
      Inter: [300, 500, 700],
      Roboto: [300, 500, 700],
      Poppins: [300, 500, 700],
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/netlify-files',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],
  sitemap:{
    hostname: 'https://www.estudodalei.com.br/',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
