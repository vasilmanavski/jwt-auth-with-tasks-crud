import { Module } from '@nestjs/common';
import { TaskController } from 'src/modules/task/task.controller';
import { TaskService } from 'src/modules/task/task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/modules/task/entity/task';
import { AuthModule } from 'src/modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/modules/user/entity/user';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User]), JwtModule],
  controllers: [TaskController],
  providers: [TaskService, AuthModule],
})
export class TasksModule {}
