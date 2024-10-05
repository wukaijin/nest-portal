import { IsNotEmpty, IsString } from 'class-validator';

export class RenameFolderDto {
  @IsString()
  @IsNotEmpty()
  path: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
