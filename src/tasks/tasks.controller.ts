import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
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
