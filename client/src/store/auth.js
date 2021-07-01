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
        setUser(state, data) {
            state.user = data;
        },
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
        },
        async save({ commit }, user) {
            const { data } = await axios.put(`/auth/profile`, user);

            commit('setUser', data);
        },
        async me({ commit }) {
            const { data } = await axios.get('/auth/me');

            commit('setUser', data);
        },
        async passwordResetRequest(vuexContext, email) {
            const { data } = await axios.post(`/auth/password-reset`, {
                email
            });

            return data;
        },
        async passwordReset(vuexContext, { passwordAndRepeat, code }) {
            const { data } = await axios.post(
                `/auth/password-reset/${code}`,
                passwordAndRepeat
            );

            return data;
        },
        async passwordChange(
            vuexContext,
            { currentPassword, password, passwordConfirmation }
        ) {
            const { data } = await axios.post(`/auth/password-change`, {
                currentPassword,
                password,
                passwordConfirmation
            });

            return data;
        }
    }
};

export default auth;
