import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';

interface Req {
  userId: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  me(@Req() request: Req) {
    return this.usersService.getUserById(request.userId);
  }
}
