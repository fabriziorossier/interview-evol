import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskDto } from './dto/task.dto';
import { TASK_REPOSITORY } from '../../core/database/constants';

@Injectable()
export class TasksService {
  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepository: typeof Task,
  ) {}

  async create(task: TaskDto): Promise<Task> {
    return await this.taskRepository.build(task as Task).save();
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.findAll<Task>();
  }

  async findOne(id): Promise<Task> {
    const task = await this.taskRepository.findOne<Task>({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async delete(id) {
    return await this.taskRepository.destroy({ where: { id } });
  }

  async update(id, data) {
    const [numberOfAffectedRows, [updatedTask]] =
      await this.taskRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedTask };
  }
}
