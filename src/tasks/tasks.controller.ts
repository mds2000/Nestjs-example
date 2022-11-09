import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  /*
  @Get()
  getTasks(@Query() getTasksFilterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(getTasksFilterDto).length > 0) {
      return this.tasksService.getTasksWithFilter(getTasksFilterDto);
    }

    return this.tasksService.getAllTasks();
  }
  */

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto);
  }

  /*
  @Delete(':id')
  deleteTask(@Param('id') id: string): Task {
    return this.tasksService.deleteTaskById(id);
  }

  @Put()
  updateTask(@Body() updateTaskDto: UpdateTaskDto): Task {
    return this.tasksService.updateTaskById(updateTaskDto);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatusById(id, status);
  }
  */
}
