import { required, minLength, sameAs } from 'vuelidate/lib/validators';

import abstractValidatorMixin from '@/validators/abstract.mixin';

export default {
    mixins: [abstractValidatorMixin],
    validations: {
        password: {
            required,
            minLength: minLength(8)
        },
        newPassword: {
            required,
            minLength: minLength(8)
        },
        newPasswordRepeat: {
            required,
            sameAs: sameAs(function () {
                return this.newPassword;
            })
        }
    },
    data() {
        return {
            apiErrors: {
                password: [],
                newPassword: [],
                newPasswordRepeat: []
            }
        };
    },
    computed: {
        passwordErrors() {
            const errors = [];

            if (!this.$v.password.$dirty) return errors;

            !this.$v.password.required && errors.push('Password is required');

            !this.$v.password.minLength &&
                errors.push('Password must be longer than 8 characters');

            return errors.concat(this.apiErrors.password);
        },
        newPasswordErrors() {
            const errors = [];

            if (!this.$v.newPassword.$dirty) return errors;

            !this.$v.newPassword.required &&
                errors.push('New password is required');

            !this.$v.newPassword.minLength &&
                errors.push('New password must be longer than 8 characters');

            return errors.concat(this.apiErrors.newPassword);
        },
        newPasswordRepeatErrors() {
            const errors = [];

            if (!this.$v.newPasswordRepeat.$dirty) return errors;

            !this.$v.newPasswordRepeat.required &&
                errors.push('New password repeat is required');

            !this.$v.newPasswordRepeat.sameAs &&
                errors.push(
                    'New password and password confirmation must be the same'
                );

            return errors.concat(this.apiErrors.newPasswordRepeat);
        }
    }
};
