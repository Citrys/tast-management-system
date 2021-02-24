import { TaskStatus } from '../model/task.model';

import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class SearchTasksDTO {
  @IsOptional()
  @IsIn([TaskStatus.done, TaskStatus.inProgress, TaskStatus.open])
  status: TaskStatus;

  @IsNotEmpty()
  search: string;
}
