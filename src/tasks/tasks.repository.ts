import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task) private readonly tasksRepository: Repository<Task>,
  ) {}

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const newTask: Task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    return this.tasksRepository.save(newTask);
  }

  getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  getTaskById(id: string): Promise<Task> {
    return this.tasksRepository.findOneBy({ id });
  }

  update(updateTaskDto: UpdateTaskDto) {
    const { id } = updateTaskDto;

    return this.tasksRepository.update(id, updateTaskDto);
  }

  remove(id: string) {
    return this.tasksRepository.delete({ id });
  }
}
