<template>
    <v-card>
        <v-toolbar class="px-2" color="primary" dark> User Profile </v-toolbar>
        <v-card-text>
            <v-row class="mt-1">
                <v-col cols="12">
                    <v-text-field
                        v-model="user.firstName"
                        :error-messages="firstNameErrors"
                        label="First name*"
                        required
                        @input="$v.user.firstName.$touch"
                        @focus="apiErrors.firstName = []"
                    />
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        v-model="user.lastName"
                        :error-messages="lastNameErrors"
                        label="Last name*"
                        required
                        @input="$v.user.lastName.$touch"
                        @focus="apiErrors.lastName = []"
                    />
                </v-col>
                <v-col v-if="isPasswordRequired" cols="12">
                    <v-text-field
                        v-model="user.password"
                        label="Password*"
                        type="password"
                        :error-messages="passwordErrors"
                        @input="$v.user.password.$touch"
                        @focus="apiErrors.password = []"
                    />
                </v-col>
                <v-col v-if="isPasswordRequired" cols="12">
                    <v-text-field
                        v-model="passwordRepeat"
                        label="Password Repeat*"
                        type="password"
                    />
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        v-model="user.email"
                        :error-messages="emailErrors"
                        label="Email*"
                        required
                        @input="$v.user.email.$touch"
                        @focus="apiErrors.email = []"
                    />
                </v-col>
                <v-col cols="12">
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="user.birthDate"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template #[`activator`]="{ on, attrs }">
                            <v-text-field
                                v-model="user.birthDate"
                                :error-messages="birthDateErrors"
                                label="Birth Date*"
                                required
                                readonly
                                v-bind="attrs"
                                prepend-icon="mdi-calendar"
                                v-on="on"
                                @input="$v.user.birthDate.$touch"
                                @focus="apiErrors.password = []"
                            />
                        </template>
                        <v-date-picker
                            v-model="user.birthDate"
                            no-title
                            scrollable
                        >
                            <v-spacer />
                            <v-btn text color="primary" @click="menu = false">
                                Cancel
                            </v-btn>
                            <v-btn text color="primary" @click="setBirthDate">
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn class="mx-5" color="blue darken-1" text @click="close">
                <span> Close </span>
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
import { mapActions } from 'vuex';

import userValidatorMixin from '@/validators/user.mixin';

export default {
    name: 'UserForm',
    mixins: [validationMixin, userValidatorMixin],
    props: {
        selectedUser: { type: Object, default: () => ({}) }
    },
    data() {
        const defaultForm = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            birthDate: ''
        };

        return {
            defaultForm,
            menu: false,
            user: defaultForm,
            passwordRepeat: '',
            errors: []
        };
    },
    watch: {
        selectedUser: {
            handler(value) {
                this.reset();
                this.user = { ...value };
            },
            immediate: true
        }
    },
    methods: {
        ...mapActions({
            saveUser: 'users/save'
        }),
        setBirthDate() {
            this.$refs.menu.save(this.user.birthDate);
        },
        resetPasswordRepeat() {
            this.passwordRepeat = '';
        },
        reset() {
            this.resetPasswordRepeat();
            this.apiErrors = {};
            this.$v.$reset();
        },
        close() {
            this.$emit('close');
            this.reset();
        },
        async save() {
            try {
                await this.saveUser(this.user);
                this.$notify({
                    group: 'errors',
                    title: 'success',
                    text: 'User has been saved',
                    type: 'success'
                });
                this.$emit('close');
            } catch (error) {
                console.error(error);
                this.$notify({
                    group: 'errors',
                    title: 'Error',
                    text: 'Something went wrong',
                    type: 'error'
                });

                this.parseApiErrors(error);
                this.$v.$reset();
                this.$v.$touch();
                this.resetPasswordRepeat();
            }
        }
    }
};
</script>
