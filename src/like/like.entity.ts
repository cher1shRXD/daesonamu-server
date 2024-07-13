import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Board } from '../boards/board.entity';
import { User } from '../auth/user.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Board, (board) => board.likes)
  board: Board;

  @ManyToOne(() => User)
  user: User;
}
