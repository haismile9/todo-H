import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
  ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      type: 'postgres',
      url: config.getOrThrow<string>('DATABASE_URL'),   // dùng đúng tên biến trong .env của bạn
      autoLoadEntities: true,
      synchronize: true, // Chỉ nên bật trong môi trường phát triển
    }),
  }),
  TasksModule,
],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
