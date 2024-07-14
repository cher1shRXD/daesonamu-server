import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find({
      relations: ['author', 'likes'],
      order: {
        id: 'DESC',
      },
    });
  }

  async getRankBoards(): Promise<Board[]> {
    return this.boardRepository.find({
      relations: ['author', 'likes'],
      order: {
        likesCount: 'DESC',
      },
    });
  }

  async getFreeBoards(): Promise<Board[]> {
    return this.boardRepository.find({
      relations: ['author', 'likes'],
      where: { category: 'FREE' },
      order: {
        id: 'DESC',
      },
    });
  }

  async getShortsBoards(): Promise<Board[]> {
    return this.boardRepository.find({
      relations: ['author', 'likes'],
      where: {
        category: 'SHORTS',
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async getCodingBoards(): Promise<Board[]> {
    return this.boardRepository.find({
      relations: ['author', 'likes'],
      where: {
        category: 'CODING',
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, detail, category } = createBoardDto;
    const createdAt = new Date().toLocaleDateString();
    const newContent = this.boardRepository.create({
      title,
      detail,
      createdAt,
      author: user,
      category,
    });
    return await this.boardRepository.save(newContent);
  }

  async getBoardById(boardId: number): Promise<Board> {
    const res = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['author'],
    });
    if (!res) {
      throw new NotFoundException(
        `There's no content has ${boardId} for its id`,
      );
    }
    return res;
  }

  async deleteBoard(boardId: number, user: User): Promise<void> {
    const res = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['author'],
    });
    if (!res) {
      throw new NotFoundException(
        `There's no content has ${boardId} for its id`,
      );
    }
    if (res.author.id != user.id) {
      throw new UnauthorizedException("you're not a author");
    }

    await this.boardRepository.remove(res);
  }

  async updateBoard(
    boardId: number,
    updateBoardDto: CreateBoardDto,
  ): Promise<Board> {
    const target = await this.getBoardById(boardId);
    target.detail = updateBoardDto.detail;
    target.title = updateBoardDto.title;
    const res = await this.boardRepository.save(target);
    return res;
  }
}
