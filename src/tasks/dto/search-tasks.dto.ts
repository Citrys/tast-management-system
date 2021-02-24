import { TaskStatus } from '../model/task.model';

export class SearchTasksDTO {
  status: TaskStatus;
  search: string;
}
