const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

class VacationDurationCalculator {
    countDurationInDays(startDate, endDate) {
        const startDateDayJs = dayjs(startDate);
        const endDateDayJs = dayjs(endDate);

        return dayjs.duration(endDateDayJs.diff(startDateDayJs)).as('days') + 1;
    }
}

module.exports = VacationDurationCalculator;
