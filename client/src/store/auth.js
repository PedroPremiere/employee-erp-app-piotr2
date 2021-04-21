import axios from '@/plugins/axios';

const auth = {
    namespaced: true,
    state: () => ({
        loggedIn: localStorage.getItem('loggedIn') === 'true'
    }),
    getters: {
        isLoggedIn: state => state.loggedIn
    },
    mutations: {
        login(state) {
            localStorage.setItem('loggedIn', true);
            state.loggedIn = true;
        },
        logout(state) {
            localStorage.removeItem('loggedIn');
            state.loggedIn = false;
        }
    },
    actions: {
        async login({ commit }, credentials) {
            const { data } = await axios.post('/auth/login', credentials);
            commit('login');

            return data;
        },
        async logout({ commit }) {
            await axios.post('/auth/logout');
            commit('logout');
        }
    }
};

export default auth;
