import { Request } from 'express';
import { Controller, Get, Req } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    getHello(@Req() req: Request): string {
        return req.__('hello');
    }
}
