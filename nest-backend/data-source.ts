import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { conf } from '@/config';
import { User } from '@/entities/User';

const options: DataSourceOptions & SeederOptions = {
    url: conf.db.url,
    host: conf.db.host,
    database: conf.db.name,
    username: conf.db.username,
    password: conf.db.password,
    type: conf.db.dialect,
    port: conf.db.port,
    charset: conf.db.define.charset,

    seeds: ['src/db/seeds/**/*{.ts,.js}'],
    factories: ['src/db/factories/**/*{.ts,.js}'],
    entities: [User]
};

export const dataSource = new DataSource(options);
