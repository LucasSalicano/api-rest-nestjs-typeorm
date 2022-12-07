import { CreateCourseDto } from './../../../src/courses/dto/create-course.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, Post, HttpStatus, Body } from '@nestjs/common';
import * as request from 'supertest';
import { CoursesModule } from '../../../src/courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const course: CreateCourseDto = {
    name: "Unit Tests with Nodejs",
    description: "applying unit test to real projects",
    price: 100,
    tags: [
      "Unit Tests",
      "Nodejs"
    ]
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoursesModule, TypeOrmModule.forRootAsync({
        imports: [ConfigModule.forRoot({
          envFilePath: ['.env']
        })],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          type: 'postgres',
          host: config.get("POSTGRES_HOST_TEST"),
          port: config.get("POSTGRES_PORT_TEST"),
          username: config.get("POSTGRES_USER_TEST"),
          password: config.get("POSTGRES_PASSWORD_TEST"),
          database: config.get("POSTGRES_DB_TEST"),
          autoLoadEntities: true,
          synchronize: true
        })
      })],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }));

    await app.init();
  });

  afterAll(async () => {
    await app.close()
  })

  it('Create POST /course', () => {
    return request(app.getHttpServer())
      .post('/courses')
      .send(course)
      .expect(HttpStatus.CREATED)
      .then((response) => {
        expect(response.body.name).toBe(course.name)
        expect(response.body.description).toBe(course.description)
        expect(response.body.price).toBe(course.price)
        expect(response.body.tags[0].name).toBe(course.tags[0])
        expect(response.body.tags[1].name).toBe(course.tags[1])
      })
  });

});