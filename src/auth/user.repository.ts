import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * SingUp method to store user info in DB
   * @param auth user auth dto with username and password
   */
  async singUp(auth: AuthCredentialsDTO) {
    const { username, password } = auth;
    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.passwordHash(password, user.salt);
    console.log(user);
    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        //duplicate username
        throw new ConflictException('User already exists');
      }
      throw new Error(error.message);
    }
  }

  async validateUser(auth: AuthCredentialsDTO) {
    const { username, password } = auth;
    const user = await this.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return user.username;
    }
  }

  private passwordHash(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
