import { Injectable } from '@nestjs/common';
import { Board } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards : Board[] = [
    
  ];
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
    return this.boards.find((item)=>item.id === boardId);
  }
  deleteBoard(boardId:string) : void {
    this.boards = this.boards.filter((item) => item.id !== boardId);
  }

  updateBoard(boardId:string, newDetail:string) : Board {
    const target = this.getBoardById(boardId);
    target.detail = newDetail;
    return target;
  }
}
