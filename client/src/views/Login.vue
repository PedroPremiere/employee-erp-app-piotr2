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
                                v-model="$v.email.$model"
                                label="E mail"
                                outlined
                            />
                        </v-col>
                    </v-row>

                    <v-row justify="center">
                        <v-col cols="10" sm="5" md="3">
                            <v-text-field
                                v-model="password"
                                label="Password"
                                type="password"
                                outlined
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
                    <v-row class="mt-6" justify="center">
                        <v-col cols="10" sm="5" md="3">
                            <v-list justify="center">
                                <v-list-item-group>
                                    <v-list-item v-if="!$v.email.email">
                                        <v-list-item-content>
                                            <v-alert type="error">
                                                Must be correct email
                                            </v-alert>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item v-if="!$v.email.required">
                                        <v-list-item-content>
                                            <v-alert type="error">
                                                Email Field is required
                                            </v-alert>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item v-if="!$v.password.required">
                                        <v-list-item-content>
                                            <v-alert type="error">
                                                Password Field is required
                                            </v-alert>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item v-if="!$v.password.minLength">
                                        <v-list-item-content>
                                            <v-alert type="error">
                                                Must be minimum 8 characters
                                                long
                                            </v-alert>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import loginValidatorMixin from '@/validators/login';

export default {
    name: 'Login',
    mixins: [loginValidatorMixin],
    data() {
        return {
            email: '',
            password: ''
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
                await this.login(credentials);
            } catch (error) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.errors
                ) {
                    console.error(error.response.data.errors);
                } else {
                    console.error(error);
                }
            }
        }
    }
};
</script>
