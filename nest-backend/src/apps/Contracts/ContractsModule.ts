import { Module } from '@nestjs/common';

import { IndexContractService } from '@/apps/Contracts/services/IndexContractService';
import { StoreContractController } from '@/apps/Contracts/controllers/StoreController';
import { CreateContractService } from '@/apps/Contracts/services/CreateContractService';
import { IndexContractsController } from '@/apps/Contracts/controllers/IndexContractsController';

import { ExistingUserDecorator } from '@/apps/User/validators/existing-user-decorator.service';

import { IsOverLappingService } from '@/apps/Contracts/services/IsOverLappingService';
import { IsNotOverlappingDecorator } from '@/project/validators/contract/is-not-overlapping-decorator.service';
import { ShowContractsService } from '@/apps/Contracts/services/ShowContractService';
import { CaslAbilityFactory } from '@/project/abilities/CaslAbilityFactory';
import { PrismaService } from '@/apps/PrismaService.service';
import { PrismaServiceFactory } from '@/apps/Auth/PrismaServiceFactory.service';

import { ShowUsersService } from '@/apps/User/services/ShowUserService';
import { ShowContractResolver } from '@/apps/Contracts/resolvers/show/ShowContractResolver';
import { DeleteContractResolver } from '@/apps/Contracts/resolvers/delete/DeleteContractResolver';
import { DeleteContractService } from '@/apps/Contracts/services/DeleteContractService';

@Module({
    controllers: [IndexContractsController, StoreContractController],
    providers: [
        ShowUsersService,
        ExistingUserDecorator,
        IsNotOverlappingDecorator,
        IndexContractService,
        IsOverLappingService,
        ShowContractsService,
        CreateContractService,
        CaslAbilityFactory,
        ShowContractResolver,
        DeleteContractResolver,
        DeleteContractService,
        {
            provide: PrismaService,
            useValue: PrismaServiceFactory.create()
        }
    ]
})
export class ContractsModule {}
