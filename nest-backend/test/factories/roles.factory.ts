import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { User } from '@/entities/User';
import dataSource from '@/ormconfig.config';
import { Role } from '@/entities/Role';

@Injectable()
export class RolesFactory {
    static generate(users?: string[] | User[]) {
        const role = {
            name: faker.name.jobTitle(),
            users
        };

        return role;
    }

    static async create(users?: User[]) {
        const rolesRepository = dataSource.getRepository(Role);
        const role = RolesFactory.generate(users);

        const roleToSave = new Role();

        roleToSave.name = role.name;
        roleToSave.users = users;

        const savedRole = await rolesRepository.save(roleToSave);

        return savedRole;
    }
}
