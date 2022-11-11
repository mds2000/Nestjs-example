import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersRepository } from './users.repository';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { config } from 'dotenv';
import { JwtPayload } from './dto/jwt-payload.interface';
import { User } from './user.entity';
config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.usersRepository.getUserById(username);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
