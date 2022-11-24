import { Tag } from './entities/tag.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {

    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,

        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) { }

    public findAll() {
        return this.courseRepository.find({
            relations: ['tags']
        })
    }

    public async findOne(courseId: string) {
        const course = await this.courseRepository.findOne({
            where: {
                id: courseId
            },
            relations: ['tags']
        })

        return course ?? new NotFoundException("Course not found").getResponse()
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
