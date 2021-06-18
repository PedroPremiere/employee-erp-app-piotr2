import { required, requiredIf } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import abstractValidatorMixin from '@/validators/abstract.mixin';

export default {
    mixins: [abstractValidatorMixin],
    data() {
        return {
            apiErrors: { startDate: [], endDate: [], userId: [] }
        };
    },
    validations: {
        vacation: {
            userId: {
                required: requiredIf(function() {
                    return this.isAdmin;
                })
            },
            startDate: {
                required,
                isStartBeforeEnd() {
                    return this.isStartBeforeEnd;
                }
            },
            endDate: {
                required
            }
        }
    },
    computed: {
        minEndDate() {
            if (this.vacation.startDate) {
                return dayjs(this.vacation.startDate)
                    .add(1, 'day')
                    .toISOString();
            }

            return '';
        },
        maxStartDate() {
            if (this.vacation.endDate) {
                return dayjs(this.vacation.endDate)
                    .add(1, 'day')
                    .toISOString();
            }

            return '';
        },
        isStartBeforeEnd() {
            if (this.vacation.startDate && this.vacation.endDate) {
                return this.vacation.startDate <= this.vacation.endDate;
            }

            return true;
        },
        userIdErrors() {
            const errors = [];

            if (!this.$v.vacation.userId.$dirty) return errors;

            !this.$v.vacation.userId.required &&
                errors.push('User is required');

            return errors.concat(this.apiErrors.userId);
        },
        startDateErrors() {
            const errors = [];

            if (!this.$v.vacation.startDate.$dirty) return errors;

            !this.$v.vacation.startDate.required &&
                errors.push('Start Date is required');

            return errors.concat(this.apiErrors.startDate);
        },
        endDateErrors() {
            const errors = [];

            if (!this.$v.vacation.endDate.$dirty) return errors;

            !this.$v.vacation.endDate.required &&
                errors.push('End Date is required');

            return errors.concat(this.apiErrors.endDate);
        }
    }
};
