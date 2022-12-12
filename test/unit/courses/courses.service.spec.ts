import { UpdateCourseDto } from './../../../src/courses/dto/update-course.dto';
import { CreateCourseDto } from './../../../src/courses/dto/create-course.dto';
import { CoursesService } from '../../../src/courses/courses.service';
import { Test, TestingModule } from '@nestjs/testing'
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Course } from '../../../src/courses/entities/course.entity';
import { Tag } from '../../../src/courses/entities/tag.entity';
import { NotFoundException } from '@nestjs/common';

describe('CoursesService', () => {
    let service: CoursesService
    let id;
    let date;

    beforeEach(async () => {
        service = new CoursesService(),
            id = '32e99a3b-e3ea-4ad8-8f9c-0f6cf9080de9',
            date = new Date()
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    it('should create a course', async () => {

        const expectOutputTags = [
            {
                id,
                name: 'nestjs',
                created_at: date,
            },
        ];

        const expectOutputCourse = [
            {
                id,
                name: 'Test',
                description: 'Test description',
                price: 99.90,
                created_at: date,
                tags: expectOutputTags,
            },
        ];

        const mockCourseRepository = {
            create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
            save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
        }

        const mockTagRepository = {
            create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
            findOne: jest.fn(),
        }

        // @ts-expect-error
        service['courseRepository'] = mockCourseRepository
        // @ts-expect-error
        service['tagRepository'] = mockTagRepository

        const createCourseDto: CreateCourseDto = {
            name: 'Test',
            description: 'Test description',
            price: 99.90,
            tags: ['nestjs'],
        };

        const newCourse = await service.create(createCourseDto)
        expect(mockCourseRepository.save).toHaveBeenCalled()
        expect(expectOutputCourse).toStrictEqual(newCourse)
    })

    it('should list courses', async () => {

        const expectOutputCourse = [
            {
                id,
                name: 'Test',
                description: 'Test description',
                price: 99.90,
                created_at: date,
                tags: ['test'],
            },
        ];

        const mockCourseRepository = {
            findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
            find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
        }

        // @ts-expect-error
        service['courseRepository'] = mockCourseRepository

        const courses = await service.findAll()
        expect(mockCourseRepository.find).toHaveBeenCalled()
        expect(expectOutputCourse).toStrictEqual(courses)
    })

    it('should return a course object if exist', async () => {

        const expectOutputCourse = [
            {
                id,
                name: 'Test',
                description: 'Test description',
                price: 99.90,
                created_at: date,
                tags: ['test'],
            },
        ];

        const mockCourseRepository = {
            findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse))
        }

        // @ts-expect-error
        service['courseRepository'] = mockCourseRepository

        const course = await service.findOne(id)
        expect(course).toEqual(expectOutputCourse)
    })

    it('should return a NotFoundException for uuid invalid', async () => {
        const courseId = "1"

        const mockCourseRepository = {
            findAll: jest.fn().mockReturnValue(Promise.resolve(undefined)),
            find: jest.fn().mockReturnValue(Promise.resolve(undefined)),
        }

        // @ts-expect-error
        service['courseRepository'] = mockCourseRepository

        try {
            await service.findOne(courseId)
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException)
            expect(error.message).toEqual('Uuid provided is invalid.')
        }
    })

    it('should return a NotFoundException for course not available', async () => {
        const courseId = "542be7f7-fcd1-4948-aec1-5e740e85361c"

        const expectOutputCourse = [
            {
                id,
                name: 'Test',
                description: 'Test description',
                price: 99.90,
                created_at: date,
                tags: ['test'],
            },
        ];

        const mockCourseRepository = {
            findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse))
        }

        // @ts-expect-error
        service['courseRepository'] = mockCourseRepository

        try {
            await service.findOne(courseId)
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException)
            expect(error.message).toEqual('Course not found')
        }
    })

    it('should update a course', async () => {

        const expectOutputTags = [
            {
                id,
                name: 'nestjs',
                created_at: date,
            },
        ];

        const expectOutputCourse = [
            {
                id,
                name: 'Test',
                description: 'Test description',
                price: 99.90,
                created_at: date,
                tags: expectOutputTags,
            },
        ];

        const mockCourseRepository = {
            update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
            save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
            preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
        }

        const mockTagRepository = {
            create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
            findOne: jest.fn(),
        }

        // @ts-expect-error
        service['courseRepository'] = mockCourseRepository
        // @ts-expect-error
        service['tagRepository'] = mockTagRepository

        const updateCourseDto: UpdateCourseDto = {
            name: 'Update Test',
            description: 'Update Test',
            price: 100.90,
            tags: ['Update Test'],
        };

        const course = await service.update(id, updateCourseDto)
        expect(mockCourseRepository.save).toHaveBeenCalled()
        expect(expectOutputCourse).toStrictEqual(course)
    })

    it('should remove a course if exist', async () => {

        const expectOutputCourse = [
            {
                id,
                name: 'Test',
                description: 'Test description',
                price: 99.90,
                created_at: date,
                tags: ['test'],
            },
        ];

        const mockCourseRepository = {
            findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
            remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
        }

        // @ts-expect-error
        service['courseRepository'] = mockCourseRepository

        const course = await service.delete(id)
        expect(mockCourseRepository.remove).toHaveBeenCalled()
        expect(expectOutputCourse).toStrictEqual(course)
    })

})