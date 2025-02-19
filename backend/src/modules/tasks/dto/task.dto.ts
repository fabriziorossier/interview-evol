import { IsNotEmpty, MinLength, IsBoolean, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class TaskDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsDate()
  @Type(() => Date)
  readonly dueDate: Date;

  @IsBoolean()
  readonly completed: boolean = false;
}
