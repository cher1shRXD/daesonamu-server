import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
  private boards : Board[] = [];
 
  getAllBoards() : Board[] {
    return this.boards;
  }
  
  createBoard(createBoardDto : CreateBoardDto) {
    const { title,detail,author } = createBoardDto
    const createdAt = new Date().toLocaleDateString();
    const newContent : Board = {
      id: uuid(),
      title,
      detail,
      author,
      createdAt
    }
    this.boards.push(newContent);
    return newContent;
  }
  
  getBoardById(boardId:string) : Board {
    const res = this.boards.find((item) => item.id === boardId);
    if(!res) {
      throw new NotFoundException(`There's no content has ${boardId} for its id`);
    }
    return res
  }
  
  deleteBoard(boardId:string) : void {
    const target = this.getBoardById(boardId);
    this.boards = this.boards.filter((item) => item.id !== target.id);
  }

  updateBoard(boardId:string, newDetail:string) : Board {
    const target = this.getBoardById(boardId);
    target.detail = newDetail;
    return target;
  }
}
