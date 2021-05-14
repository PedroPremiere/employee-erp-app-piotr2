<template>
    <v-card>
        <v-card-title>
            <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            v-model="user.firstName"
                            :error-messages="firstNameErrors"
                            label="First name*"
                            required
                            @input="$v.user.firstName.$touch"
                        />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            v-model="user.lastName"
                            :error-messages="lastNameErrors"
                            label="Last name*"
                            required
                            @input="$v.user.lastName.$touch"
                        />
                    </v-col>
                    <v-col v-if="isPasswordRequired" cols="12">
                        <v-text-field
                            v-model="user.password"
                            label="Password*"
                            type="password"
                            :error-messages="passwordErrors"
                            @input="$v.user.password.$touch"
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
                                />
                            </template>
                            <v-date-picker
                                v-model="user.birthDate"
                                no-title
                                scrollable
                            >
                                <v-spacer />
                                <v-btn
                                    text
                                    color="primary"
                                    @click="menu = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="setBirthDate"
                                >
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="close">
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
            passwordRepeat: ''
        };
    },
    watch: {
        selectedUser: {
            handler(value) {
                this.user = { ...value };
            },
            immediate: true
        }
    },
    methods: {
        setBirthDate() {
            this.$refs.menu.save(this.user.birthDate);
        },
        reset() {
            this.user = { ...this.defaultForm };
            this.$v.$reset();
        },
        save() {
            this.$emit('save', this.user);
            this.reset();
        },
        close() {
            this.$emit('close');
            this.reset();
        }
    }
};
</script>
