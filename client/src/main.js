import Vue from 'vue';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import vuetify from './plugins/vuetify';
import App from './App';
import router from './router';

Vue.use(Vuex);
Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app');
