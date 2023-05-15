import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import config from './src/config';
import { User } from '@/entities/User';

const currentConfig = config();

const options: DataSourceOptions & SeederOptions = {
    url: currentConfig.db.url,
    host: currentConfig.db.host,
    database: currentConfig.db.name,
    username: currentConfig.db.username,
    password: currentConfig.db.password,
    type: currentConfig.db.dialect,
    port: currentConfig.db.port,
    charset: currentConfig.db.define.charset,

    seeds: ['src/db/seeds/**/*{.ts,.js}'],
    factories: ['src/db/factories/**/*{.ts,.js}'],
    entities: [User]
};

export const dataSource = new DataSource(options);
