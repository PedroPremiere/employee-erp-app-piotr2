import { truncate } from './helpers/truncate';

afterAll(async () => {
    await truncate();
});
