<template>
    <v-container>
        <v-card
            v-if="isLoggedIn"
            elevation="2"
            align="center"
            justify="center"
            class="py-4 mx-auto"
        >
            <h3 align="center" justify="center">Logout</h3>
            <v-btn class="mt-6" color="primary" elevation="2" @click="logout">
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
            <h3 align="center" justify="center">Login</h3>
            <v-row class="mt-6" justify="center">
                <v-col cols="10" sm="5" md="3">
                    <v-text-field
                        v-model="$v.email.$model"
                        label="E mail"
                        outlined
                    ></v-text-field>
                </v-col>
                <v-col cols="6" sm="5" md="3">
                    <v-alert type="error" v-if="!$v.email.required">
                        Field is required
                    </v-alert>
                    <v-alert v-if="!$v.email.email" type="error">
                        Must be correct email
                    </v-alert>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col cols="10" sm="5" md="3">
                    <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        outlined
                    ></v-text-field>
                </v-col>
                <v-col cols="10" sm="5" md="3">
                    <v-alert v-if="!$v.password.required" type="error">
                        Field is required
                    </v-alert>
                    <v-alert v-if="!$v.password.minLength" type="error">
                        Must be minimum 8 characters long
                    </v-alert>
                </v-col>
            </v-row>
            <v-btn class="mb-6" color="primary" elevation="2" @click="onLogin">
                Login
            </v-btn>
        </v-card>
    </v-container>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        };
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(8)
        }
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
