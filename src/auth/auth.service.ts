import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignupCredentialDto } from './dto/signup.dto';
import * as bycrpt from 'bcryptjs';
import { LoginCredentialDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(signupCredentialDto: SignupCredentialDto): Promise<void> {
    return this.userRepository.createUser(signupCredentialDto);
  }

  async login(loginCredentialDto: LoginCredentialDto): Promise<{accessToken:string}> {
    const { studentId, password } = loginCredentialDto;
    const user = await this.userRepository.findOne({ where: { studentId } });

    if (user) {
      if (await bycrpt.compare(password, user.password)) {

        const payload = { studentId };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
      } else {
        throw new UnauthorizedException('wrong password');
      }
    } else {
      throw new NotFoundException('user not found');
    }
  }
}
