import { IsDefined, IsString, IsBoolean, IsOptional } from 'class-validator';
import { User } from 'models/user';

export class CreatePostDto {
  @IsDefined()
  @IsString()
  public user: User;

  @IsDefined()
  @IsString()
  public title: string;

  @IsDefined()
  @IsString()
  public content: string;

  @IsOptional()
  @IsBoolean()
  public active?: boolean;
}
