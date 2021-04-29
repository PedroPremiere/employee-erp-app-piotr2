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
import { required, alpha, email } from 'vuelidate/lib/validators';

export default {
    name: 'UserForm',
    mixins: [validationMixin],
    props: {
        selectedUser: { type: Object, default: () => ({}), required: false }
    },
    validations: {
        user: {
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
        }
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
            user: defaultForm
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
            this.$emit('save');
            this.reset();
        },
        close() {
            this.$emit('close');
            this.reset();
        }
    }
};
</script>
