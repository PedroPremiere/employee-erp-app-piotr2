import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import users from './users';
import contracts from './contracts';
import userContracts from './userContracts';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: { auth, users, contracts, userContracts }
});

export default store;
