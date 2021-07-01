import { required, minLength, sameAs } from 'vuelidate/lib/validators';

import abstractValidatorMixin from '@/validators/abstract.mixin';

export default {
    mixins: [abstractValidatorMixin],
    validations: {
        formData: {
            currentPassword: {
                required,
                minLength: minLength(8)
            },
            password: {
                required,
                minLength: minLength(8)
            },
            passwordConfirmation: {
                required,
                sameAs: sameAs('password')
            }
        }
    },
    data() {
        return {
            apiErrors: {
                currentPassword: [],
                password: [],
                passwordConfirmation: []
            }
        };
    },
    computed: {
        currentPasswordErrors() {
            const errors = [];

            if (!this.$v.formData.currentPassword.$dirty) return errors;

            !this.$v.formData.currentPassword.required &&
                errors.push('Current password is required');

            !this.$v.formData.currentPassword.minLength &&
                errors.push(
                    'Current password must be longer than 8 characters'
                );

            return errors.concat(this.apiErrors.currentPassword);
        },
        passwordErrors() {
            const errors = [];

            if (!this.$v.formData.password.$dirty) return errors;

            !this.$v.formData.password.required &&
                errors.push('New password is required');

            !this.$v.formData.password.minLength &&
                errors.push('New password must be longer than 8 characters');

            return errors.concat(this.apiErrors.password);
        },
        passwordConfirmationErrors() {
            const errors = [];

            if (!this.$v.formData.passwordConfirmation.$dirty) return errors;

            !this.$v.formData.passwordConfirmation.required &&
                errors.push('New password repeat is required');

            !this.$v.formData.passwordConfirmation.sameAs &&
                errors.push(
                    'New password and password confirmation must be the same'
                );

            return errors.concat(this.apiErrors.passwordConfirmation);
        }
    }
};
