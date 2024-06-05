import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    console.log(createNotificationDto);
    return this.prisma.users_Notifications.create({
      data: createNotificationDto,
    });
  }

  findAll() {
    return this.prisma.users_Notifications.findMany();
  }

  findOne(id: string) {
    return this.prisma.users_Notifications.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateNotificationDto: UpdateNotificationDto) {
    return this.prisma.users_Notifications.update({
      where: {
        id,
      },
      data: updateNotificationDto,
    });
  }

  remove(id: string) {
    return this.prisma.users_Notifications.delete({
      where: {
        id,
      },
    });
  }
}
