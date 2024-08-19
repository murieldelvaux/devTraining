import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findAll() {
    return this.courseRepository.find();
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({ where: { id } });

    if (!course)
      throw new HttpException(
        `course id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );

    return course;
  }

  async create(createdCourseDTO: any) {
    const course = this.courseRepository.create(createdCourseDTO);
    return this.courseRepository.save(course);
  }

  async update(id: number, updateCourseDTO: any) {
    const course = await this.courseRepository.preload({
      ...updateCourseDTO,
      id,
    });

    if (!course) {
      throw new NotFoundException(`Course #${id} not found`);
    }

    return this.courseRepository.save(course);
  }

  async remove(id: number) {
    const course = await this.courseRepository.findOne({ where: { id } });

    if (!course) {
      throw new NotFoundException(`Course #${id} not found`);
    }

    return this.courseRepository.remove(course);
  }
}
