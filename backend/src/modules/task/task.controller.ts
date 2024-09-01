import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TaskService } from 'src/modules/task/task.service';
import { Task } from 'src/modules/task/entity/task';
import { JwtGuard } from 'src/modules/auth/auth.guard';
import { TaskDto } from 'src/modules/task/dto/task.dto';

@Controller('/tasks')
@UseGuards(JwtGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/user/:email')
  async getUsersTask(@Param('email') email: string): Promise<Task[]> {
    return this.taskService.findTasksByUserEmail(email);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Task | undefined> {
    return this.taskService.findById(+id);
  }

  @Patch(':id')
  async edit(@Param('id') id: string, @Body() taskDto: TaskDto): Promise<Task> {
    return this.taskService.update(+id, taskDto);
  }

  @Post()
  async create(@Body() taskDto: TaskDto): Promise<Task> {
    return this.taskService.add(taskDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.taskService.delete(+id);
  }
}
