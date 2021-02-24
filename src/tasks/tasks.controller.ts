import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  NotFoundException,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { pipe } from 'rxjs';
import { CreateTaskDTO } from './dto/create-task.dto';
import { SearchTasksDTO } from './dto/search-tasks.dto';
import { Task, TaskStatus } from './model/task.model';
import { StatusUpdateValidationPipe } from './pipes/task.status.validation.pipe';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllItem(@Query() filter: SearchTasksDTO): Task[] {
    if (Object.keys(filter).length) {
      return this.taskService.getTasksWithFilter(filter);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Get('/:id')
  getTask(@Param('id') id: string): Task {
    return this.taskService.getTaskbyId(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDTO) {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteItem(id);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status', StatusUpdateValidationPipe) status: TaskStatus,
  ) {
    return this.taskService.updateStatus(id, status);
  }
}
