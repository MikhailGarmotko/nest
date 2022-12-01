import { oneUserDto } from './users/onseuser.dto';
import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './users/create.user.dto';
import { UsersService } from './users/users.service';
import { User } from './users/user.entity';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Post('user')
  async getUser(@Body() name:oneUserDto): Promise<User> {
    return this.userService.findOne(name.name);
  }
}
