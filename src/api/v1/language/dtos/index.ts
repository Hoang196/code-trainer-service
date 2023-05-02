import { IsDefined, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateLanguageDto {
  @IsDefined()
  @IsString()
  public name: string;

  @IsOptional()
  @IsBoolean()
  public active?: boolean;
}
