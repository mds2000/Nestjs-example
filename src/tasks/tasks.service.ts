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

  getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.getAllTasks();
  }

  async getTasksWithFilter(
    getTasksFilterDto: GetTasksFilterDto,
  ): Promise<Task[]> {
    const { status, search } = getTasksFilterDto;
    let filteredTasks = await this.getAllTasks();
    if (status) {
      filteredTasks = filteredTasks.filter((tsk) => tsk.status === status);
    }

    if (search) {
      filteredTasks = filteredTasks.filter(
        (tsk) => tsk.title.includes(search) || tsk.description.includes(search),
      );
    }

    return filteredTasks;
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
