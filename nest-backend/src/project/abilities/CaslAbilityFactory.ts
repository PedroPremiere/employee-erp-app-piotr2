import { Injectable } from '@nestjs/common';
import {
    Ability,
    AbilityBuilder,
    AbilityClass,
    ExtractSubjectType,
    InferSubjects
} from '@casl/ability';
import { User } from '@/apps/User/entities/User';

import { Contract } from '@/apps/Contracts/entities/Contract';
import { Action } from '@/project/types/enums/Action';

type Subjects = InferSubjects<typeof Contract | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder<
            Ability<[Action, Subjects]>
        >(Ability as AbilityClass<AppAbility>);

        /*
        todo implement this,
         */

        //can(Action.Read, 'all');
        can(Action.Create, 'all');
        can(Action.Update, 'all');
        can(Action.Delete, 'all');
        can(Action.Manage, 'all');
        //can(Action.Read, 'all');
        //can(Action.Manage, Contract);
        //cannot(Action.Create, Contract, { id: '' });
        //cannot(Action.Create, Contract, { id: '' });

        return build({
            detectSubjectType: item =>
                item.constructor as ExtractSubjectType<Subjects>
        });
    }
}
