import { truncate } from './helpers/truncate';
import { redis } from '@/project/redis/connect';

afterAll(async () => {
    await truncate();
    redis.quit();
});
