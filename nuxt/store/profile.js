const profile = {
    namespaced: true,
    actions: {
        async save(vuexContext, user) {
            await this.$axios.$put(`/auth/profile`, user);
            this.$auth.fetchUser();
        },

        passwordResetRequest(vuexContext, email) {
            return this.$axios.$post(`/auth/password-reset`, {
                email
            });
        },
        passwordReset(vuexContext, { passwordAndRepeat, code }) {
            return this.$axios.$post(
                `/auth/password-reset/${code}`,
                passwordAndRepeat
            );
        },
        passwordChange(
            vuexContext,
            { currentPassword, password, passwordConfirmation }
        ) {
            return this.$axios.$post(`/auth/password-change`, {
                currentPassword,
                password,
                passwordConfirmation
            });
        }
    }
};

export default profile;
