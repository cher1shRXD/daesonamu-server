import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.model';

@Controller('boards')
export class BoardsController {
  constructor(private boradService: BoardsService) {}
  
  @Get()
  getAllBoards() : Board[] {
    return this.boradService.getAllBoards();
  }
  @Get('/:id')
  getBoardById(@Param('id') boardId:string) : Board {
    return this.boradService.getBoardById(boardId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoards(@Body() createBoardDto : CreateBoardDto) : Board {
    return this.boradService.createBoard(createBoardDto);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') boardId:string) : void {
    this.boradService.deleteBoard(boardId);
  }

  @Patch('/:id/edit')
  updateBoard(@Param('id') boardId:string, @Body('detail') detail:string) : Board {
    return this.boradService.updateBoard(boardId,detail);
  }
}
