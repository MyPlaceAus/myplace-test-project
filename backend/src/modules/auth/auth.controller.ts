import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('users/signin')
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @Public()
  @Post('users/signup')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }
}
