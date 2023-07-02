import { Redis } from 'ioredis';
import { conf } from '@/project/config';

export const redis = new Redis({
    port: conf.redis.port,
    host: conf.redis.host,
    password: conf.redis.password
});
