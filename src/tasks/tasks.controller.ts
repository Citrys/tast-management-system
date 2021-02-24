import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { SearchTasksDTO } from './dto/search-tasks.dto';
import { StatusUpdateValidationPipe } from './pipes/task.status.validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllItem(@Query() filter: SearchTasksDTO) {
    return this.taskService.getTasks(filter);
  }

  @Get('/:id')
  getTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskbyId(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDTO): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.deleteItem(id);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', StatusUpdateValidationPipe) status: TaskStatus,
  ) {
    return this.taskService.updateStatus(id, status);
  }
}
