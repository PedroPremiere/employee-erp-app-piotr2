const contracts = {
    namespaced: true,
    state: () => ({
        contracts: []
    }),
    getters: {
        items: state => state.contracts
    },
    mutations: {
        setContracts(state, data) {
            state.contracts = data;
        },
        removeContract(state, id) {
            const index = state.contracts.findIndex(
                contract => contract.id === id
            );
            state.contracts.splice(index, 1);
        },
        updateContract(state, newcontract) {
            const index = state.contracts.findIndex(
                contract => contract.id === newcontract.id
            );
            state.contracts.splice(index, 1, newcontract);
        },
        addContract(state, data) {
            state.contracts.push(data);
        }
    },
    actions: {
        async index({ commit }) {
            const data = await this.$axios.$get('/contracts');

            commit('setContracts', data);

            return data;
        },
        async remove({ commit }, contract) {
            this.$axios.delete(`/contracts/${contract.id}`);
            commit('removeContract', contract.id);
        },
        async save({ commit }, contract) {
            if (contract.id) {
                const data = await this.$axios.$put(
                    `/contracts/${contract.id}`,
                    contract
                );

                commit('updateContract', data);
            } else {
                let data = await this.$axios.$post('/contracts', contract);

                commit('addContract', data);
            }
        }
    }
};

export default contracts;
