import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  getAllTasks(
    getTasksFilterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    return this.tasksRepository.getAllTasks(getTasksFilterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.getTaskById(id, user);
    if (!task) throw new NotFoundException(`Task with id ${id} not found.`);

    return task;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTaskById(id: string, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    if (!task) throw new NotFoundException(`Task with id ${id} not found.`);

    await this.tasksRepository.remove(id);

    return task;
  }

  async updateTaskById(
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const { id } = updateTaskDto;
    const task = await this.getTaskById(id, user);
    if (!task) throw new NotFoundException(`Task with id ${id} not found.`);

    await this.tasksRepository.update(updateTaskDto);

    return this.getTaskById(id, user);
  }

  async updateTaskStatusById(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    if (!task) throw new NotFoundException(`Task with id ${id} not found.`);

    task.status = status;
    await this.tasksRepository.update(task);

    return this.getTaskById(id, user);
  }
}
