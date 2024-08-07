import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersModule } from 'src/modules/user/user.module';
import { AuthController } from 'src/modules/auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/modules/auth/strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ session: false }),
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
