import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createUser(user: CreateUserDto): Promise<User> {
    const createdUser = this.userRepository.create(user);
    return this.userRepository.save(createdUser);
  }

  createUserWithPassword(
    user: CreateUserDto,
    passwordHash: string,
  ): Promise<User> {
    const createdUser = this.userRepository.create({
      ...user,
      passwordHash,
    });

    return this.userRepository.save(createdUser);
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  getUserForAuthByEmail(email: string): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.email = :email', { email })
      .getOne();
  }

  async updateUser(userId: number, updates: UpdateUserDto): Promise<User> {
    await this.userRepository.update(
      { id: userId },
      updates as DeepPartial<User>,
    );

    return this.userRepository.findOneByOrFail({ id: userId });
  }

  async deleteUser(userId: number): Promise<void> {
    await this.userRepository.delete({ id: userId });
  }
}
