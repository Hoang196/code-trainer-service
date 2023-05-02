import { IsDefined, IsString, IsBoolean, IsOptional, IsArray } from 'class-validator';
import { Group } from 'models/group';

export class CreateExamDto {
  @IsDefined()
  @IsString()
  public group: Group;

  @IsDefined()
  @IsString()
  public name: string;

  @IsDefined()
  @IsArray()
  public exerciseId: Array<any>;

  @IsOptional()
  @IsBoolean()
  public active?: boolean;
}
