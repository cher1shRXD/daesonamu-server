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
    private postRepository: Repository<Board>,
  ) {}

  async likePost(postId: number, user: User): Promise<void> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    const like = new Like();
    like.board = post;
    like.user = user;
    await this.likeRepository.save(like);
  }

  async unlikePost(postId: number, user: User): Promise<void> {
    const like = await this.likeRepository.findOne({
      where: { board: { id: postId }, user: { id: user.id } },
    });
    await this.likeRepository.remove(like);
  }
}
