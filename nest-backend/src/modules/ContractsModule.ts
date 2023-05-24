import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContractsRepository } from '@/repositories/ContractsRepository';

@Module({
    imports: [TypeOrmModule.forFeature([ContractsRepository])]
})
export class ContractsModule {}
