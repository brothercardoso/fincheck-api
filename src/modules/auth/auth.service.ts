import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { AuthenticateDto } from './dto/autheticate.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async authenticate(autheticateDto: AuthenticateDto) {
    const { email, password } = autheticateDto;

    const user = await this.usersRepo.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid crendetials');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid crendetials');
    }

    return { isPasswordValid };
  }
}
