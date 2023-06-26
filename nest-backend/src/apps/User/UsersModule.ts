import { Module } from '@nestjs/common';

import { ShowUsersService } from '@/apps/User/services/ShowUserService';
import { CreateUserService } from '@/apps/User/services/CreateUserService';
import { IndexUsersService } from '@/apps/User/services/IndexUsersService';
import { ListUsersResolver } from '@/apps/User/resolvers/list/ListResolver';
import { DeleteUsersService } from '@/apps/User/services/DeleteUsersService';
import { FindByEmailService } from '@/apps/User/services/FindByEmailService';
import { ShowUserResolver } from '@/apps/User/resolvers/show/ShowUserResolver';
import { StoreUserResolver } from '@/apps/User/resolvers/store/StoreUserResolver';
import { DeleteUserResolver } from '@/apps/User/resolvers/delete/DeleteUserResolver';

@Module({
    providers: [
        IndexUsersService,
        ShowUsersService,
        DeleteUserResolver,
        DeleteUsersService,
        CreateUserService,
        ShowUserResolver,
        StoreUserResolver,
        FindByEmailService,
        ListUsersResolver
    ],
    exports: [FindByEmailService]
})
export class UsersModule {}
