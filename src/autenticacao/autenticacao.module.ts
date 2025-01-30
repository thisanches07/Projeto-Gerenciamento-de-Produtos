import { AuthService } from '@app/autenticacao/autenticacao.service';
import { AuthController } from '@app/autenticacao/auth.controller';
import { JwtStrategy } from '@app/autenticacao/jwt.estrategia';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { config } from 'dotenv';
config();
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AutenticacaoModule {}
