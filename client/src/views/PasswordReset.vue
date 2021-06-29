<template>
    <v-container fill-height>
        <v-row justify="center" align="center">
            <v-col cols="6">
                <v-card>
                    <v-toolbar class="px-2" color="primary" dark>
                        <v-icon large> mdi-security </v-icon>
                        Password Reset
                    </v-toolbar>
                    <v-card-text>
                        <form class="px-0 py-0" @submit.prevent="onSubmit">
                            <v-row class="mt-1">
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="passwordAndRepeat.password"
                                        :error-messages="passwordErrors"
                                        prepend-icon="mdi-form-textbox-password"
                                        label="Password*"
                                        type="password"
                                        @input="
                                            $v.passwordAndRepeat.password.$touch
                                        "
                                        @blur="
                                            $v.passwordAndRepeat.password.$touch
                                        "
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="
                                            passwordAndRepeat.passwordRepeat
                                        "
                                        :error-messages="passwordRepeatErrors"
                                        prepend-icon="mdi-form-textbox-password"
                                        label="Password Repeat*"
                                        type="password"
                                        @input="$v.$touch"
                                        @blur="$v.$touch"
                                    />
                                </v-col>
                            </v-row>
                        </form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn
                            :disabled="$v.$invalid"
                            color="blue darken-1"
                            text
                            @click="save"
                        >
                            <span>Save </span>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import passwordValidatorMixin from '@/validators/password.mixin';
import { validationMixin } from 'vuelidate';

export default {
    name: 'PasswordReset',
    data() {
        return {
            passwordAndRepeat: {
                passwordRepeat: '',
                password: ''
            },
            code: this.$route.params.code
        };
    },
    mixins: [validationMixin, passwordValidatorMixin],
    methods: {
        ...mapActions({
            passwordReset: 'auth/passwordReset'
        }),
        async save() {
            try {
                this.$v.$touch();

                if (this.$v.$invalid) {
                    return;
                }

                await this.passwordReset({
                    passwordAndRepeat: this.passwordAndRepeat,
                    code: this.code
                });

                this.$notify({
                    group: 'errors',
                    title: 'success',
                    text: 'Password has been changed',
                    type: 'success'
                });

                this.$router.push('/Login');
            } catch (error) {
                console.error(error);

                this.$notify({
                    group: 'errors',
                    title: 'Error',
                    text: 'Something went wrong',
                    type: 'error'
                });

                this.parseApiErrors(error);
            }
        }
    }
};
</script>
