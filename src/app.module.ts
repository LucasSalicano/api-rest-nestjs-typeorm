import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module, Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [CoursesModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        envFilePath: ['.env']
      })],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get("POSTGRES_HOST"),
        port: config.get("POSTGRES_PORT"),
        username: config.get("POSTGRES_USER"),
        password: config.get("POSTGRES_PASSWORD"),
        database: config.get("POSTGRES_DB"),
        autoLoadEntities: true,
        synchronize: true
      })
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
