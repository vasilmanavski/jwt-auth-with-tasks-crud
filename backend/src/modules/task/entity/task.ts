import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/modules/user/entity/user';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.tasks, {onDelete: 'CASCADE' })
  user: User;

  constructor(title: string, user: User) {
    this.title = title;
    this.user = user;
  }
}
