import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { GetUser } from './get.user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/singup')
  singUp(@Body(ValidationPipe) auth: AuthCredentialsDTO) {
    return this.authService.singUp(auth);
  }

  @Post('/login')
  login(@Body(ValidationPipe) auth: AuthCredentialsDTO) {
    return this.authService.login(auth);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() @GetUser() req: User) {
    console.log(req);
  }
}
