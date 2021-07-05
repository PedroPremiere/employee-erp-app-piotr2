import { required, email } from 'vuelidate/lib/validators';

import abstractValidatorMixin from '@/validators/abstract.mixin';

export default {
    mixins: [abstractValidatorMixin],
    validations: {
        email: {
            required,
            email
        }
    },
    data() {
        return {
            apiErrors: {
                email: []
            }
        };
    },
    computed: {
        emailErrors() {
            const errors = [];

            if (!this.$v.email.$dirty) return errors;

            !this.$v.email.email && errors.push('Must be valid e-mail');
            !this.$v.email.required && errors.push('Email is required');

            return errors.concat(this.apiErrors['email']);
        }
    }
};
