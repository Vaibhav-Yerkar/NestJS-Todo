import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({description:"To register a new user", summary:"To register a new user"})
  @Post('register')
  create(@Body() registerData: RegisterUserDto) {
    return this.authService.register(registerData);
  }
  
  @ApiOperation({description:"To login as a user", summary:"To login as a user"})
  @Post('login')
  login(@Body() loginData: LoginDto){
    return this.authService.login(loginData);
  }
}
