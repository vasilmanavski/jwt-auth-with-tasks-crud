import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/user/entity/user';
import { Task } from 'src/modules/task/entity/task';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  private readonly saltRounds = 10;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['tasks'] });
  }

  async findOneByUsername(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(email: string, password: string): Promise<User> {
    const hashedPassword = await hash(password, this.saltRounds);
    const user = this.usersRepository.create({ email, password: hashedPassword });

    return this.usersRepository.save(user);
  }

  async assignTask(userId: number, taskId: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    const task = await this.tasksRepository.findOneBy({ id: taskId });

    if (user && task) {
      task.user = user;
      await this.tasksRepository.save(task);

      return user;
    }

    throw new Error('User or Types not found');
  }
}
