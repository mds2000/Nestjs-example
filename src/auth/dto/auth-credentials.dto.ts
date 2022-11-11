import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 255)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 255)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password not meeting the requirements',
  })
  password: string;
}
