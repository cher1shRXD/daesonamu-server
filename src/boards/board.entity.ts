import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Like } from '../like/like.entity';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne((type) => User, (user) => user.board, { eager: false })
  author: User;

  @Column('longtext')
  detail: string;

  @Column()
  createdAt: string;

  @Column()
  category: 'FREE' | 'SHORTS' | 'CODING';

  @OneToMany(() => Like, (like) => like.board)
  likes: Like[];

  @Column({ default: 0 })
  likesCount: number;
}