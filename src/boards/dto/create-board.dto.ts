import { IsNotEmpty } from "class-validator";

export class CreateBoardDto {
  @IsNotEmpty()
  title:string;

  @IsNotEmpty()
  detail:string;

}