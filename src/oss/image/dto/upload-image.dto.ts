import { IsOptional, IsString } from 'class-validator';

export class UploadImageDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  path?: string;
}
