import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Injectable, UseFilters, UseInterceptors } from '@nestjs/common';

import { ContractDto } from '@/apps/Contracts/dto/ContractDto';
import { CountVacationDays } from '@/project/interceptors/CountVacationDays';
import { BadRequestExceptionCustom } from '@/project/exceptions/BadRequest.exception';
import { UpdateContractDto } from '@/apps/Contracts/dto/UpdateContractDto';
import { UpdateContractService } from '@/apps/Contracts/services/UpdateContractService';
import { NotFoundExceptionCustom } from '@/project/exceptions/NotFound.exception';

@Injectable()
@UseFilters(BadRequestExceptionCustom)
@UseFilters(NotFoundExceptionCustom)
@Resolver(() => ContractDto)
export class UpdateContractResolver {
    constructor(
        private readonly updateContractService: UpdateContractService
    ) {}

    @UseInterceptors(CountVacationDays)
    @Mutation(returns => ContractDto)
    async updateContract(
        @Args()
        newContractData: UpdateContractDto
    ): Promise<ContractDto> {
        return this.updateContractService.update(newContractData);
    }
}
