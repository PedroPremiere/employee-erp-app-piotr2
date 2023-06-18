import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Injectable, UseFilters, UseInterceptors } from '@nestjs/common';

import { ContractDto } from '@/apps/Contracts/dto/ContractDto';
import { CreateContractDto } from '@/apps/Contracts/dto/CreateContractDto';
import { CountVacationDays } from '@/project/interceptors/CountVacationDays';
import { BadRequestExceptionCustom } from '@/project/exceptions/BadRequest.exception';
import { CreateContractService } from '@/apps/Contracts/services/CreateContractService';

@Injectable()
@UseFilters(BadRequestExceptionCustom)
@Resolver(() => ContractDto)
export class StoreContractResolver {
    constructor(
        private readonly createContractService: CreateContractService
    ) {}

    @UseInterceptors(CountVacationDays)
    @Mutation(returns => ContractDto)
    async storeContract(
        @Args()
        newContractData: CreateContractDto
    ): Promise<ContractDto> {
        return this.createContractService.create(newContractData);
    }
}
