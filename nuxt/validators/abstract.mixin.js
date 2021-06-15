export default {
    data() {
        return {
            apiErrors: {}
        };
    },
    methods: {
        getErrorMessages(value, param) {
            const errorsToAdd = this.filterErrors(value, param);

            return errorsToAdd.map(error => error.message);
        },
        filterErrors(errorArray, param) {
            return errorArray.filter(error => error.param === param);
        },
        parseApiErrors(apiErrors) {
            if (
                apiErrors.response &&
                apiErrors.response.data &&
                apiErrors.response.data.errors
            ) {
                const { errors } = apiErrors.response.data;

                for (let error of errors) {
                    this.apiErrors[error.param] = this.getErrorMessages(
                        errors,
                        error.param
                    );
                }
            }
        }
    }
};
