import { IsDefined, IsString, IsBoolean, IsOptional } from 'class-validator';
import { Exam } from 'models/exam';
import { Exercise } from 'models/exercise';

export class CreateExerciseExamDto {
  @IsDefined()
  @IsString()
  public exercise: Exercise;

  @IsDefined()
  @IsString()
  public exam: Exam;

  @IsOptional()
  @IsBoolean()
  public active?: boolean;
}
