import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/apps/PrismaService.service';

@Injectable()
export class DeleteContractService {
    constructor(private readonly prismaService: PrismaService) {}

    async delete(id: string): Promise<{ message: string }> {
        const user = await this.prismaService.contract.findFirst({
            where: { id }
        });

        if (!user) {
            throw new NotFoundException();
        }

        await this.prismaService.contract.delete({ where: { id } });

        return { message: 'removed' };
    }
}
