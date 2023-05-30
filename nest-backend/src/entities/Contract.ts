import {
    Entity,
    Column,
    OneToOne,
    JoinColumn,
    UpdateDateColumn,
    CreateDateColumn,
    PrimaryGeneratedColumn
} from 'typeorm';

import { User } from '@/entities/User';
import { ApiProperty } from '@nestjs/swagger';

@Entity('contracts')
export class Contract {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    position: string;

    @Column({ type: 'timestamp' })
    startDate: Date;

    @Column({ type: 'timestamp' })
    endDate: Date;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    vacationDaysPerYear: number;

    @Column()
    vacationDays: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
