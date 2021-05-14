import { required, minLength, email } from 'vuelidate/lib/validators';

export default {
    validations: {
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(8)
        }
    }
};
