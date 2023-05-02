import { IsDefined, IsString, IsBoolean, IsOptional } from 'class-validator';
import { Post } from 'models/post';
import { User } from 'models/user';

export class CreateActionDto {
  @IsDefined()
  @IsString()
  public user: User;

  @IsDefined()
  @IsString()
  public post: Post;

  @IsOptional()
  @IsBoolean()
  public action?: boolean;

  @IsOptional()
  @IsBoolean()
  public active?: boolean;
}
