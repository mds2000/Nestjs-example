import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class AddTaskDbDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  description: string;

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
