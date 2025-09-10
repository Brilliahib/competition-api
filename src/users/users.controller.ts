import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'generated/prisma';

@Controller('users')
@ApiTags('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  @ApiOkResponse({
    description: 'List of users retrieved successfully.',
    type: [UserEntity],
  })
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      data: users,
      message: 'Users retrieved successfully',
    };
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The user has been successfully retrieved.',
    type: UserEntity,
  })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    return {
      data: user,
      message: 'User retrieved successfully',
    };
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The user has been successfully updated.',
    type: UserEntity,
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(+id, updateUserDto);
    return {
      data: user,
      message: 'User updated successfully',
    };
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOkResponse({
    description: 'The user has been successfully deleted.',
    type: UserEntity,
  })
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(+id);
    return {
      data: user,
      message: 'User deleted successfully',
    };
  }
}
