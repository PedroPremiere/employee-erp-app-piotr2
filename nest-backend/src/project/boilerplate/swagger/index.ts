import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { conf } from '@/project/config';

export function initSwagger(app) {
    const config = new DocumentBuilder()
        .setTitle(conf.info.name)
        .setDescription(conf.info.description)
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
}
