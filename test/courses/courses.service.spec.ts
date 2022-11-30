import { NotFoundException } from '@nestjs/common';
import { Tag } from './../../src/courses/entities/tag.entity';
import { CoursesService } from './../../src/courses/courses.service';
import { Test, TestingModule } from '@nestjs/testing'
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Course } from '../../src/courses/entities/course.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>

const createMockRepository = <T = any>(): MockRepository<T> => ({
    findOne: jest.fn(),
})

describe('CoursesService', () => {
    let service: CoursesService
    let courseRepository: MockRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CoursesService,
                {
                    provide: getRepositoryToken(Course),
                    useValue: createMockRepository()
                },
                {
                    provide: getRepositoryToken(Tag),
                    useValue: createMockRepository()
                },
            ]
        }).compile()

        service = module.get<CoursesService>(CoursesService)
        courseRepository = module.get<MockRepository>(getRepositoryToken(Course))
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('findOne', () => {
        describe('find course by id', () => {

            it('should return a course object if exist', async () => {

                const courseId = "542be7f7-fcd1-4948-aec1-5e740e85361c"
                const expectCourse = {}

                courseRepository.findOne.mockReturnValue(expectCourse)

                const course = await service.findOne(courseId)
                expect(course).toEqual(expectCourse)
            })

            it('should return a NotFoundException for uuid invalid', async () => {
                const courseId = "1"
                courseRepository.findOne.mockReturnValue(undefined)

                try {
                    await service.findOne(courseId)
                } catch (error) {
                    expect(error).toBeInstanceOf(NotFoundException)
                    expect(error.message).toEqual('Uuid provided is invalid.')
                }
            })

            it('should return a NotFoundException for course not available', async () => {
                const courseId = "542be7f7-fcd1-4948-aec1-5e740e85361c"
                courseRepository.findOne.mockReturnValue(undefined)

                try {
                    await service.findOne(courseId)
                } catch (error) {
                    expect(error).toBeInstanceOf(NotFoundException)
                    expect(error.message).toEqual('Course not found')
                }
            })

        })
    })
})