import {
  Controller,
  Post,
  Delete,
  Param,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('likes/:boardId')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async likePost(
    @Param('boardId') boardId: number,
    @GetUser() user: User,
  ): Promise<number> {
    return await this.likeService.likePost(boardId, user);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  async unlikePost(
    @Param('boardId') boardId: number,
    @GetUser() user: User,
  ): Promise<number> {
    return await this.likeService.unlikePost(boardId, user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async checkLike(
    @Param('boardId') boardId: number,
    @GetUser() user: User,
  ): Promise<boolean> {
    return await this.likeService.checkLike(boardId, user);
  }
}
