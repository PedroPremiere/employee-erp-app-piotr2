import Vue from 'vue';
import _ from 'lodash';
import Vuelidate from 'vuelidate';
import Notifications from 'vue-notification';
import vuetify from './plugins/vuetify';
import App from './App';
import router from './router';
import store from './store';

Vue.use(Vuelidate);
Vue.use(Notifications);
Vue.config.productionTip = false;

Vue.prototype._ = _;

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app');
