const users = {
    namespaced: true,
    state: () => ({
        users: []
    }),
    getters: {
        items: state => state.users
    },
    mutations: {
        setUsers(state, data) {
            state.users = data;
        },
        removeUser(state, id) {
            const index = state.users.findIndex(user => user.id === id);
            state.users.splice(index, 1);
        },
        updateUser(state, newUser) {
            const index = state.users.findIndex(user => user.id === newUser.id);
            state.users.splice(index, 1, newUser);
        },
        addUser(state, data) {
            state.users.push(data);
        }
    },
    actions: {
        async index({ commit }) {
            const data = await this.$axios.$get('/users');

            commit('setUsers', data);

            return data;
        },
        async filter({ commit }, query) {
            const data = await this.$axios.$get(`/users?query=${query}`);

            commit('setUsers', data);

            return data;
        },
        async remove({ commit }, user) {
            this.$axios.delete(`/users/${user.id}`);
            commit('removeUser', user.id);
        },
        async save({ commit }, user) {
            if (user.id) {
                const data = await this.$axios.$put(`/users/${user.id}`, user);

                commit('updateUser', data);
            } else {
                const data = await this.$axios.$post('/users', user);

                commit('addUser', data);
            }
        }
    }
};

export default users;
