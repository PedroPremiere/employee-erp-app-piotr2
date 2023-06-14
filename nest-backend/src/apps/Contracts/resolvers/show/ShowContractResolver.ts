import { Args, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Injectable, UseFilters } from '@nestjs/common';

import { UserDto } from '@/apps/User/dto/UserDto';
import { ContractDto } from '@/apps/Contracts/dto/ContractDto';
import { ShowUsersService } from '@/apps/User/services/ShowUserService';
import { NotFoundExceptionCustom } from '@/project/exceptions/NotFound.exception';
import { ShowContractsService } from '@/apps/Contracts/services/ShowContractService';

@Injectable()
@UseFilters(NotFoundExceptionCustom)
@Resolver(() => ContractDto)
export class ShowContractResolver {
    constructor(
        private readonly showContractsService: ShowContractsService,
        private readonly showUsersService: ShowUsersService
    ) {}

    @ResolveField()
    user(@Root() contract: ContractDto): Promise<UserDto | null> {
        return this.showUsersService.findOne(contract.ownerId);
    }

    @Query(returns => ContractDto)
    contract(@Args('id') id: string): Promise<ContractDto> {
        return this.showContractsService.findOne(id);
    }
}
