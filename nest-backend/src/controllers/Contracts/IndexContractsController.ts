import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Routes } from '@/types/enums/Routes';
import { IndexContractService } from '@/services/Contracts/IndexUsersService';
import { Contract } from '@/entities/Contract';
import { IndexInterceptor } from '@/interceptors/IndexInterceptor';

@ApiTags(Routes.CONTRACTS)
@Controller()
export class IndexContractsController {
    constructor(private indexContractService: IndexContractService) {}

    @Get(Routes.CONTRACTS)
    @UseInterceptors(IndexInterceptor)
    invoke(): Promise<[Contract[], number]> {
        return this.indexContractService.findAll();
    }
}
