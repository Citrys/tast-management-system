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
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { SearchTasksDTO } from './dto/search-tasks.dto';
import { Task, TaskStatus } from './model/task.model';
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
  createTask(@Body() createTaskDto: CreateTaskDTO) {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    try {
      return this.taskService.deleteItem(id);
    } catch (error) {
      throw new NotFoundException('Item not found');
    }
  }

  @Patch('/:id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: TaskStatus) {
    return this.taskService.updateStatus(id, status);
  }
}
