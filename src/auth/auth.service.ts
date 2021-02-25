import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { JwtPayload } from './jwt.user.payload';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async singUp(auth: AuthCredentialsDTO) {
    await this.userRepository.singUp(auth);
  }

  async login(auth: AuthCredentialsDTO) {
    const username = await this.userRepository.validateUser(auth);
    if (!username) {
      throw new UnauthorizedException(`Incorrect credentials!`);
    }

    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
