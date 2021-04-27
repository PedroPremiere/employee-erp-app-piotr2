import axios from '@/plugins/axios';

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
        }
        //@todo
        /*
        addUser(state, data) {
            state.users.push(data);
        },
        removeUser() { },
        updateUser() {}
        */
    },
    actions: {
        async index({ commit }) {
            const { data } = await axios.get('/users');

            commit('setUsers', data);

            return data;
        }
        //@toDo
        /*
        async create({ commit }, user) {
            //const { data } = await axios.post('/users', user);

            commit('addUser', data);
        },
        async update({ commit }, user) {
            const { data } = await axios.put('/users/' + user.id, user);

            commit('updateUser');
        },
        async remove({ commit }, user) {
            console.log(user.id);
            const { data } = await axios.delete('/users/${user.id}');
            console.log(data);
            commit('removeUser');
        }
        */
    }
};

export default users;
