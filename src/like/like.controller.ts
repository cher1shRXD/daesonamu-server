import {
  Controller,
  Post,
  Delete,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('likes/:boardId')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async likePost(@Param('boardId') boardId: number, @Req() req): Promise<number> {
    return await this.likeService.likePost(boardId, req.user);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  async unlikePost(@Param('boardId') boardId: number, @Req() req): Promise<number> {
    return await this.likeService.unlikePost(boardId, req.user);
  }
}
