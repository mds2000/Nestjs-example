import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddTaskDbDto } from './dto/add-task-db.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task) private readonly tasksRepository: Repository<Task>,
  ) {}

  createTask(task: AddTaskDbDto): Task {
    return this.tasksRepository.create(task);
  }

  async getTaskById(id: string): Promise<Task> {
    return this.tasksRepository.findOneBy({ id });
  }

  async saveTask(task: Task): Promise<Task> {
    return this.tasksRepository.save(task);
  }
}
