import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from '@nestjs/common';

import { RequestParser } from '@/project/helpers/RequestParser';
import { CountVacationDaysService } from '@/apps/Contracts/services/CountVacationDaysService';

@Injectable()
export class CountVacationDays implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler) {
        const body = RequestParser.getBody(context);

        const { vacationDaysPerYear, startDate, endDate } = body;

        const vacationDays = CountVacationDaysService.countVacationDays({
            vacationDaysPerYear,
            startDate,
            endDate
        });

        body['vacationDays'] = vacationDays;

        return next.handle();
    }
}
