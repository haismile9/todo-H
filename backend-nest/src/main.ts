import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/index.js';

async function bootstrap() {
const app = await NestFactory.create(AppModule);
// Thêm prefix api cho tất cả các route, ngoại trừ route /health
app.setGlobalPrefix('api', {exclude: ['/health']});
// giống app.use(cors())
app.enableCors();                     
app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
await app.listen(process.env.PORT as string);

}
void bootstrap();
