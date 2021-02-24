import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { SearchTasksDTO } from './dto/search-tasks.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task.status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getTasks(filter: SearchTasksDTO): Promise<Task[]> {
    return this.taskRepository.getTasks(filter);
  }

  async getTaskbyId(task: number): Promise<Task> {
    const found = await this.taskRepository.findOne(task);
    if (!found) {
      throw new NotFoundException(`Item with ${task} not found`);
    }
    return found;
  }

  async createTask(taskDto: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(taskDto);
  }

  async deleteItem(id: number) {
    const task = this.getTaskbyId(id);
    if (!task) {
      throw new NotFoundException(`Item with ${id} not found`);
    } else {
      const res = await this.taskRepository.delete(id);
      return res;
    }
  }

  async updateStatus(id: number, status: TaskStatus) {
    const item = await this.getTaskbyId(id);
    item.status = status;
    console.log(`new status is ${item.status}`);
    await item.save();
    return item;
  }
}
