import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map((u) => new UserEntity(u));
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return new UserEntity(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.findOne(id);
    const user = await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
    return new UserEntity(user);
  }

  async remove(id: number): Promise<UserEntity> {
    await this.findOne(id);
    const user = await this.prisma.user.delete({ where: { id } });
    return new UserEntity(user);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return new UserEntity(user);
  }
}
