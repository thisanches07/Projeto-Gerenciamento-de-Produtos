import { AuthService } from '@app/autenticacao/autenticacao.service';
import { Public } from '@app/utils/rota-publica.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Login')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  @Public()
  login() {
    return this.authService.generateToken();
  }
}
