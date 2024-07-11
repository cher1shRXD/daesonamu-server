import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column } from "typeorm";

export class CreateBoardDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'title' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'detail' })
  @Column('longtext')
  detail: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'category' })
  category: "FREE" | "SHORTS";
}