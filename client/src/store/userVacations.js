import axios from '@/plugins/axios';

const userVacations = {
    namespaced: true,
    state: () => ({
        userVacations: []
    }),
    getters: {
        items: state => state.userVacations
    },
    mutations: {
        setUserVacations(state, data) {
            state.userVacations = data;
        }
    },
    actions: {
        async filterByUser({ commit }, userId) {
            const { data } = await axios.get(`/vacations?userId=${userId}`);

            commit('setUserVacations', data);

            return data;
        }
    }
};

export default userVacations;
