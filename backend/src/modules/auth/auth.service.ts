import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

type AuthUserPayload = {
  id: string;
  email: string;
  name: string;
  company: string;
};

type AuthResponse = {
  success: boolean;
  data: {
    accessToken: string;
    user: AuthUserPayload;
  };
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private toAuthUser(user: {
    id: number;
    email: string;
    name: string | null;
    organization: string | null;
  }): AuthUserPayload {
    return {
      id: String(user.id),
      email: user.email,
      name: user.name ?? '',
      company: user.organization ?? '',
    };
  }

  private hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');

    return `${salt}:${hash}`;
  }

  private verifyPassword(password: string, passwordHash: string): boolean {
    const [salt, storedHash] = passwordHash.split(':');

    if (!salt || !storedHash) {
      return false;
    }

    const currentHash = scryptSync(password, salt, 64).toString('hex');

    return timingSafeEqual(
      Buffer.from(storedHash, 'hex'),
      Buffer.from(currentHash, 'hex'),
    );
  }

  private async issueTokenAndBuildResponse(user: {
    id: number;
    email: string;
    name: string | null;
    organization: string | null;
  }): Promise<AuthResponse> {
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      success: true,
      data: {
        accessToken,
        user: this.toAuthUser(user),
      },
    };
  }

  async signUp(input: SignUpDto): Promise<AuthResponse> {
    const existingUser = await this.userService.getUserByEmail(input.email);

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const createdUser = await this.userService.createUserWithPassword(
      {
        email: input.email,
        name: input.name ?? null,
        organization: input.company ?? null,
        isOnboarded: false,
      },
      this.hashPassword(input.password),
    );

    return this.issueTokenAndBuildResponse(createdUser);
  }

  async signIn(credentials: SignInDto): Promise<AuthResponse> {
    const user = await this.userService.getUserForAuthByEmail(
      credentials.email,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.passwordHash) {
      throw new UnauthorizedException('This account has no password set');
    }

    if (!this.verifyPassword(credentials.password, user.passwordHash)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.issueTokenAndBuildResponse(user);
  }
}
