import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { InsertResult } from 'typeorm';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id') boardId: number): Promise<Board> {
    return this.boardsService.getBoardById(boardId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  createBoards(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user:User
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteBoard(@Param('id') boardId: number): void {
    this.boardsService.deleteBoard(boardId);
  }

  @Patch('/:id/edit')
  @UseGuards(AuthGuard())
  updateBoard(
    @Param('id') boardId: number,
    @Body('detail') detail: string,
  ): Promise<Board> {
    return this.boardsService.updateBoard(boardId, detail);
  }
}
