<template>
    <v-container fill-height>
        <v-row justify="center" align="center">
            <v-col>
                <v-card
                    elevation="2"
                    class="pb-4 mx-auto"
                    align="center"
                    justify="center"
                >
                    <v-toolbar class="px-2" color="primary" dark>
                        <h3>Login</h3>
                    </v-toolbar>
                    <v-row class="mt-6" justify="center">
                        <v-col cols="10" sm="5" md="3">
                            <v-text-field
                                v-model="email"
                                :error-messages="emailErrors"
                                label="Email"
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
import loginValidatorMixin from '@/validators/login.mixin';

export default {
    auth: 'guest',
    name: 'Login',
    mixins: [loginValidatorMixin],
    data() {
        return {
            email: '',
            password: '',
            wrongPasswordOrEmail: false
        };
    },
    methods: {
        async onLogin() {
            try {
                this.$v.$touch();

                if (this.$v.$invalid) {
                    return;
                }

                await this.$auth.loginWith('cookie', {
                    data: {
                        email: this.email,
                        password: this.password
                    }
                });

                this.$notify({
                    group: 'errors',
                    title: 'Welcome',
                    text: 'Welcome, you are logged in',
                    type: 'success'
                });
            } catch (error) {
                console.error(error);

                if (error.response && error.response.status === 401) {
                    this.$notify({
                        group: 'errors',
                        title: 'Error',
                        text: 'Wrong Password or email',
                        type: 'error'
                    });

                    this.wrongPasswordOrEmail = true;
                } else {
                    this.$notify({
                        group: 'errors',
                        title: 'Error',
                        text: 'Something went wrong',
                        type: 'error'
                    });
                }

                this.parseApiErrors(error);
            }
        }
    }
};
</script>
