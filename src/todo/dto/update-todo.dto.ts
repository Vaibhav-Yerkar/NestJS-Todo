import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsOptional } from 'class-validator';
import { TodoStatus } from '@prisma/client';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsOptional()
  status?: TodoStatus
}
