import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UserEmail } from 'src/common/decorator/user-email.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"To create a new user task", summary:"To create a new user task"})
  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @UserEmail()
  userEmail: string) {
    return this.todoService.create(createTodoDto, userEmail);
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"To fetch all  user task", summary:"To fetch all user task"})
  @Get()
  findAll(@UserEmail()
    userEmail: string
  ) {
    console.log(userEmail)
    return this.todoService.findAll(userEmail);
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"To fetch a specific user task", summary:"To fetch a specific user task"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"To update a specific user task", summary:"To update a specific user task"})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"To delete a specific user task", summary:"To delete a specific user task"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
