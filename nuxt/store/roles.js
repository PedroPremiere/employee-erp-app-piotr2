export const getters = {
    isAdmin: (state, getters, rootState) =>
        rootState.auth.user &&
        rootState.auth.user.roles.some(role => role.name === 'admin')
};
