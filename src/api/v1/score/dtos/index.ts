import { IsDefined, IsString, IsBoolean, IsOptional } from 'class-validator';
import { Exercise } from 'models/exercise';
import { User } from 'models/user';

export class CreateScoreDto {
  @IsDefined()
  @IsString()
  public user: User;

  @IsDefined()
  @IsString()
  public exercise: Exercise;

  @IsDefined()
  @IsString()
  public score: number;

  @IsOptional()
  @IsBoolean()
  public active?: boolean;
}
