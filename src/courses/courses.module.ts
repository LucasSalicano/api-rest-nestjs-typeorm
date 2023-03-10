import { CoursesProviders } from './courses.provider';
import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [CoursesController],
    providers: [CoursesService, ...CoursesProviders]
})
export class CoursesModule { }
