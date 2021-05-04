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
                    <v-col v-if="withPassword" cols="12">
                        <v-text-field
                            v-model="user.password"
                            label="Password*"
                            type="password"
                            :error-messages="passwordErrors"
                            @input="$v.user.password.$touch"
                        />
                    </v-col>
                    <v-col v-if="withPassword" cols="12">
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
import {
    required,
    alpha,
    email,
    minLength,
    requiredIf,
    sameAs
} from 'vuelidate/lib/validators';

export default {
    name: 'UserForm',
    mixins: [validationMixin],
    props: {
        selectedUser: { type: Object, default: () => ({}) },
        withPassword: { type: Boolean, default: () => false, required: false }
    },
    validations() {
        const user = {
            email: {
                required,
                email
            },
            birthDate: {
                required
            },
            lastName: {
                required,
                alpha
            },
            firstName: {
                required,
                alpha
            }
        };

        if (this.withPassword) {
            user.password = {
                required: requiredIf(function () {
                    return this.withPassword;
                }),
                minLength: minLength(8),
                sameAs: sameAs(function () {
                    return this.passwordRepeat;
                })
            };
        }

        return { user };
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
    computed: {
        lastNameErrors() {
            const errors = [];

            if (!this.$v.user.lastName.$dirty) return errors;

            !this.$v.user.lastName.alpha && errors.push('Must be valid name');
            !this.$v.user.lastName.required &&
                errors.push('Last name is required');

            return errors;
        },
        firstNameErrors() {
            const errors = [];

            if (!this.$v.user.firstName.$dirty) return errors;

            !this.$v.user.firstName.alpha && errors.push('Must be valid name');
            !this.$v.user.firstName.required &&
                errors.push('First name is required');

            return errors;
        },
        emailErrors() {
            const errors = [];

            if (!this.$v.user.email.$dirty) return errors;

            !this.$v.user.email.email && errors.push('Must be valid e-mail');
            !this.$v.user.email.required && errors.push('Email is required');

            return errors;
        },
        birthDateErrors() {
            const errors = [];

            if (!this.$v.user.birthDate.$dirty) return errors;

            !this.$v.user.birthDate.required &&
                errors.push('Birth Date is required');

            return errors;
        },
        passwordErrors() {
            const errors = [];

            if (!this.withPassword) {
                return errors;
            }

            if (!this.$v.user.password.$dirty) return errors;

            !this.$v.user.password.required &&
                errors.push('Password is required');

            !this.$v.user.password.minLength &&
                errors.push('Password must be longer than 8 characters');

            !this.$v.user.password.sameAs &&
                errors.push(
                    'Password and password confirmation must be the same'
                );

            return errors;
        }
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
