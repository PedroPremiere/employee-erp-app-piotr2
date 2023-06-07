import {
    Entity,
    Column,
    BeforeInsert,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
    JoinColumn
} from 'typeorm';

import * as argon2 from 'argon2';
import { Role } from '@/entities/Role';
import { UserRole } from '@/entities/UserRole';

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
    @ManyToMany(() => Role, role => role.users, { cascade: true })
    @JoinTable({
        name: 'user_roles',
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'roleId',
            referencedColumnName: 'id'
        }
    })
    roles?: Role[];
}
