export default {
    axios: {
        credentials: true,
        baseURL: process.env.API_URL
    },
    server: {
        port: process.env.PORT
    },
    auth: {
        redirect: {
            login: '/login',
            logout: '/login',
            callback: false,
            home: '/'
        },
        scopeKey: 'roles',
        strategies: {
            cookie: {
                endpoints: {
                    login: { url: '/auth/login', method: 'post' },
                    logout: { url: '/auth/logout', method: 'post' },
                    user: {
                        url: '/auth/me',
                        method: 'get'
                    }
                },
                user: { autoFetch: true, property: false },
                tokenRequired: false,
                tokenType: false
            }
        }
    },

    router: {
        middleware: ['auth']
    },

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - nuxt',
        title: 'nuxt',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['~/assets/main'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/vuelidate' },
        { src: '~plugins/notify.client', mode: 'client' },
        { src: '~plugins/notify.server', mode: 'server' }
    ],

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
        '@nuxtjs/eslint-module'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
};
