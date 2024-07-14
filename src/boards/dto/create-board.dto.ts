import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateBoardDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'title' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'detail' })
  detail: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'category' })
  category: "FREE" | "SHORTS" | "CODING";
}