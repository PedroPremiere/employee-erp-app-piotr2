import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/apps/PrismaService.service';

@Injectable()
export class IsOverLappingService {
    constructor(private readonly prismaService: PrismaService) {}

    find(contractData: { ownerId: string; startDate: Date; endDate: Date }) {
        return this.prismaService.contract.findMany({
            where: {
                OR: [
                    {
                        ownerId: contractData.ownerId,
                        endDate: { lte: contractData.endDate },
                        startDate: { gte: contractData.startDate }
                    },
                    {
                        ownerId: contractData.ownerId,
                        endDate: { gte: contractData.startDate },
                        startDate: { lte: contractData.startDate }
                    },
                    {
                        ownerId: contractData.ownerId,
                        endDate: { gte: contractData.endDate },
                        startDate: { lte: contractData.endDate }
                    }
                ]
            }
        });
    }
}
