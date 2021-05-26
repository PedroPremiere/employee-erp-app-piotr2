import { required } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';

export default {
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
                },
                isStartDateOverlapping() {
                    return this.isStartDateAllowed(this.contract.startDate);
                }
            },
            endDate: {
                required,
                isEndDateOverlapping() {
                    return this.isEndDateAllowed(this.contract.endDate);
                }
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
        },
        maxStartDate() {
            if (this.contract.endDate) {
                return dayjs(this.contract.endDate)
                    .subtract(1, 'day')
                    .toISOString();
            }
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

            return errors;
        },
        userIdErrors() {
            const errors = [];

            if (!this.$v.contract.userId.$dirty) return errors;

            !this.$v.contract.userId.required &&
                errors.push('User is required');

            !this.$v.contract.endDate.isEndDateOverlapping &&
                errors.push('End Date overlaps with other contracts');

            !this.$v.contract.startDate.isStartDateOverlapping &&
                errors.push('Start Date overlaps with other contracts');

            return errors;
        },
        startDateErrors() {
            const errors = [];

            if (!this.$v.contract.startDate.$dirty) return errors;

            !this.$v.contract.startDate.required &&
                errors.push('Start Date is required');

            !this.$v.contract.startDate.isStartDateOverlapping &&
                errors.push('Start Date overlaps with other contracts');

            return errors;
        },
        endDateErrors() {
            const errors = [];

            if (!this.$v.contract.endDate.$dirty) return errors;

            !this.$v.contract.endDate.required &&
                errors.push('End Date is required');

            !this.$v.contract.endDate.isEndDateOverlapping &&
                errors.push('End Date overlaps with other contracts');

            return errors;
        }
    },
    methods: {
        allowedDatesStart(startDate) {
            if (this.isStartDateAllowed(startDate)) {
                return startDate;
            }
        },
        allowedDatesEnd(endDate) {
            if (this.isEndDateAllowed(endDate)) {
                return endDate;
            }
        },

        isStartDateAllowed(startDate) {
            const userContracts = this.userContracts.filter(
                contract => contract.id != this.contract.id
            );

            for (let contract of userContracts) {
                if (
                    startDate >= contract.startDate &&
                    startDate <= contract.endDate
                ) {
                    return false;
                }

                if (
                    this.contract.endDate &&
                    startDate < contract.startDate &&
                    this.contract.endDate >= contract.endDate
                ) {
                    return false;
                }
            }

            return true;
        },
        isEndDateAllowed(endDate) {
            const userContracts = this.userContracts.filter(
                contract => contract.id !== this.contract.id
            );

            for (let contract of userContracts) {
                if (
                    endDate >= contract.startDate &&
                    endDate <= contract.endDate
                ) {
                    return false;
                }

                if (
                    this.contract.startDate &&
                    this.contract.startDate < contract.startDate &&
                    endDate >= contract.endDate
                ) {
                    return false;
                }
            }

            return true;
        }
    }
};
