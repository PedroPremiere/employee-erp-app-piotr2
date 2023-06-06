import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
    Body,
    Controller,
    Post,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';

import { Contract } from '@/entities/Contract';
import { RoutesEnum } from '@/types/enums/Routes.enum';
import { ContractDto } from '@/dto/Contract/ContractDto';
import { CheckPolicies } from '@/abilities/IPolicyHandler';
import { PoliciesGuard } from '@/abilities/Policies.guard';
import { CreateContractDto } from '@/dto/Contract/CreateContractDto';
import { CountVacationDays } from '@/interceptors/CountVacationDays';
import { CreateContractService } from '@/services/Contracts/CreateContractService';
import { CanCreateContract } from '@/abilities/guards/contract/CanCreateContract';

@ApiTags(RoutesEnum.CONTRACTS)
@Controller()
export class StoreContractController {
    constructor(private createContractService: CreateContractService) {}

    @Post(RoutesEnum.CONTRACTS)
    @ApiOkResponse({ type: ContractDto })
    @UseInterceptors(CountVacationDays)
    @UseGuards(PoliciesGuard)
    @CheckPolicies(new CanCreateContract())
    async invoke(@Body() data: CreateContractDto): Promise<Contract> {
        return this.createContractService.create(data);
    }
}
