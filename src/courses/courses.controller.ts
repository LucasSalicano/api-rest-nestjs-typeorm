import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {

    constructor(private readonly coursesService: CoursesService) { }

    @Get('/')
    public findAll() {
        return this.coursesService.findAll()
    }

    @Get(':id')
    public findOne(@Param('id') id) {
        return this.coursesService.findOne(id)
    }

    @Post()
    public create(@Body() createCourseDto: CreateCourseDto) {
        return this.coursesService.create(createCourseDto)
    }

    @Patch(':id')
    public update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        return this.coursesService.update(id, updateCourseDto)
    }

    @Delete(':id')
    public delete(@Param('id') id) {
        return this.coursesService.delete(id)
    }

}
