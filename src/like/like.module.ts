import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/boards/board.entity';
import { Like } from './like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Like])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
