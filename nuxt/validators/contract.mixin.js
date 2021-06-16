import { required } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import abstractValidatorMixin from '@/validators/abstract.mixin';

export default {
    mixins: [abstractValidatorMixin],
    data() {
        return {
            apiErrors: {
                position: [],
                startDate: [],
                endDate: [],
                userId: [],
                vacationDaysPerYear: []
            }
        };
    },
    validations: {
        contract: {
            position: {
                required
            },
            userId: {
                required
            },
            startDate: {
                required,
                isStartBeforeEnd() {
                    return this.isStartBeforeEnd;
                }
            },
            endDate: {
                required
            },
            vacationDaysPerYear: {
                required
            }
        }
    },
    computed: {
        minEndDate() {
            if (this.contract.startDate) {
                return dayjs(this.contract.startDate)
                    .add(1, 'day')
                    .toISOString();
            }
            return '';
        },
        maxStartDate() {
            if (this.contract.endDate) {
                return dayjs(this.contract.endDate)
                    .subtract(1, 'day')
                    .toISOString();
            }
            return '';
        },
        isUserIdWrong() {
            return (
                this.$v.contract.userId.$dirty && this.$v.contract.userId.$error
            );
        },
        isStartBeforeEnd() {
            if (this.contract.startDate && this.contract.endDate) {
                return this.contract.startDate <= this.contract.endDate;
            }

            return true;
        },
        contractPositionErrors() {
            const errors = [];

            if (!this.$v.contract.position.$dirty) return errors;

            !this.$v.contract.position.required &&
                errors.push('Position is required');

            return errors.concat(this.apiErrors.position);
        },
        userIdErrors() {
            const errors = [];

            if (!this.$v.contract.userId.$dirty) return errors;

            !this.$v.contract.userId.required &&
                errors.push('User is required');

            return errors.concat(this.apiErrors.userId);
        },
        startDateErrors() {
            const errors = [];

            if (!this.$v.contract.startDate.$dirty) return errors;

            !this.$v.contract.startDate.required &&
                errors.push('Start Date is required');

            return errors.concat(this.apiErrors.startDate);
        },
        endDateErrors() {
            const errors = [];

            if (!this.$v.contract.endDate.$dirty) return errors;

            !this.$v.contract.endDate.required &&
                errors.push('End Date is required');

            return errors.concat(this.apiErrors.endDate);
        },
        vacationsErrors() {
            const errors = [];

            if (!this.$v.contract.vacationDaysPerYear.$dirty) return errors;

            !this.$v.contract.vacationDaysPerYear.required &&
                errors.push('Vacation days per year is required');

            return errors.concat(this.apiErrors.vacationDaysPerYear);
        }
    }
};
