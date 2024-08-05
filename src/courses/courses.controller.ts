import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CoursesService } from 'src/courses/courses.service';
import { CreateCourseDTO } from 'src/courses/dto/create-course.dto';
import { UpdateCourseDTO } from 'src/courses/dto/update-course.dto';

@Controller('courses')
export class CoursesController {
    // instanciando a classe com injeção de dependências
    constructor(private readonly courseService: CoursesService) { }

    @Get()
    findAll() {
        return this.courseService.findAll();
    }

    @Get(":id")
    findOne(@Param() params) {
        return this.courseService.findOne(+params.id)
    }

    @Post()
    create(@Body() createCourseDTO: CreateCourseDTO) {
        this.courseService.create(createCourseDTO)
        return createCourseDTO
    }

    @Put(":id")
    update(@Param("id") id: number, @Body() updateCourseDTO: UpdateCourseDTO) {
        return this.courseService.update(+id, updateCourseDTO)
    }

    @HttpCode(204)
    @Delete(":id")
    remove(@Param("id") id: number) {
        return this.courseService.remove(+id)
    }
}
