<template>
    <v-card class="mx-auto">
        <v-toolbar color="primary" dark>
            <h3 align="center" justify="center">
                <v-icon large> mdi-security </v-icon>
                Password Reset
            </h3>
        </v-toolbar>
        <v-card-text>
            <v-card-title> Your email </v-card-title>
            <v-card-subtitle> To send reset password link </v-card-subtitle>
            <form class="px-0 py-0 my-5" @submit.prevent="onSubmit">
                <v-text-field
                    v-model="email"
                    prepend-icon="mdi-card-account-mail"
                    :error-messages="emailErrors"
                    label="E-mail"
                    outlined
                    @input="$v.email.$touch"
                />
            </form>
        </v-card-text>
        <v-card-actions>
            <v-btn :disabled="$v.email.$invalid" color="primary" @click="save">
                Send
            </v-btn>
            <v-btn class="mx-5" color="blue darken-1" text @click="close">
                <span> Close </span>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import mailValidatorMixin from '@/validators/mail.mixin';
import { validationMixin } from 'vuelidate';
import { mapActions } from 'vuex';

export default {
    name: 'PasswordResetForm',
    mixins: [validationMixin, mailValidatorMixin],
    data() {
        return {
            email: ''
        };
    },
    methods: {
        ...mapActions({
            send: 'auth/passwordResetRequest'
        }),
        reset() {
            this.email = '';
            this.$v.$reset();
        },
        close() {
            this.$emit('close');
            this.reset();
        },
        async save() {
            try {
                this.$v.$touch();

                if (this.$v.$invalid) {
                    return;
                }

                await this.send(this.email);

                this.$notify({
                    group: 'errors',
                    title: 'success',
                    text: 'Reset password link has been sent do your mail',
                    type: 'success'
                });
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
