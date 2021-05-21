<template>
    <v-container fill-height>
        <v-row justify="center" align="center">
            <v-col>
                <v-card
                    v-if="isLoggedIn"
                    elevation="2"
                    align="center"
                    justify="center"
                    class="py-4 mx-auto"
                >
                    <h3 align="center" justify="center"> Logout </h3>
                    <v-btn
                        class="mt-6"
                        color="primary"
                        elevation="2"
                        @click="logout"
                    >
                        LogOut
                    </v-btn>
                </v-card>

                <v-card
                    v-else
                    elevation="2"
                    class="py-4 mx-auto"
                    align="center"
                    justify="center"
                >
                    <h3 align="center" justify="center"> Login </h3>
                    <v-row class="mt-6" justify="center">
                        <v-col cols="10" sm="5" md="3">
                            <v-text-field
                                v-model="email"
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
                        Login
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import loginValidatorMixin from '@/validators/login.mixin';

export default {
    name: 'Login',
    mixins: [loginValidatorMixin],
    data() {
        return {
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
                this.$router.push('Main');
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
