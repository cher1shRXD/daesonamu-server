import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { Board } from '../boards/board.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async likePost(boardId: number, user: User): Promise<number> {
    const board = await this.boardRepository.findOne({ where: { id: boardId } });

    if (!Board) {
      throw new Error('board not found');
    }

    const like = new Like();
    like.board = board;
    like.user = user;
    await this.likeRepository.save(like);

    board.likesCount += 1;
    await this.boardRepository.save(board);
    return board.likesCount;
  }

  async unlikePost(boardId: number, user: User): Promise<number> {
    const like = await this.likeRepository.findOne({
      where: { board: { id: boardId }, user: { id: user.id } },
    });

    if (!like) {
      throw new Error('Like not found');
    }

    await this.likeRepository.remove(like);

    const board = await this.boardRepository.findOne({ where: { id: boardId } });
    if (board) {
      board.likesCount -= 1;
      await this.boardRepository.save(board);
    }
    return board.likesCount;
  }
}
