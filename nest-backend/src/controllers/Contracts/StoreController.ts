import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';

import { Routes } from '@/types/enums/Routes';
import { Contract } from '@/entities/Contract';
import { CreateContractDto } from '@/dto/Contract/CreateContractDto';
import { CreateContractService } from '@/services/Contracts/CreateContractService';
import { CountVacationDays } from '@/interceptors/CountVacationDays';
import { ContractDto } from '@/dto/Contract/ContractDto';

@ApiTags(Routes.CONTRACTS)
@Controller()
export class StoreContractController {
    constructor(private createContractService: CreateContractService) {}

    @Post(Routes.CONTRACTS)
    @ApiOkResponse({ type: ContractDto })
    @UseInterceptors(CountVacationDays)
    async invoke(@Body() data: CreateContractDto): Promise<Contract> {
        return this.createContractService.create(data);
    }
}
