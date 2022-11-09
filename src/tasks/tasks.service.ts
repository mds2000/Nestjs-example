import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}
  /*
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(getTasksFilterDto: GetTasksFilterDto): Task[] {
    const { status, search } = getTasksFilterDto;
    let filteredTasks = this.getAllTasks();
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
  */

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.getTaskById(id);
    if (!task) throw new NotFoundException(`Task with id ${id} not found.`);

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const newTask: Task = this.tasksRepository.createTask({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    return await this.tasksRepository.saveTask(newTask);
  }

  /*
  deleteTaskById(id: string): Task {
    const task = this.getTaskById(id);
    if (!task) throw new NotFoundException(`Task with id ${id} not found.`);

    const index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);

    return task;
  }

  updateTaskById(updateTaskDto: UpdateTaskDto): Task {
    const { id } = updateTaskDto;
    const task = this.getTaskById(id);
    //TODO
    return task;
  }

  updateTaskStatusById(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    if (!task) throw new NotFoundException(`Task with id ${id} not found.`);

    task.status = status;

    return task;
  }
  */
}
