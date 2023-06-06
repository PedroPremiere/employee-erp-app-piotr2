import { User } from '@/entities/User';
import { Action } from '@/types/enums/Action';
import { AppAbility } from '@/types/AppAbility';
import { IPolicyHandler } from '@/abilities/IPolicyHandler';

export class CanCreateUser implements IPolicyHandler {
    handle(ability: AppAbility) {
        return ability.can(Action.Create, User);
    }
}
