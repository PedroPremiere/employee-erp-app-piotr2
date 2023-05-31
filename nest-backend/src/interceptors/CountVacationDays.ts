import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from '@nestjs/common';

import { CountVacationDaysService } from '@/services/VacationDays/CountVacationDaysService';

@Injectable()
export class CountVacationDays implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler) {
        const request = context.switchToHttp().getRequest();

        const { body } = request;
        const { vacationDaysPerYear, startDate, endDate } = body;

        const vacationDays = CountVacationDaysService.countVacationDays({
            vacationDaysPerYear,
            startDate,
            endDate
        });

        request.body.vacationDays = vacationDays;

        return next.handle();
    }
}
