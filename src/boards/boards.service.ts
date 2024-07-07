import { Injectable, NotFoundException } from '@nestjs/common';
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
      relations: ['author']
    });
  }

  async createBoard(createBoardDto: CreateBoardDto , user:User): Promise<Board> {
    const { title, detail } = createBoardDto;
    const createdAt = new Date().toLocaleDateString();
    const newContent = this.boardRepository.create({
      title,
      detail,
      createdAt,
      author: user
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

  async deleteBoard(boardId: number): Promise<void> {
    await this.boardRepository.delete(boardId);
  }

  async updateBoard(boardId: number, newDetail: string): Promise<Board> {
    const target = await this.getBoardById(boardId); 
    target.detail = newDetail; 
    const res = await this.boardRepository.save(target); 
    return res; 
  }
}
