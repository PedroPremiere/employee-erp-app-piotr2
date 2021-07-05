<template>
    <v-card>
        <v-toolbar class="px-2" color="primary" dark>
            <v-icon large> mdi-security </v-icon>
            Set New Password
        </v-toolbar>
        <v-card-text>
            <form class="px-0 py-0" @submit.prevent="onSubmit">
                <v-row class="mt-1">
                    <v-col cols="12">
                        <v-text-field
                            v-model="formData.currentPassword"
                            :error-messages="currentPasswordErrors"
                            prepend-icon="mdi-form-textbox-password"
                            label="Current password*"
                            type="password"
                            @input="$v.formData.currentPassword.$touch"
                        />
                    </v-col>
                </v-row>
                <v-row class="mt-1">
                    <v-col cols="12">
                        <v-text-field
                            v-model="formData.password"
                            :error-messages="passwordErrors"
                            prepend-icon="mdi-form-textbox-password"
                            label="New password*"
                            type="password"
                            @input="$v.formData.password.$touch"
                        />
                    </v-col>
                </v-row>
                <v-row class="mt-1">
                    <v-col cols="12">
                        <v-text-field
                            v-model="formData.passwordConfirmation"
                            :error-messages="passwordConfirmationErrors"
                            prepend-icon="mdi-form-textbox-password"
                            label="passwordConfirmation*"
                            type="password"
                            @input="$v.formData.passwordConfirmation.$touch"
                        />
                    </v-col>
                </v-row>
            </form>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="$emit('close')">
                <span>Close </span>
            </v-btn>

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
</template>

<script>
import { validationMixin } from 'vuelidate';
import passwordChangeMixin from '@/validators/passwordChange.mixin';
import { mapActions } from 'vuex';

export default {
    name: 'PasswordChangeForm',
    mixins: [validationMixin, passwordChangeMixin],
    data() {
        const defaultForm = {
            currentPassword: '',
            password: '',
            passwordConfirmation: ''
        };

        return {
            defaultForm,
            formData: { ...defaultForm }
        };
    },
    methods: {
        ...mapActions({
            passwordChange: 'profile/passwordChange'
        }),
        reset() {
            this.formData = { ...this.defaultForm };
            this.$emit('close');
            this.$v.$reset();
        },
        async save() {
            try {
                this.$v.$touch();

                if (this.$v.$invalid) {
                    return;
                }

                await this.passwordChange(this.formData);

                this.$notify({
                    group: 'errors',
                    title: 'success',
                    text: 'Password has been changed',
                    type: 'success'
                });

                this.reset();
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
