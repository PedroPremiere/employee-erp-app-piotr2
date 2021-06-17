import {
    required,
    alpha,
    email,
    minLength,
    sameAs
} from 'vuelidate/lib/validators';

import abstractValidatorMixin from '@/validators/abstract.mixin';

export default {
    mixins: [abstractValidatorMixin],
    data() {
        return {
            apiErrors: {
                lastName: [],
                firstName: [],
                email: [],
                birthDate: [],
                password: []
            }
        };
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

        if (this.isPasswordRequired) {
            user.password = {
                required,
                minLength: minLength(8),
                sameAs: sameAs(function() {
                    return this.passwordRepeat;
                })
            };
        }

        return { user };
    },
    computed: {
        isPasswordRequired() {
            return !this.selectedUser.id;
        },
        lastNameErrors() {
            const errors = [];

            if (!this.$v.user.lastName.$dirty) return errors;

            !this.$v.user.lastName.alpha && errors.push('Must be valid name');
            !this.$v.user.lastName.required &&
                errors.push('Last name is required');

            return errors.concat(this.apiErrors.lastName);
        },
        firstNameErrors() {
            const errors = [];

            if (!this.$v.user.firstName.$dirty) return errors;

            !this.$v.user.firstName.alpha && errors.push('Must be valid name');
            !this.$v.user.firstName.required &&
                errors.push('First name is required');

            return errors.concat(this.apiErrors.firstName);
        },
        emailErrors() {
            const errors = [];

            if (!this.$v.user.email.$dirty) return errors;

            !this.$v.user.email.email && errors.push('Must be valid e-mail');
            !this.$v.user.email.required && errors.push('Email is required');

            return errors.concat(this.apiErrors.email);
        },
        birthDateErrors() {
            const errors = [];

            if (!this.$v.user.birthDate.$dirty) return errors;

            !this.$v.user.birthDate.required &&
                errors.push('Birth Date is required');

            return errors.concat(this.apiErrors.birthDate);
        },
        passwordErrors() {
            const errors = [];

            if (!this.isPasswordRequired) {
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

            return errors.concat(this.apiErrors.password);
        }
    }
};
