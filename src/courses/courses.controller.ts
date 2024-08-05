import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CoursesService } from 'src/courses/courses.service';

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
    create(@Body() body) {
        return this.courseService.create(body)
    }

    @Put(":id")
    update(@Param("id") id: number, @Body() body) {
        return this.courseService.update(+id, body)
    }

    @HttpCode(204)
    @Delete(":id")
    remove(@Param("id") id: number) {
        return this.courseService.remove(+id)
    }
}
