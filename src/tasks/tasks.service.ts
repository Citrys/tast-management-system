import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
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
  async getTasks(filter: SearchTasksDTO, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filter, user);
  }

  async getTaskbyId(task: number, user: User): Promise<Task> {
    try {
      const found = await this.taskRepository.findOne({
        where: {
          id: task,
          userId: user.id,
        },
      });
      console.log(found);
      if (!found) {
        throw new NotFoundException(`Item with ${task} not found`);
      }
      return found;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException(`Item with ${task} not found`);
    }
  }

  async createTask(taskDto: CreateTaskDTO, user: User): Promise<Task> {
    return this.taskRepository.createTask(taskDto, user);
  }

  async deleteItem(id: number, user: User) {
    const task = this.getTaskbyId(id, user);
    if (!task) {
      throw new NotFoundException(`Item with ${id} not found`);
    } else {
      const res = await this.taskRepository.delete(id);
      return res;
    }
  }

  async updateStatus(id: number, status: TaskStatus, user: User) {
    const item = await this.getTaskbyId(id, user);
    item.status = status;
    console.log(`new status is ${item.status}`);
    await item.save();
    return item;
  }
}
