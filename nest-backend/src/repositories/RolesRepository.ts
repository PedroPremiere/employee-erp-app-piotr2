import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Role } from '@/entities/Role';

@Injectable()
export class RolesRepository extends Repository<Role> {
    constructor(private dataSource: DataSource) {
        super(Role, dataSource.createEntityManager());
    }
}
