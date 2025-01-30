import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken() {
    const payload = { sub: 'fake-id' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
