import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContractsRepository } from '@/repositories/ContractsRepository';
import { IndexContractService } from '@/services/Contracts/IndexContractService';
import { IndexContractsController } from '@/controllers/Contracts/IndexContractsController';
import { StoreContractController } from '@/controllers/Contracts/StoreController';
import { CreateContractService } from '@/services/Contracts/CreateContractService';

import { UsersRepository } from '@/repositories/UsersRepository';
import { DoesUserExist } from '@/decorators/validators/user/DoesUserExist';
import { IsOverLappingService } from '@/services/Contracts/IsOverLappingService';
import { IsNotOverlapping } from '@/decorators/validators/contract/IsNotOverlapping';

@Module({
    imports: [
        TypeOrmModule.forFeature([ContractsRepository]),
        TypeOrmModule.forFeature([UsersRepository])
    ],
    controllers: [IndexContractsController, StoreContractController],
    providers: [
        IndexContractService,
        ContractsRepository,
        CreateContractService,
        DoesUserExist,
        UsersRepository,
        IsNotOverlapping,
        IsOverLappingService
    ]
})
export class ContractsModule {}
