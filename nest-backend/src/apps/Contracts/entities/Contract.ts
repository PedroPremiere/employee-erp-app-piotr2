import {
    Entity,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    PrimaryGeneratedColumn
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

//todo remove

@Entity('Contracts')
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

    ownerId: string;

    @Column()
    vacationDaysPerYear: number;

    @Column()
    vacationDays: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
