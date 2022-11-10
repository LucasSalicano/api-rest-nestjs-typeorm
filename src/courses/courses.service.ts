import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entites/course.entity';

@Injectable()
export class CoursesService {

    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) { }

    public findAll() {
        return this.courseRepository.find()
    }

    public async findOne(courseId: string) {
        const course = await this.courseRepository.findOne({
            where: {
                id: +courseId
            }
        })

        return course ?? new NotFoundException("Course not found").getResponse()
    }

    public create(createCourseDto: CreateCourseDto) {
        const course = this.courseRepository.create(createCourseDto)
        return this.courseRepository.save(course)
    }

    public async update(courseId: string, updateCourseDto: UpdateCourseDto) {
        const course = await this.courseRepository.preload({
            id: +courseId,
            ...updateCourseDto
        })

        if (!course) {
            throw new NotFoundException("Course not found")
        }

        return this.courseRepository.save(course)
    }

    public async delete(courseId: string) {
        const course = await this.courseRepository.findOne({
            where: {
                id: +courseId
            }
        })

        if (!course) {
            throw new NotFoundException("Course not found")
        }

        return this.courseRepository.remove(course)
    }

}
