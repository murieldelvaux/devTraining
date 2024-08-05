import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from 'src/courses/courses.entity';

@Injectable()
export class CoursesService {
    private courses: Course[] = [
        {
            id: 1,
            name: "Nest js",
            description: "Curso sobre fundamentos do frame Nest",
            tags: ["node.js", "nest.js", "javascript", "typescript"]
        },
    ]

    findAll() {
        return this.courses
    }

    findOne(id: number) {
        const course = this.courses.find(course => course.id === id);

        if (!course)
            throw new HttpException(`course id ${id} not found`, HttpStatus.NOT_FOUND)

        return course
    }

    create(createdCourseDTO: any) {
        this.courses.push(createdCourseDTO);
    }

    update(id: number, updateCourseDTO: any) {
        const existingCourse = this.findOne(id);

        if (existingCourse) {
            const index = this.courses.findIndex(course => course.id === id)

            this.courses[index] = {
                id,
                ...updateCourseDTO
            }
        }
    }

    remove(id: number) {
        const index = this.courses.findIndex(course => course.id === id);

        if (index >= 0) {
            this.courses.splice(index, 1);
        }
    }
}
