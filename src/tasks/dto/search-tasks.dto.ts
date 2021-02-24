import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.status.enum';

export class SearchTasksDTO {
  @IsOptional()
  @IsIn([TaskStatus.done, TaskStatus.inProgress, TaskStatus.open])
  status: TaskStatus;

  @IsNotEmpty()
  search: string;
}
