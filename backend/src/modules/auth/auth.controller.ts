import { Response } from 'express';
import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { AuthDto } from 'src/modules/auth/dto/AuthDto';
import { UserService } from 'src/modules/user/user.service';
import type { AuthResponse, UserInfo } from 'src/modules/auth/types';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInUserDto: AuthDto, @Res({ passthrough: true }) res: Response): Promise<AuthResponse> {
    const user = await this.authService.validateUser(signInUserDto);

    if (user == null) throw new HttpException('User doesnt exists', HttpStatus.CONFLICT);

    try {
      const accessToken = await this.authService.generateJwtToken(user.id, user.email);

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        expires: new Date(Date.now() + 3600000),
      });

      return {};
    } catch (error) {
      console.error('Logging error:', error);

      throw new HttpException(error, HttpStatus.CONFLICT);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() registerUserDto: AuthDto, @Res({ passthrough: true }) res: Response): Promise<AuthResponse> {
    const existingUser = await this.userService.findOneByUsername(registerUserDto.username);

    if (existingUser != null) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    try {
      const savedUser = await this.authService.saveUser(registerUserDto);
      const accessToken = await this.authService.generateJwtToken(savedUser.id, savedUser.email);

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        expires: new Date(Date.now() + 3600000),
      });

      return {};
    } catch (error) {
      console.error('Register error:', error);

      throw new HttpException(error, HttpStatus.CONFLICT);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Body() registerUserDto: AuthDto, @Res({ passthrough: true }) res: Response): Promise<AuthResponse> {
    // todo - try to remove both token and username instead of setting them to empty strings
    res.cookie('accessToken', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      expires: new Date(0),
    });

    res.cookie('username', '', {
      secure: false,
      sameSite: 'strict',
      expires: new Date(0),
    });

    return { message: 'Logout successful' };
  }

  @HttpCode(HttpStatus.OK)
  @Get('user-info/:email')
  async getUserInfo(@Param('email') email: string): Promise<UserInfo> {
    const existingUser = await this.userService.findOneByUsername(email);

    if (existingUser == null) {
      throw new HttpException('User doesnt exist', HttpStatus.CONFLICT);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = existingUser;

    return userWithoutPassword;
  }
}
