import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.getUserById(username);
    if (!user) throw new UnauthorizedException('Invalid credentials.');

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (passwordIsValid) {
      const payload: JwtPayload = { username };
      const accessToken = this.jwtService.sign(payload);
      return accessToken;
    } else {
      throw new UnauthorizedException('Invalid credentials.');
    }
  }
}
