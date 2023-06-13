import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
    Body,
    Controller,
    Post,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';

import { RoutesEnum } from '@/project/types/enums/Routes.enum';
import { ContractDtoOld } from '@/apps/Contracts/dto/ContractDtoOld';
import { CheckPolicies } from '@/project/abilities/IPolicyHandler';
import { PoliciesGuard } from '@/project/abilities/Policies.guard';
import { CreateContractDto } from '@/apps/Contracts/dto/CreateContractDto';
import { CountVacationDays } from '@/project/interceptors/CountVacationDays';
import { CreateContractService } from '@/apps/Contracts/services/CreateContractService';
import { CanCreateContract } from '@/apps/Contracts/guards/CanCreateContract';

@ApiTags(RoutesEnum.CONTRACTS)
@Controller()
export class StoreContractController {
    constructor(private createContractService: CreateContractService) {}

    @Post(RoutesEnum.CONTRACTS)
    @ApiOkResponse({ type: ContractDtoOld })
    @UseInterceptors(CountVacationDays)
    @UseGuards(PoliciesGuard)
    @CheckPolicies(new CanCreateContract())
    //todo add returned type
    async invoke(@Body() data: CreateContractDto) {
        return this.createContractService.create(data);
    }
}
