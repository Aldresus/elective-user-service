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
import { ApiBody, ApiCreatedResponse, ApiQuery } from '@nestjs/swagger';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
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

  @Get(':id')
  @ApiCreatedResponse({ type: UserEntity })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id/Refer/:id_refer')
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBody({ type: UpdateUserDto })
  updateRefer(@Param('id') id: string, @Param('id_refer') id_refer: string) {
    return this.userService.updateRefer(id, id_refer);
  }
  @Patch(':id')
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: string, @Body() updateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  //   @Get(':id')
  //   @ApiCreatedResponse({ type: UserEntity })
  //   findOne(@Param('id') id: string) {
  //     return this.userService.findOne(id);
  //   }

  //   @Get(':id_users')
  //   @ApiCreatedResponse({ type: UserEntity })
  //   findOneByUserId(@Param('id_users') id: string) {
  //     return this.userService.findOne(id);
  //   }

  @Delete(':id')
  @ApiCreatedResponse({ type: UserEntity })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Delete(':id/Refer/:id_refer')
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBody({ type: UpdateUserDto })
  removeRefer(@Param('id') id: string, @Param('id_refer') id_refer: string) {
    return this.userService.removeRefer(id, id_refer);
  }


  @Get("/:id/notifications")
  @ApiCreatedResponse({ type: UserEntity, isArray: true })  
  findUserNotifications(@Param('id') id: string) {
    console.log(id);
    return this.userService.findUserNotifications(id);
  }

  @Post("/:id/notifications")
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBody({ type: CreateNotificationDto })
  createUserNotifications(@Param('id') id: string, @Body() createNotificationDto: CreateNotificationDto) {
    return this.userService.createUserNotifications(id, createNotificationDto);
  }
}
