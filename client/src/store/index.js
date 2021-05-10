import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import users from './users';
import contracts from './contracts';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: { auth, users, contracts }
});

export default store;
