import { IsDefined, IsArray, IsOptional } from 'class-validator';
import { Category } from 'models/category';

export class CreateExerciseDto {
  @IsDefined()
  public data: {
    category: Category;
    title: string;
    description: string;
    difficulty: string;
    sample_input: string;
    sample_output: string;
    max_score: number;
    max_submission?: number;
    name_function: string;
    params?: Array<string>;
    active?: boolean;
  };

  @IsOptional()
  @IsArray()
  public params?: Array<number>;

  @IsDefined()
  @IsArray()
  public testcase: Array<any>;

  @IsDefined()
  @IsArray()
  public language: Array<any>;
}
