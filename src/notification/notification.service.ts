import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  create(createNotificationDto: CreateNotificationDto) {
    console.log(createNotificationDto);
    return this.prisma.notifications.create({
      data: createNotificationDto,
    });
  }

  findAll() {
    return this.prisma.notifications.findMany();
  }

  findOne(id: number) {
    return this.prisma.notifications.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return this.prisma.notifications.update({
      where: {
        id,
      },
      data: updateNotificationDto,
    });
  }

  remove(id: number) {
    return this.prisma.notifications.delete({
      where: {
        id,
      },
    });
  }
}
