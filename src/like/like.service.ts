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

  async likePost(postId: number, user: User): Promise<void> {
    const board = await this.boardRepository.findOne({ where: { id: postId } });

    if (!Board) {
      throw new Error('Post not found');
    }

    const like = new Like();
    like.board = board;
    like.user = user;
    await this.likeRepository.save(like);

    board.likesCount += 1;
    await this.boardRepository.save(board);
  }

  async unlikePost(postId: number, user: User): Promise<void> {
    const like = await this.likeRepository.findOne({
      where: { board: { id: postId }, user: { id: user.id } },
    });

    if (!like) {
      throw new Error('Like not found');
    }

    await this.likeRepository.remove(like);

    const post = await this.boardRepository.findOne({ where: { id: postId } });
    if (post) {
      post.likesCount -= 1;
      await this.boardRepository.save(post);
    }
  }
}
