import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';

import { Routes } from '@/types/enums/Routes';
import { Contract } from '@/entities/Contract';
import { CreateContractDto } from '@/dto/Contract/CreateContractDto';
import { CreateContractService } from '@/services/Contracts/CreateContractService';

@ApiTags(Routes.CONTRACTS)
@Controller()
export class StoreContractController {
    constructor(private createContractService: CreateContractService) {}

    @Post(Routes.CONTRACTS)
    async invoke(@Body() data: CreateContractDto): Promise<Contract> {
        return this.createContractService.create(data);
    }
}
