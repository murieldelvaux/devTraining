import { PartialType } from "@nestjs/mapped-types";
import { CreateCourseDTO } from "src/courses/dto/create-course.dto";

export class UpdateCourseDTO extends PartialType(CreateCourseDTO) { }