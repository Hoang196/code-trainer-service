import { IsDefined } from 'class-validator';
import { User } from 'models/user';

export class CreateGroupDto {
  @IsDefined()
  public group: {
    admin: User;
    name: string;
    description: string;
    active?: boolean;
  };

  @IsDefined()
  public user: Array<any>;
}
