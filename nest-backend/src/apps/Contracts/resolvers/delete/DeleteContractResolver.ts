import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
//import { I18n, I18nContext } from 'nestjs-i18n';
import { Injectable, UseFilters } from '@nestjs/common';

import { ContractDto } from '@/apps/Contracts/dto/ContractDto';
import { DeleteMessage } from '@/project/dto/Messages/DeleteMessage';
import { NotFoundExceptionCustom } from '@/project/exceptions/NotFound.exception';
import { DeleteContractService } from '@/apps/Contracts/services/DeleteContractService';

@Injectable()
@UseFilters(NotFoundExceptionCustom)
@Resolver(() => ContractDto)
export class DeleteContractResolver {
    constructor(
        private readonly deleteContractService: DeleteContractService
    ) {}

    @Mutation(returns => DeleteMessage)
    async deleteContract(
        @Args('id') id: string,
        @Context('req') req
    ): Promise<DeleteMessage> {
        await this.deleteContractService.delete(id);

        const message = req.__('DELETED');

        return { message };
    }
}
