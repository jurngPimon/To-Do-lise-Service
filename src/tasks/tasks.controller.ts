import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
  ): Promise<{ tasks: Task[]; total: number }> {
    return this.tasksService.getTasks(Number(page), Number(limit));
  }

  @Post()
  addTask(@Body() body: CreateTaskDto) {
    return this.tasksService.addTask(body);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }

  @Patch(':id')
  updateTask(@Param('id') id: number, @Body() body: UpdateTaskDto) {
    return this.tasksService.updateTask(id, body);
  }

  @Put(':id')
  replaceTask(@Param('id') id: number, @Body() body: CreateTaskDto) {
    return this.tasksService.replaceTask(id, body);
  }
}
