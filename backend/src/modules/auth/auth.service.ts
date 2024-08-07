import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import { AuthDto } from '../auth//dto/AuthDto';
import { User } from 'src/modules/user/entity/user';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: AuthDto): Promise<User> {
    const user = await this.usersService.findOneByUsername(username);

    if (user == null) {
      return null;
    }

    const arePasswordsMatching = await compare(password, user?.password);
    if (!arePasswordsMatching) {
      return null;
    }

    return user;
  }

  async saveUser({ username, password }: AuthDto): Promise<User> {
    return this.usersService.create(username, password);
  }

  async generateJwtToken(sub, username): Promise<string> {
    const payload = { sub, username };

    return await this.jwtService.signAsync(payload);
  }
}
