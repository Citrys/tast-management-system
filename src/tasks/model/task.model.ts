export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  open = 'Open',
  inProgress = 'In Progress',
  done = 'Done',
}
