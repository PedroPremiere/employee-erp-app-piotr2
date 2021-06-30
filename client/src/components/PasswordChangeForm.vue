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
                            v-model="password"
                            :error-messages="passwordErrors"
                            prepend-icon="mdi-form-textbox-password"
                            label="Old password*"
                            type="password"
                            @input="$v.password.$touch"
                        />
                    </v-col>
                </v-row>
                <v-row class="mt-1">
                    <v-col cols="12">
                        <v-text-field
                            v-model="newPassword"
                            :error-messages="newPasswordErrors"
                            prepend-icon="mdi-form-textbox-password"
                            label="New password*"
                            type="password"
                            @input="$v.newPassword.$touch"
                        />
                    </v-col>
                </v-row>
                <v-row class="mt-1">
                    <v-col cols="12">
                        <v-text-field
                            v-model="newPasswordRepeat"
                            :error-messages="newPasswordRepeatErrors"
                            prepend-icon="mdi-form-textbox-password"
                            label="New password Repeat*"
                            type="password"
                            @input="$v.newPasswordRepeat.$touch"
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
</template>

<script>
import { validationMixin } from 'vuelidate';
import passwordChangeMixin from '@/validators/passwordChange.mixin';

export default {
    name: 'PasswordChangeForm',
    mixins: [validationMixin, passwordChangeMixin],
    data() {
        return {
            password: '',
            newPassword: '',
            newPasswordRepeat: ''
        };
    },
    methods: {
        async save() {
            // to do implement this
            console.log('save');
            this.$emit('close');
        }
    }
};
</script>
