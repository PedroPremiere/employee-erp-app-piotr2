import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException
} from '@nestjs/common';

@Injectable()
export class PaginationFieldsPipe implements PipeTransform<string, number> {
    private model;

    constructor(model) {
        this.model = model;
    }

    transform(value, metadata: ArgumentMetadata) {
        if (!value.orderBy) {
            return value;
        }

        this.#checkSortable(value);

        return value;
    }

    #checkSortable(value) {
        if (![...this.model.sortable].includes(value.orderBy)) {
            throw new BadRequestException({
                errors: [{ messages: ['notSortableField'], field: 'orderBy' }]
            });
        }
    }
}
