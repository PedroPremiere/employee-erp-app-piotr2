import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContractsRepository } from '@/repositories/ContractsRepository';
import { IndexContractService } from '@/services/Contracts/IndexContractService';
import { StoreContractController } from '@/controllers/Contracts/StoreController';
import { CreateContractService } from '@/services/Contracts/CreateContractService';
import { IndexContractsController } from '@/controllers/Contracts/IndexContractsController';

import { UsersRepository } from '@/repositories/UsersRepository';
import { ExistingUser } from '@/decorators/validators/user/ExistingUser';
import { ShowController } from '@/controllers/Contracts/id/ShowController';
import { IsOverLappingService } from '@/services/Contracts/IsOverLappingService';
import { IsNotOverlapping } from '@/decorators/validators/contract/IsNotOverlapping';
import { ShowContractsService } from '@/services/Contracts/ShowContractService';

@Module({
    imports: [
        TypeOrmModule.forFeature([ContractsRepository]),
        TypeOrmModule.forFeature([UsersRepository])
    ],
    controllers: [
        IndexContractsController,
        StoreContractController,
        ShowController
    ],
    providers: [
        ExistingUser,
        UsersRepository,
        IsNotOverlapping,
        ContractsRepository,
        IndexContractService,
        IsOverLappingService,
        ShowContractsService,
        CreateContractService
    ]
})
export class ContractsModule {}
