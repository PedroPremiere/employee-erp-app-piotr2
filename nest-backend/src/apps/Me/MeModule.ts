import { Module } from '@nestjs/common';

import { ShowMeResolver } from '@/apps/Me/resolvers/ShowMeResolver';
import { ShowUsersService } from '@/apps/User/services/ShowUserService';
import { IndexUsersService } from '@/apps/User/services/IndexUsersService';

@Module({
    providers: [IndexUsersService, ShowMeResolver, ShowUsersService]
})
export class MeModule {}
