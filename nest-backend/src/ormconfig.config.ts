import { DataSource } from 'typeorm';

import config from '@/config';

const currentConfig = config();

export default new DataSource({
    url: currentConfig.db.url,
    host: currentConfig.db.host,
    database: currentConfig.db.name,
    username: currentConfig.db.username,
    password: currentConfig.db.password,
    type: currentConfig.db.dialect,
    port: currentConfig.db.port,
    charset: currentConfig.db.define.charset,
    entities: ['./src/entities/*.ts'],
    migrations: ['./src/db/migrations/*.ts']
});
