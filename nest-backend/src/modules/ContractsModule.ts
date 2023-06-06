import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContractsRepository } from '@/repositories/ContractsRepository';
import { IndexContractService } from '@/services/Contracts/IndexContractService';
import { StoreContractController } from '@/controllers/Contracts/StoreController';
import { CreateContractService } from '@/services/Contracts/CreateContractService';
import { IndexContractsController } from '@/controllers/Contracts/IndexContractsController';

import { UsersRepository } from '@/repositories/UsersRepository';
import { ExistingUserDecoratos } from '@/decorators/validators/user/ExistingUser.decoratos';
import { ShowController } from '@/controllers/Contracts/id/ShowController';
import { IsOverLappingService } from '@/services/Contracts/IsOverLappingService';
import { IsNotOverlappingDecoratos } from '@/decorators/validators/contract/IsNotOverlapping.decoratos';
import { ShowContractsService } from '@/services/Contracts/ShowContractService';
import { CaslAbilityFactory } from '@/abilities/CaslAbilityFactory';

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
        ExistingUserDecoratos,
        UsersRepository,
        IsNotOverlappingDecoratos,
        ContractsRepository,
        IndexContractService,
        IsOverLappingService,
        ShowContractsService,
        CreateContractService,
        CaslAbilityFactory
    ]
})
export class ContractsModule {}
