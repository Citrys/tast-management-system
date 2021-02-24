import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.status.enum';

export class StatusUpdateValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.done,
    TaskStatus.inProgress,
    TaskStatus.open,
  ];
  transform(value: any) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`Invalid status value ${value}`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
