import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { Routes } from '@/types/enums/Routes';
import { Contract } from '@/entities/Contract';
import { ContractDto } from '@/dto/Contract/ContractDto';
import { ShowContractsService } from '@/services/Contracts/ShowContractService';

@ApiTags(Routes.CONTRACTS)
@Controller()
export class ShowController {
    constructor(private showContractsService: ShowContractsService) {}

    @Get(`${Routes.CONTRACTS}/:id`)
    @ApiOkResponse({ type: ContractDto })
    @ApiParam({ name: 'id', description: 'Id of item' })
    invoke(@Param() params: any): Promise<Contract> {
        return this.showContractsService.findOne(params.id);
    }
}
