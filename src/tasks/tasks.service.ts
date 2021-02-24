import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './model/task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { SearchTasksDTO } from './dto/search-tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filter: SearchTasksDTO): Task[] {
    const { status, search } = filter;
    const tasks_filtered = this.tasks;
    if (status) {
      tasks_filtered.filter((item) => item.status != status);
    }

    if (search) {
      tasks_filtered.filter(
        (item) =>
          item.title.includes(search) || item.description.includes(search),
      );
    }

    return tasks_filtered;
  }

  getTaskbyId(id: string): Task {
    return this.tasks.find((item) => item.id === id);
  }

  createTask(taskDto: CreateTaskDTO): Task {
    // destruct object
    const { title, description } = taskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.open,
    };
    this.tasks.push(task);
    return task;
  }

  deleteItem(id: string) {
    const item = this.tasks.findIndex((item) => item.id === id);
    console.log(`item was found ${item}`);
    if (item >= 0) {
      console.log(`Deleting item`);
      this.tasks.splice(item, 1);
      return { ok: 'true' };
    } else {
      throw new Error('No such element');
    }
  }

  updateStatus(id: string, status: TaskStatus) {
    const item = this.getTaskbyId(id);
    item.status = status;
    console.log(`new status is ${item.status}`);
    return item;
  }
}
