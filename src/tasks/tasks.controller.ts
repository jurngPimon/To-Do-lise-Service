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
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('tasks')
@ApiTags('Tasks')
@ApiBearerAuth('access-token')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get a paginated list of tasks' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 5 })
  @ApiResponse({ status: 200, description: 'Returns a list of tasks.' })
  getTasks(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
  ): Promise<{ tasks: Task[]; total: number }> {
    return this.tasksService.getTasks(Number(page), Number(limit));
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get task details by ID' })
  @ApiParam({ name: 'id', required: true, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Returns the task details.',
    type: Task,
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  getTaskById(@Param('id') id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Add a new task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'Task successfully created.' })
  addTask(@Body() body: CreateTaskDto) {
    return this.tasksService.addTask(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({ name: 'id', required: true, example: 1 })
  @ApiResponse({ status: 200, description: 'Task successfully deleted.' })
  deleteTask(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task partially by ID' })
  @ApiParam({ name: 'id', required: true, example: 1 })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: 200, description: 'Task successfully updated.' })
  updateTask(@Param('id') id: number, @Body() body: UpdateTaskDto) {
    return this.tasksService.updateTask(id, body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Replace a task completely by ID' })
  @ApiParam({ name: 'id', required: true, example: 1 })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 200, description: 'Task successfully replaced.' })
  replaceTask(@Param('id') id: number, @Body() body: CreateTaskDto) {
    return this.tasksService.replaceTask(id, body);
  }
}
