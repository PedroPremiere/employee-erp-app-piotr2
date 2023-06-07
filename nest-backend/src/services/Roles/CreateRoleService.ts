import { Injectable } from '@nestjs/common';

import { Role } from '@/entities/Role';
import { In } from 'typeorm';
import { CreateRoleDto } from '@/dto/Role/CreateRoleDto';
import { RolesRepository } from '@/repositories/RolesRepository';
import { UsersRepository } from '@/repositories/UsersRepository';

@Injectable()
export class CreateRoleService {
    constructor(
        private readonly rolesRepository: RolesRepository,
        private readonly usersRepository: UsersRepository
    ) {}

    async create(roleData: CreateRoleDto): Promise<Role> {
        let users;
        if (roleData.users) {
            users = await this.usersRepository.find({
                where: { id: In(roleData.users) }
            });
        }

        const role = await this.rolesRepository.save({ ...roleData, users });

        const roleAfterSave = await this.rolesRepository.findOne({
            where: { id: role.id },
            select: {
                users: {
                    id: true
                }
            },
            relations: ['users']
        });

        return roleAfterSave;
    }
}
