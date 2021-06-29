<template>
    <v-container fill-height>
        <v-row justify="center" align="center">
            <v-col>
                <v-card
                    v-if="isLoggedIn"
                    elevation="2"
                    align="center"
                    justify="center"
                    class="pb-4 mx-auto"
                >
                    <v-toolbar class="px-2" color="primary" dark>
                        <h3 align="center" justify="center">
                            <v-icon large> mdi-logout </v-icon>
                            Logout
                        </h3>
                    </v-toolbar>
                    <v-btn
                        class="mt-6"
                        color="primary"
                        elevation="2"
                        @click="logout"
                    >
                        <v-icon large> mdi-logout </v-icon>
                        LogOut
                    </v-btn>
                </v-card>

                <v-card
                    v-else
                    elevation="2"
                    class="pb-4 mx-auto"
                    align="center"
                    justify="center"
                >
                    <v-toolbar class="px-2" color="primary" dark>
                        <h3 align="center" justify="center">
                            <v-icon large> mdi-login </v-icon>
                            Login
                        </h3>
                    </v-toolbar>
                    <form class="px-0 py-0" @submit.prevent="onSubmit">
                        <v-row class="mt-6" justify="center">
                            <v-col cols="10" sm="5" md="3">
                                <v-text-field
                                    v-model="email"
                                    prepend-icon="mdi-card-account-mail"
                                    :error-messages="emailErrors"
                                    label="E mail"
                                    outlined
                                    @input="$v.email.$touch"
                                />
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="10" sm="5" md="3">
                                <v-text-field
                                    v-model="password"
                                    prepend-icon="mdi-form-textbox-password"
                                    :error-messages="passwordErrors"
                                    label="Password"
                                    type="password"
                                    outlined
                                    @input="$v.password.$touch"
                                />
                            </v-col>
                        </v-row>
                        <v-btn
                            :disabled="$v.$invalid"
                            class="mb-6"
                            color="primary"
                            elevation="2"
                            @click="onLogin"
                        >
                            <v-icon large> mdi-login </v-icon>
                            Login
                        </v-btn>
                    </form>
                    <v-btn
                        class="mb-6"
                        color="primary"
                        elevation="2"
                        @click="isPasswordResetOpen = true"
                        text
                    >
                        Forgot Password?
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog v-model="isPasswordResetOpen" max-width="500px">
            <password-reset-form @close="isPasswordResetOpen = false" />
        </v-dialog>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import loginValidatorMixin from '@/validators/login.mixin';

import PasswordResetForm from '@/components/PasswordResetForm';

export default {
    name: 'Login',
    mixins: [loginValidatorMixin],
    components: { PasswordResetForm },
    data() {
        return {
            isPasswordResetOpen: false,
            email: '',
            password: '',
            wrongPasswordOrUserName: false
        };
    },
    computed: {
        ...mapGetters({
            isLoggedIn: 'auth/isLoggedIn'
        })
    },
    methods: {
        ...mapActions({
            logout: 'auth/logout',
            login: 'auth/login'
        }),
        async onLogin() {
            const credentials = {
                email: this.email,
                password: this.password
            };

            try {
                this.$v.$touch();

                if (this.$v.$invalid) {
                    return;
                }

                await this.login(credentials);
                this.$notify({
                    group: 'errors',
                    title: 'Welcome',
                    text: 'Welcome, you are logged in',
                    type: 'success'
                });

                this.$router.push('/');
            } catch (error) {
                console.error(error);
                this.$notify({
                    group: 'errors',
                    title: 'Error',
                    text: 'Wrong Password or user name',
                    type: 'error'
                });

                this.parseApiErrors(error);
                this.wrongPasswordOrUserName = true;
            }
        }
    }
};
</script>
