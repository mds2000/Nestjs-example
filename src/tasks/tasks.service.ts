import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  getAllTasks(getTasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getAllTasks(getTasksFilterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.getTaskById(id);
    if (!task) throw new NotFoundException(`Task with id ${id} not found.`);

    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: string): Promise<Task> {
    const task = await this.getTaskById(id);
    if (!task) throw new NotFoundException(`Task with id ${id} not found.`);

    await this.tasksRepository.remove(id);

    return task;
  }

  async updateTaskById(updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { id } = updateTaskDto;
    const task = await this.getTaskById(id);
    if (!task) throw new NotFoundException(`Task with id ${id} not found.`);

    await this.tasksRepository.update(updateTaskDto);

    return this.getTaskById(id);
  }

  async updateTaskStatusById(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    if (!task) throw new NotFoundException(`Task with id ${id} not found.`);

    task.status = status;
    await this.tasksRepository.update(task);

    return this.getTaskById(id);
  }
}
