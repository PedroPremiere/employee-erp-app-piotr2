import axios from '@/plugins/axios';

const vacations = {
    namespaced: true,
    state: () => ({
        vacations: []
    }),
    getters: {
        items: state => state.vacations
    },
    mutations: {
        setVacations(state, data) {
            state.vacations = data;
        },
        removeVacations(state, id) {
            const index = state.vacations.findIndex(
                vacation => vacation.id === id
            );
            state.vacations.splice(index, 1);
        },
        updateVacations(state, newVacation) {
            const index = state.vacations.findIndex(
                vacation => vacation.id === newVacation.id
            );
            state.vacations.splice(index, 1, newVacation);
        },
        addVacations(state, data) {
            state.vacations.push(data);
        }
    },
    actions: {
        async index({ commit }) {
            const { data } = await axios.get('/vacations');

            commit('setVacations', data);

            return data;
        },
        async remove({ commit }, vacation) {
            axios.delete(`/vacations/${vacation.id}`);
            commit('removeVacations', vacation.id);
        },
        async save({ commit }, vacation) {
            vacation.isConfirmed = Number(vacation.isConfirmed);

            if (vacation.id) {
                const { data } = await axios.put(
                    `/vacations/${vacation.id}`,
                    vacation
                );

                commit('updateVacations', data);
            } else {
                let { data } = await axios.post('/vacations', vacation);

                commit('addVacations', data);
            }
        }
    }
};

export default vacations;
