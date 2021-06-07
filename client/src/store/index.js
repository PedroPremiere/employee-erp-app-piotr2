import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import users from './users';
import contracts from './contracts';
import vacations from './vacations';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: { auth, users, contracts, vacations }
});

export default store;
