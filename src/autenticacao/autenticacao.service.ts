import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken() {
    const payload = { sub: 'fake-id' };
    return {
      token_de_acesso: this.jwtService.sign(payload),
    };
  }
}
