import { createSchema } from 'schemix';

import { conf } from '../src/config';

createSchema({
    // basePath should be a path to the folder containing models/, enums/, and mixins/.
    basePath: __dirname,
    datasource: {
        provider: conf.db.dialect,
        url: conf.db.url,
        shadowDatabaseUrl: { env: 'SHADOW_DATABASE_URL' }
    },
    generator: {
        provider: 'prisma-client-js',
        previewFeatures: ['clientExtensions']
    }
}).export(__dirname, 'schema');
