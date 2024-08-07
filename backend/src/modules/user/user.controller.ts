import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { User } from 'src/modules/user/entity/user';
import { UserService } from 'src/modules/user/user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':username')
  findOne(@Param('email') email: string): Promise<User> {
    return this.userService.findOneByUsername(email);
  }

  @Post()
  create(@Body('email') email: string, @Body('password') password: string): Promise<User> {
    return this.userService.create(email, password);
  }

  @Post(':userId/tasks/:taskId')
  assignTask(@Param('userId') userId: number, @Param('taskId') taskId: number): Promise<User> {
    return this.userService.assignTask(userId, taskId);
  }
}
