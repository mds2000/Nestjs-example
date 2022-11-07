import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

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

  getTaskById(id: string): Task {
    const task = this.getAllTasks().find((tsk) => tsk.id === id);
    if (!task) throw new NotFoundException(`Task with id ${id} not found.`);

    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const newTask: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(newTask);

    return newTask;
  }

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
}
