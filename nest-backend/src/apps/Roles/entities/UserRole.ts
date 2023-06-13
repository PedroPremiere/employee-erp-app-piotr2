import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { User } from '@/apps/User/entities/User';
import { Role } from '@/apps/Roles/entities/Role';

//todo add api Properties

@Entity('User_roles')
export class UserRole {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToOne(() => Role)
    @JoinColumn()
    role: Role;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}

/*
todo something like this:

// category.ts
...
@OneToMany(() => PostToCategory, postToCategory => postToCategory.category)
public postToCategories: PostToCategory[];

// post.ts
...
@OneToMany(() => PostToCategory, postToCategory => postToCategory.post)
public postToCategories: PostToCategory[];



 */
