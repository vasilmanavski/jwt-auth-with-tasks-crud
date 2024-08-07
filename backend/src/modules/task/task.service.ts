import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/modules/task/entity/task';
import { User } from 'src/modules/user/entity/user';
import {TaskDto} from "src/modules/task/dto/task.dto";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findTasksByUserId(email: string): Promise<Task[]> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['tasks'],
    });

    return user?.tasks || [];
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findById(id: number): Promise<Task | undefined> {
    return this.taskRepository.findOne({ where: { id } });
  }

  async add(taskDto: TaskDto): Promise<Task> {
    const user = await this.userRepository.findOne({ where: { id: taskDto.userId } });

    if (!user) {
      throw new Error('User not found when adding task');
    }

    const task = new Task(taskDto.title, user);

    return this.taskRepository.save(task);
  }

  async delete(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
