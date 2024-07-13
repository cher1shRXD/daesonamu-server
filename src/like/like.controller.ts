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

@Controller('posts/:postId/likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async likePost(@Param('postId') postId: number, @Req() req): Promise<void> {
    await this.likeService.likePost(postId, req.user);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  async unlikePost(@Param('postId') postId: number, @Req() req): Promise<void> {
    await this.likeService.unlikePost(postId, req.user);
  }
}
