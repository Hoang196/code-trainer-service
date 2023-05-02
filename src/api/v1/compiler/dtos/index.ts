import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator';
import { Exam } from 'models/exam';
import { Exercise } from 'models/exercise';
import { User } from 'models/user';

export class CreateCompilerDto {
  @IsDefined()
  @IsString()
  public user: User;

  @IsDefined()
  @IsString()
  public exercise: Exercise;

  @IsOptional()
  @IsString()
  public exam?: Exam;

  @IsDefined()
  @IsString()
  public language: string;

  @IsDefined()
  @IsString()
  public content: string;

  @IsDefined()
  @IsString()
  public typeCompiler: string;

  @IsOptional()
  @IsBoolean()
  public active?: boolean;
}
