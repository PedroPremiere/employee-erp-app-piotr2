import { Module } from '@nestjs/common';

import { IndexContractService } from '@/services/Contracts/IndexContractService';
import { StoreContractController } from '@/controllers/Contracts/StoreController';
import { CreateContractService } from '@/services/Contracts/CreateContractService';
import { IndexContractsController } from '@/controllers/Contracts/IndexContractsController';

import { ExistingUserDecorator } from '@/decorators/validators/user/existing-user-decorator.service';
import { ShowController } from '@/controllers/Contracts/id/ShowController';
import { IsOverLappingService } from '@/services/Contracts/IsOverLappingService';
import { IsNotOverlappingDecorator } from '@/decorators/validators/contract/is-not-overlapping-decorator.service';
import { ShowContractsService } from '@/services/Contracts/ShowContractService';
import { CaslAbilityFactory } from '@/abilities/CaslAbilityFactory';
import { PrismaService } from '@/services/PrismaService.service';
import { PrismaServiceFactory } from '@/services/PrismaServiceFactory.service';

@Module({
    controllers: [
        IndexContractsController,
        StoreContractController,
        ShowController
    ],
    providers: [
        ExistingUserDecorator,
        IsNotOverlappingDecorator,
        IndexContractService,
        IsOverLappingService,
        ShowContractsService,
        CreateContractService,
        CaslAbilityFactory,
        {
            provide: PrismaService,
            useValue: PrismaServiceFactory.create()
        }
    ]
})
export class ContractsModule {}
