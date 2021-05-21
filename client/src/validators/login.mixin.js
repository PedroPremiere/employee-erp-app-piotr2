import { required, minLength, email } from 'vuelidate/lib/validators';
import abstractValidatorMixin from '@/validators/abstract.mixin';

export default {
    mixins: [abstractValidatorMixin],
    data() {
        return {
            apiErrors: {
                password: [],
                email: []
            }
        };
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(8)
        }
    },
    computed: {
        passwordErrors() {
            const errors = [];

            if (!this.$v.password.$dirty) return errors;

            !this.$v.password.required && errors.push('Password is required');

            !this.$v.password.minLength &&
                errors.push('Password must be longer than 8 characters');

            if (this.wrongPasswordOrUserName) {
                errors.push('Wrong password or username');
            }

            return errors.concat(this.apiErrors.password);
        },
        emailErrors() {
            const errors = [];

            if (!this.$v.email.$dirty) return errors;

            !this.$v.email.email && errors.push('Must be valid e-mail');
            !this.$v.email.required && errors.push('Email is required');

            if (this.wrongPasswordOrUserName) {
                errors.push('Wrong password or username');
            }

            return errors.concat(this.apiErrors.email);
        }
    }
};
