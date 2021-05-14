import axios from '@/plugins/axios';

const userContracts = {
    namespaced: true,
    state: () => ({
        userContracts: []
    }),
    getters: {
        items: state => state.userContracts
    },
    mutations: {
        setUserContracts(state, data) {
            state.userContracts = data;
        }
    },
    actions: {
        async filterByUser({ commit }, userId) {
            const { data } = await axios.get(`/contracts?userId=${userId}`);

            commit('setUserContracts', data);

            return data;
        }
    }
};

export default userContracts;
