import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task as TaskEntity } from './task.entity';
import { TaskDto } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  async findAll() {
    return await this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TaskEntity> {
    const task = await this.taskService.findOne(id);

    if (!task) {
      throw new NotFoundException("This Task doesn't exist");
    }

    return task;
  }

  @Post()
  async create(@Body() task: TaskDto): Promise<TaskEntity> {
    return await this.taskService.create(task);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() task: TaskDto,
  ): Promise<TaskEntity> {
    const { numberOfAffectedRows, updatedTask } = await this.taskService.update(
      id,
      task,
    );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Task doesn't exist");
    }

    return updatedTask;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.taskService.delete(id);

    if (deleted === 0) {
      throw new NotFoundException("This Task doesn't exist");
    }

    return 'Successfully deleted';
  }
}
