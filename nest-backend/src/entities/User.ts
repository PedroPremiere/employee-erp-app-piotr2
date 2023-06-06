import {
    Entity,
    Column,
    BeforeInsert,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn
} from 'typeorm';

import * as argon2 from 'argon2';
import { Role } from '@/types/enums/Role.enum';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @BeforeInsert()
    async beforeInsert() {
        this.password = await argon2.hash(this.password);
    }

    //todo read role from db
    roles: Role.User;
}
