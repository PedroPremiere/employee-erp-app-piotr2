import { Controller, Get, UseGuards } from '@nestjs/common';

import { Contract } from '@/entities/Contract';
import { RoutesEnum } from '@/types/enums/Routes.enum';
import { ContractDto } from '@/dto/Contract/ContractDto';
import { PoliciesGuard } from '@/abilities/Policies.guard';
import { CheckPolicies } from '@/abilities/IPolicyHandler';
import { PaginationQueryDto } from '@/dto/Page/PaginationQueryDto';
import { ApiExtraModels, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { IndexContractService } from '@/services/Contracts/IndexContractService';
import { CanReadContract } from '@/abilities/guards/contract/CanReadContract';
import { ApiPaginatedResponseDecoratos } from '@/decorators/ApiPaginatedResponse.decoratos';

/* todo implement guards
example:
@CheckPolicies(new ReadContractPolicyHandler())
 */

@ApiTags(RoutesEnum.CONTRACTS)
@Controller()
export class IndexContractsController {
    constructor(private indexContractService: IndexContractService) {}

    @Get(RoutesEnum.CONTRACTS)
    @ApiPaginatedResponseDecoratos(ContractDto)
    @ApiExtraModels(ContractDto, PaginationQueryDto)
    @ApiQuery({ type: PaginationQueryDto })
    /*
    @UseGuards(PoliciesGuard)
    @CheckPolicies(new CanReadContract())
    
     */
    //invoke(@Paginate() query: PaginateQuery): Promise<Paginated<Contract>> {
    invoke(@Paginate() query: PaginateQuery) {
        return this.indexContractService.findAll(query);
    }
}
