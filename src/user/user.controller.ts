import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { ReferUserDto } from './dto/refer-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';

@Controller('api/user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get users with optional filters' })
  @ApiCreatedResponse({ type: UserEntity, isArray: true })
  @ApiQuery({ name: 'id', required: false, type: String })
  @ApiQuery({ name: 'first_name', required: false, type: String })
  @ApiQuery({ name: 'last_name', required: false, type: String })
  findAll(
    @Query('id') idUser: string,
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
  ) {
    console.log(idUser, firstName, lastName);
    return this.userService.findMany({
      id: idUser,
      first_name: firstName,
      last_name: lastName,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user with ID' })
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: string, @Body() updateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user with ID' })
  @ApiCreatedResponse({ type: UserEntity })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Patch(':id/refer')
  @ApiOperation({ summary: 'Refer user' })
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBody({ type: ReferUserDto })
  updateRefer(@Param('id') id: string, @Body() referUserDto: ReferUserDto) {
    return this.userService.updateRefer(id, referUserDto);
  }

  @Delete(':id/refer')
  @ApiOperation({ summary: 'Delete user refer' })
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBody({ type: ReferUserDto })
  removeRefer(@Param('id') id: string, @Body() referUserDto: ReferUserDto) {
    return this.userService.removeRefer(id, referUserDto);
  }

  @Patch(':id/role')
  @ApiOperation({ summary: 'Update user role' })
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBody({ type: UpdateRoleDto })
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.userService.updateRole(id, updateRoleDto);
  }

  @Patch(':id/permissions')
  @ApiOperation({ summary: 'Update user permissions' })
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBody({ type: UpdatePermissionsDto })
  updatePermissions(
    @Param('id') id: string,
    @Body() updatePermissionsDto: UpdatePermissionsDto,
  ) {
    return this.userService.updatePermissions(id, updatePermissionsDto);
  }

  @Post('/:id/notifications')
  @ApiOperation({ summary: 'Create a notification' })
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBody({ type: CreateNotificationDto })
  createUserNotifications(
    @Param('id') id: string,
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    return this.userService.createUserNotifications(id, createNotificationDto);
  }

  @Get('/:id/notifications')
  @ApiOperation({ summary: 'Get notifications with user ID' })
  @ApiCreatedResponse({ type: UserEntity, isArray: true })
  findUserNotifications(@Param('id') id: string) {
    console.log(id);
    return this.userService.findUserNotifications(id);
  }
}
