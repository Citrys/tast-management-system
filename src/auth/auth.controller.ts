import { Body, Controller, Logger, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger()
  constructor(private authService: AuthService) {}

  @Post('/signup')
  singUp(@Body(ValidationPipe) auth: AuthCredentialsDTO) {
    return this.authService.singUp(auth);
  }

  @Post('/signin')
  login(@Body(ValidationPipe) auth: AuthCredentialsDTO) {
    this.logger.log(`Login attempt with user dt: ${JSON.stringify(auth)}`);
    return this.authService.login(auth);
  }
}
