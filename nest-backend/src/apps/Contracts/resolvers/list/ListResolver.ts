import { Injectable, UseFilters } from '@nestjs/common';
import { Args, Query, Resolver, ResolveReference, Root } from '@nestjs/graphql';

import { UserDto } from '@/apps/User/dto/UserDto';
import { ContractDto } from '@/apps/Contracts/dto/ContractDto';
import { PaginationQueryDto } from '@/project/dto/Page/PaginationQueryDto';
import { PaginationFieldsPipe } from '@/project/interceptors/AddSpecialFields';
import { BadRequestExceptionCustom } from '@/project/exceptions/BadRequest.exception';
import { IndexContractService } from '@/apps/Contracts/services/IndexContractService';
import { ShowContractsService } from '@/apps/Contracts/services/ShowContractService';

@Injectable()
@UseFilters(BadRequestExceptionCustom)
@Resolver(() => [ContractDto])
export class ListContractsResolver {
    constructor(
        private readonly showContractsService: ShowContractsService,
        private indexContractService: IndexContractService
    ) {}

    @ResolveReference()
    async users(@Root() contract: ContractDto): Promise<UserDto> {
        return this.showContractsService.findUser(contract.id);
    }

    @Query(returns => [ContractDto])
    async listContracts(
        @Args('', new PaginationFieldsPipe(ContractDto))
        paginationQuery: PaginationQueryDto
    ): Promise<ContractDto[]> {
        return this.indexContractService.findMany(paginationQuery);
    }
}
