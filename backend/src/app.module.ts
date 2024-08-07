import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/modules/task/entity/task';
import { User } from 'src/modules/user/entity/user';
import { UsersModule } from 'src/modules/user/user.module';
import { TasksModule } from 'src/modules/task/task.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import {dbConfig} from "src/db.config";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: dbConfig.type,
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      entities: [Task, User],
      synchronize: true, // do not use this in production,
    }),
    TypeOrmModule.forFeature([Task, User]),
    UsersModule,
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {
  constructor() {}
}
