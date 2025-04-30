import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Complete assignment',
    description: 'The title of the task',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Finish the NestJS project',
    description: 'Detailed description of the task',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: TaskStatus.OPEN,
    description: 'Status of the task (OPEN, IN PROGRESS, DONE)',
    enum: TaskStatus, 
  })
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus = TaskStatus.OPEN;
}
