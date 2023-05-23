import { DataSource } from 'typeorm';
import { conf } from '@/config';

export default new DataSource({
    url: conf.db.url,
    host: conf.db.host,
    database: conf.db.name,
    username: conf.db.username,
    password: conf.db.password,
    type: conf.db.dialect,
    port: conf.db.port,
    charset: conf.db.define.charset,
    entities: ['src/entities/*.{ts,js}'],
    migrations: ['./src/db/migrations/*.ts'],
    synchronize: false
});
