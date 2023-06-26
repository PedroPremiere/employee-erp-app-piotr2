import * as dayjs from 'dayjs';

export class CountVacationDaysService {
    static countVacationDays(parameters: {
        vacationDaysPerYear: number;
        startDate: Date;
        endDate: Date;
    }): number {
        const { vacationDaysPerYear, startDate, endDate } = parameters;

        if (!vacationDaysPerYear || !startDate || !endDate) {
            return 0;
        }

        const contractLen = dayjs(endDate).diff(dayjs(startDate), 'month');
        const vacationDays = (contractLen * vacationDaysPerYear) / 12;

        return Math.round(vacationDays);
    }
}
