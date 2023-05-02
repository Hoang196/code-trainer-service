import { IsDefined, IsString, IsBoolean, IsOptional } from 'class-validator';
import { Post } from 'models/post';
import { User } from 'models/user';

export class CreateCommentDto {
  @IsDefined()
  @IsString()
  public user: User;

  @IsDefined()
  @IsString()
  public post: Post;

  @IsDefined()
  @IsString()
  public content: number;

  @IsOptional()
  @IsBoolean()
  public active?: boolean;
}
