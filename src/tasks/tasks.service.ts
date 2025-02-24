import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepo.find({
      order: {
        createdAt: 'ASC',
        id: 'ASC',
      },
    });
  }

  async addTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = this.taskRepo.create(createTaskDto);
    return this.taskRepo.save(newTask);
  }

  async deleteTask(id: number): Promise<{ message: string }> {
    await this.taskRepo.delete(id);
    return { message: 'Task deleted' };
  }

  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task | null> {
    await this.taskRepo.update(id, updateTaskDto);
    return this.taskRepo.findOne({ where: { id } });
  }

  async replaceTask(id: number, createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const replacedTask = { ...task, ...createTaskDto };
    return this.taskRepo.save(replacedTask);
  }
}
