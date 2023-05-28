import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContractsRepository } from '@/repositories/ContractsRepository';
import { IndexContractService } from '@/services/Contracts/IndexContractService';
import { IndexContractsController } from '@/controllers/Contracts/IndexContractsController';

@Module({
    imports: [TypeOrmModule.forFeature([ContractsRepository])],
    controllers: [IndexContractsController],
    providers: [IndexContractService, ContractsRepository]
})
export class ContractsModule {}
