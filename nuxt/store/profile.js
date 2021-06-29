const profile = {
    namespaced: true,
    actions: {
        async save(vuexContext, user) {
            await this.$axios.$put(`/auth/profile`, user);
            this.$auth.fetchUser();
        }
    }
};

export default profile;
