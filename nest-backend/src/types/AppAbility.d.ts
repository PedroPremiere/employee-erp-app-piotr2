import { Ability } from '@casl/ability';
import { Action } from '@/types/enums/Action';

export type AppAbility = Ability<[Action, Subjects]>;
