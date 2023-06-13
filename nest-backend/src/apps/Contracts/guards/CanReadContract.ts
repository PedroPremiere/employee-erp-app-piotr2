import { Action } from '@/project/types/enums/Action';
import { Contract } from '@/apps/Contracts/entities/Contract';
import { AppAbility } from '@/project/types/AppAbility';
import { IPolicyHandler } from '@/project/abilities/IPolicyHandler';

/* todo
    prepare some more policies


 */

export class CanReadContract implements IPolicyHandler {
    handle(ability: AppAbility) {
        return ability.can(Action.Read, Contract);
    }
}
