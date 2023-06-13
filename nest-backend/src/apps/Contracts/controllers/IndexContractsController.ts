import { Controller, Get, UseGuards } from '@nestjs/common';

import { Contract } from '@/apps/Contracts/entities/Contract';
import { RoutesEnum } from '@/project/types/enums/Routes.enum';
import { ContractDtoOld } from '@/apps/Contracts/dto/ContractDtoOld';
import { PoliciesGuard } from '@/project/abilities/Policies.guard';
import { CheckPolicies } from '@/project/abilities/IPolicyHandler';
import { PaginationQueryDto } from '@/project/dto/Page/PaginationQueryDto';
import { ApiExtraModels, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { IndexContractService } from '@/apps/Contracts/services/IndexContractService';
import { CanReadContract } from '@/apps/Contracts/guards/CanReadContract';
import { ApiPaginatedResponseDecoratos } from '@/project/decorators/ApiPaginatedResponse.decoratos';

/* todo implement guards
example:
@CheckPolicies(new ReadContractPolicyHandler())
 */

@ApiTags(RoutesEnum.CONTRACTS)
@Controller()
export class IndexContractsController {
    constructor(private indexContractService: IndexContractService) {}

    @Get(RoutesEnum.CONTRACTS)
    @ApiPaginatedResponseDecoratos(ContractDtoOld)
    @ApiExtraModels(ContractDtoOld, PaginationQueryDto)
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
