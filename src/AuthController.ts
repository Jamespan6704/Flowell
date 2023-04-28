import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('username') username: string,
  ) {
    return this.userService.createUser(email, password, username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('feed')
  async getUserFeed(@Req() request: Request) {
    return this.userService.getUserFeed(request.user);
  }
}
