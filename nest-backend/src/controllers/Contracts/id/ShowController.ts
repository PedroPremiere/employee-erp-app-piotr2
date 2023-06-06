import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { RoutesEnum } from '@/types/enums/Routes.enum';
import { Contract } from '@/entities/Contract';
import { ContractDto } from '@/dto/Contract/ContractDto';
import { ShowContractsService } from '@/services/Contracts/ShowContractService';
import { PoliciesGuard } from '@/abilities/Policies.guard';
import { CheckPolicies } from '@/abilities/IPolicyHandler';
import { CanReadContract } from '@/abilities/guards/contract/CanReadContract';

@ApiTags(RoutesEnum.CONTRACTS)
@Controller()
export class ShowController {
    constructor(private showContractsService: ShowContractsService) {}

    @Get(`${RoutesEnum.CONTRACTS}/:id`)
    @ApiOkResponse({ type: ContractDto })
    @ApiParam({ name: 'id', description: 'Id of item' })
    /*
    todo add guards like this
    @UseGuards(PoliciesGuard)
    @CheckPolicies(new CanReadContract())
    
     */
    invoke(@Param() params: any): Promise<Contract> {
        return this.showContractsService.findOne(params.id);
    }
}
