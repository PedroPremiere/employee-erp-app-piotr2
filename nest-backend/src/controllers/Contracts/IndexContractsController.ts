import { Controller, Get } from '@nestjs/common';

import { Routes } from '@/types/enums/Routes';
import { Contract } from '@/entities/Contract';
import { ContractDto } from '@/dto/Contract/ContractDto';
import { PaginationQueryDto } from '@/dto/Page/PaginationQueryDto';
import { ApiExtraModels, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { ApiPaginatedResponse } from '@/decorators/ApiPaginatedResponse';
import { IndexContractService } from '@/services/Contracts/IndexContractService';

@ApiTags(Routes.CONTRACTS)
@Controller()
export class IndexContractsController {
    constructor(private indexContractService: IndexContractService) {}

    @Get(Routes.CONTRACTS)
    @ApiPaginatedResponse(ContractDto)
    @ApiExtraModels(ContractDto, PaginationQueryDto)
    @ApiQuery({ type: PaginationQueryDto })
    invoke(@Paginate() query: PaginateQuery): Promise<Paginated<Contract>> {
        return this.indexContractService.findAll(query);
    }
}
