import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly dataService:DatabaseService,
    private readonly jwtservice: JwtService
  ){}

  async login(loginData:LoginDto){
    const {email, password} = loginData;
    const user = await this.dataService.user.findFirst({
      where: {
        email: email
      }
    });
    if(!user){
      throw new NotFoundException("No user exist with entered Email")
    }
    const validatePassword = await bcrypt.compare(password, user.password)
    if(!validatePassword){
      throw new NotFoundException("Invalid Password")
    }
    return {
      token: this.jwtservice.sign({email})
    }

  }

  async register(registerData: RegisterUserDto) {
    const user = await this.dataService.user.findFirst({
      where: {
        email: registerData.email
      }
    });
    if(user){
      throw new BadGatewayException("User with this email already exist")
    }
    
    registerData.password = await bcrypt.hash(registerData.password, 10)
    const res = await this.dataService.user.create({data:registerData})
    return res;
  }
}
