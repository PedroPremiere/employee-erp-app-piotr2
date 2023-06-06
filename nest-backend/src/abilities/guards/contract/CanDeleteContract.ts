import { Action } from '@/types/enums/Action';
import { Contract } from '@/entities/Contract';
import { AppAbility } from '@/types/AppAbility';
import { IPolicyHandler } from '@/abilities/IPolicyHandler';

export class CanDeleteContract implements IPolicyHandler {
    handle(ability: AppAbility) {
        return ability.can(Action.Delete, Contract);
    }
}
