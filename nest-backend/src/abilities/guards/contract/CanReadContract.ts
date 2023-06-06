import { Action } from '@/types/enums/Action';
import { Contract } from '@/entities/Contract';
import { AppAbility } from '@/types/AppAbility';
import { IPolicyHandler } from '@/abilities/IPolicyHandler';

/* todo
    prepare some more policies


 */

export class CanReadContract implements IPolicyHandler {
    handle(ability: AppAbility) {
        return ability.can(Action.Read, Contract);
    }
}
