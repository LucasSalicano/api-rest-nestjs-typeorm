import { Tag } from './entities/tag.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class CoursesService {
    
    @Inject('COURSES_REPOSITORY')
    private courseRepository: Repository<Course>

    @Inject('TAGS_REPOSITORY')
    private tagRepository: Repository<Tag>

    public findAll() {
        return this.courseRepository.find({
            relations: ['tags']
        })
    }

    public async findOne(courseId: string) {

        if (!isUUID(courseId)) {
            throw new NotFoundException("Uuid provided is invalid.")
        }

        const course = await this.courseRepository.findOne({
            where: {
                id: courseId
            },
            relations: ['tags']
        })

        if (!course) {
            throw new NotFoundException("Course not found")
        }

        return course
    }

    public async create(createCourseDto: CreateCourseDto) {
        const tags = await Promise.all(
            createCourseDto.tags.map((name) => this.preloadTagByName(name))
        )

        const course = this.courseRepository.create({
            ...createCourseDto,
            tags
        })
        return this.courseRepository.save(course)
    }

    public async update(courseId: string, updateCourseDto: UpdateCourseDto) {

        if (!isUUID(courseId)) {
            throw new NotFoundException("Uuid provided is invalid.")
        }

        const tags = updateCourseDto.tags && (
            await Promise.all(
                updateCourseDto.tags.map((name) => this.preloadTagByName(name))
            )
        )

        const course = await this.courseRepository.preload({
            id: courseId,
            ...updateCourseDto,
            tags
        })

        if (!course) {
            throw new NotFoundException("Course not found")
        }

        return this.courseRepository.save(course)
    }

    public async delete(courseId: string) {

        if (!isUUID(courseId)) {
            throw new NotFoundException("Uuid provided is invalid.")
        }

        const course = await this.courseRepository.findOne({
            where: {
                id: courseId
            }
        })

        if (!course) {
            throw new NotFoundException("Course not found")
        }

        return this.courseRepository.remove(course)
    }

    private async preloadTagByName(tagName: string): Promise<Tag> {
        const tag = await this.tagRepository.findOne({
            where: {
                name: tagName
            }
        })

        return tag ?? this.tagRepository.create({ name: tagName })
    }

}
