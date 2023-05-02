import { IsDefined, IsString } from 'class-validator';

export class AuthDto {
  @IsDefined()
  @IsString()
  public email: string;

  @IsDefined()
  @IsString()
  public password: string;
}

export class RefreshDto {
  @IsDefined()
  @IsString()
  public refreshToken: string;
}

export class ChangePasswordDto {
  @IsDefined()
  @IsString()
  public id: string;

  @IsDefined()
  @IsString()
  public password: string;

  @IsDefined()
  @IsString()
  public newPassword: string;
}

export class ForgetPasswordDto {
  @IsDefined()
  @IsString()
  public email: string;
}
