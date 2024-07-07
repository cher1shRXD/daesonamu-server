import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupCredentialDto } from './dto/signup.dto';
import { LoginCredentialDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) signupCredentialDto: SignupCredentialDto,
  ): Promise<void> {
    return this.authService.signUp(signupCredentialDto);
  }

  @Post('/login')
  login(
    @Body(ValidationPipe) loginCredentialDto: LoginCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(loginCredentialDto);
  }

  @Post('/me')
  @UseGuards(AuthGuard('jwt'))
  me(@GetUser() user: User) {
    console.log(user);
  }
}
