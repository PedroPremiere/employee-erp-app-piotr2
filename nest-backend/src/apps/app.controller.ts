import { Request } from 'express';
import { Controller, Get, Req } from '@nestjs/common';

import { RabbitMessageSender } from '@/rabbit/services/RabbitMessageSender.service';

@Controller()
export class AppController {
    constructor(private readonly sendMessage: RabbitMessageSender) {}

    @Get()
    getHello(@Req() req: Request): string {
        return req.__('hello');
    }
}
