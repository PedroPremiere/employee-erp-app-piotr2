const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

class ContractVacationDaysCalculator {
    countDurationInMonths(startDate, endDate) {
        const startDateDayJs = dayjs(startDate);
        const endDateDayJs = dayjs(endDate);

        return dayjs.duration(endDateDayJs.diff(startDateDayJs)).asMonths();
    }

    vacationDaysPerYear(vacationDays, startDate, endDate) {
        const durationInMonths = this.countDurationInMonths(startDate, endDate);
        const numberOfVacationDays = (vacationDays * durationInMonths) / 12;

        return Math.ceil(numberOfVacationDays);
    }
}

module.exports = ContractVacationDaysCalculator;
