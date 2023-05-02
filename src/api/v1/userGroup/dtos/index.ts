import { IsDefined, IsString, IsBoolean, IsOptional } from 'class-validator';
import { Group } from 'models/group';
import { User } from 'models/user';

export class CreateUserGroupDto {
  @IsDefined()
  @IsString()
  public user: User;

  @IsDefined()
  @IsString()
  public group: Group;

  @IsOptional()
  @IsBoolean()
  public active?: boolean;
}
