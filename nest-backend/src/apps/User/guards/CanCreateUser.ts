import { User } from '@/apps/User/entities/User';
import { Action } from '@/project/types/enums/Action';
import { AppAbility } from '@/project/types/AppAbility';
import { IPolicyHandler } from '@/project/abilities/IPolicyHandler';

export class CanCreateUser implements IPolicyHandler {
    handle(ability: AppAbility) {
        return ability.can(Action.Create, User);
    }
}
