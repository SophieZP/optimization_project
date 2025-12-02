"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
        credentials: true,
    });
    app.setGlobalPrefix(process.env.API_PREFIX || 'api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Sistema de Optimización Ferroviaria')
        .setDescription('API para resolver problemas de transporte (Método de Vogel) y optimización de carga (Problema de la Mochila)')
        .setVersion('1.0')
        .addTag('transport', 'Problema de Transporte - Método de Vogel')
        .addTag('cargo', 'Problema de Carga - Mochila 0/1')
        .addTag('optimization', 'Optimización Integrada')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Servidor corriendo en http://localhost:${port}/${process.env.API_PREFIX || 'api'}`);
    console.log(`📚 Documentación Swagger en http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map