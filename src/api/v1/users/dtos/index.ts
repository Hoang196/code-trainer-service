import { IsDefined, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  public email: string;

  @IsDefined()
  @IsString()
  public username: string;

  @IsDefined()
  @IsString()
  public password: string;

  @IsOptional()
  @IsString()
  public dob?: string;

  @IsOptional()
  @IsString()
  public role?: string;

  @IsOptional()
  @IsString()
  public gender?: string;

  @IsOptional()
  @IsString()
  public avatar?: string;

  @IsOptional()
  @IsBoolean()
  public active?: boolean;
}
