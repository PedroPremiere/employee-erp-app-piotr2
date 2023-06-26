import { Module } from '@nestjs/common';

import { IndexContractService } from '@/apps/Contracts/services/IndexContractService';
import { CreateContractService } from '@/apps/Contracts/services/CreateContractService';

import { ExistingUserDecorator } from '@/apps/User/validators/existing-user-decorator.service';

import { IsOverLappingService } from '@/apps/Contracts/services/IsOverLappingService';
import { IsNotOverlappingDecorator } from '@/project/validators/contract/is-not-overlapping-decorator.service';
import { ShowContractsService } from '@/apps/Contracts/services/ShowContractService';
import { CaslAbilityFactory } from '@/project/abilities/CaslAbilityFactory';

import { ShowUsersService } from '@/apps/User/services/ShowUserService';
import { ShowContractResolver } from '@/apps/Contracts/resolvers/show/ShowContractResolver';
import { DeleteContractResolver } from '@/apps/Contracts/resolvers/delete/DeleteContractResolver';
import { DeleteContractService } from '@/apps/Contracts/services/DeleteContractService';
import { StoreContractResolver } from '@/apps/Contracts/resolvers/store/StoreContractResolver';
import { ListContractsResolver } from '@/apps/Contracts/resolvers/list/ListResolver';

@Module({
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
        StoreContractResolver,
        ListContractsResolver
    ]
})
export class ContractsModule {}
