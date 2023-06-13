import { Ability } from '@casl/ability';
import { Action } from '@/project/types/enums/Action';

export type AppAbility = Ability<[Action, Subjects]>;
