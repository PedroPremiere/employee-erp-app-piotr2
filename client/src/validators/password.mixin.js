import { required, minLength, sameAs } from 'vuelidate/lib/validators';

import abstractValidatorMixin from '@/validators/abstract.mixin';

export default {
    mixins: [abstractValidatorMixin],
    validations: {
        passwordAndRepeat: {
            password: {
                required,
                minLength: minLength(8)
            },
            passwordRepeat: {
                required,
                sameAs: sameAs(function () {
                    return this.passwordAndRepeat.password;
                })
            }
        }
    },
    data() {
        return {
            apiErrors: {
                password: [],
                passwordRepeat: []
            }
        };
    },
    computed: {
        passwordErrors() {
            const errors = [];

            if (!this.$v.passwordAndRepeat.password.$dirty) return errors;

            !this.$v.passwordAndRepeat.password.required &&
                errors.push('Password is required');

            !this.$v.passwordAndRepeat.password.minLength &&
                errors.push('Password must be longer than 8 characters');

            return errors.concat(this.apiErrors.password);
        },
        passwordRepeatErrors() {
            const errors = [];

            if (!this.$v.passwordAndRepeat.passwordRepeat.$dirty) return errors;

            !this.$v.passwordAndRepeat.passwordRepeat.required &&
                errors.push('Password Repeat is required');

            !this.$v.passwordAndRepeat.passwordRepeat.sameAs &&
                errors.push(
                    'Password and password confirmation must be the same'
                );

            return errors.concat(this.apiErrors.passwordRepeat);
        }
    }
};
