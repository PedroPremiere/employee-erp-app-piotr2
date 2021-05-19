import axios from '@/plugins/axios';

const auth = {
    namespaced: true,
    state: () => ({
        user: JSON.parse(localStorage.getItem('user'))
    }),
    getters: {
        isLoggedIn: state => !!state.user,
        isAdmin: state => state.user.isAdmin,
        user: state => state.user
    },
    mutations: {
        login(state, data) {
            localStorage.setItem('user', JSON.stringify(data));

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
            data.isAdmin = data.roles.some(role => role.name === 'admin');

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
