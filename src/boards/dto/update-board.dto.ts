import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateBoardDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'detail' })
  detail: string;
}
