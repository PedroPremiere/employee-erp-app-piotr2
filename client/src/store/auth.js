import axios from '@/plugins/axios';

const auth = {
    namespaced: true,
    state: () => ({
        user: localStorage.getItem('user')
    }),
    getters: {
        isLoggedIn: state => !!state.user,
        user: state => state.user
    },
    mutations: {
        login(state, data) {
            localStorage.setItem('user', data);

            state.user = data;
        },
        logout(state) {
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('user');

            state.user = null;
        }
    },
    actions: {
        async login({ commit }, credentials) {
            const { data } = await axios.post('/auth/login', credentials);
            commit('login', data);

            return data;
        },
        async logout({ commit }) {
            await axios.post('/auth/logout');

            commit('logout');
        }
    }
};

export default auth;
