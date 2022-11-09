import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entites/course.entity';

@Injectable()
export class CoursesService {

    private courses: Course[] = [
        {
            id: 1,
            name: "NestJS Course",
            descripton: "NestJs",
            tags: ["nodejs"],
            price: 20
        }
    ]

    public findAll() {
        return this.courses
    }

    public findOne(id: string) {
        const course = this.courses.find((course: Course) => course.id == Number(id))

        return course ?? new NotFoundException("Course not found").getResponse()
    }

    public create(createCourseDto: any) {
        this.courses.push(createCourseDto)
    }

    public update(id: string, updateCourseDto: any) {
        const course = this.courses.findIndex(
            (course: Course) => course.id == Number(id)
        )

        this.courses[course] = updateCourseDto
    }

    public delete(id: string) {
        const course = this.courses.findIndex(
            (course: Course) => course.id == Number(id)
        )

        if (course > 0) {
            this.courses.splice(course, 1)
        }
    }

}
