import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { ObjectId } from 'mongodb';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    // Validate id_users to ensure they are ObjectIDs or empty
    const validIdUsers =
      createUserDto.id_users?.filter((id) => ObjectId.isValid(id)) || [];

    // Check if each ID exists in the Users collection
    const existingUsers = await this.prisma.users.findMany({
      where: {
        id: { in: validIdUsers },
      },
      select: { id: true },
    });

    // Extract existing IDs from the result
    const existingIds = existingUsers.map((user) => user.id);

    // Filter out non-existing IDs
    const filteredIdUsers = validIdUsers.filter((id) =>
      existingIds.includes(id),
    );

    // Create user with validated and existing id_users
    return this.prisma.users.create({
      data: {
        ...createUserDto,
        id_users: filteredIdUsers,
        notifications: [],
      },
    });
  }

  findOne(id: string) {
    return this.prisma.users.findUnique({
      where: {
        id,
      },
    });
  }

  findMany(fields: {
    id?: string;
    last_name?: string;
    first_name?: string;
    email?: string;
  }) {
    console.log(fields);

    return this.prisma.users.findMany({
      where: {
        AND: [
          {
            id: fields.id === '' ? undefined : fields.id,
          },
          {
            last_name: fields.last_name === '' ? undefined : fields.last_name,
          },
          {
            first_name:
              fields.first_name === '' ? undefined : fields.first_name,
          },
          {
            email: fields.email === '' ? undefined : fields.email,
          },
        ],
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log(id, updateUserDto);

    return this.prisma.users.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  async updateRefer(id: string, id2: string) {
    console.log(id, id2);

    return this.prisma.users.update({
      where: {
        id,
      },
      data: {
        id_users: {
          push: id2,
        },
      },
    });
  }

  async removeRefer(id: string, id2: string) {
    console.log(id, id2);

    const previousRefers = this.prisma.users
      .findUnique({
        where: {
          id: id,
        },
      })
      .then((user) => user.id_users.filter((id) => id !== id2));

    return this.prisma.users.update({
      where: {
        id,
      },
      data: {
        id_users: await previousRefers,
      },
    });
  }

  remove(id: string) {
    return this.prisma.users.delete({
      where: {
        id,
      },
    });
  }

  findUserNotifications(id: string) {
    return this.prisma.users.findUnique({
      select: {
        notifications: true,
      },
      where: {
        id,
      },
    });
  }

  createUserNotifications(
    id: string,
    createNotifications: CreateNotificationDto,
  ) {
    return this.prisma.users.update({
      where: {
        id,
      },
      data: {
        notifications: {
          push: {
            ...createNotifications,
            sent_date: new Date(),
            id: new ObjectId().toHexString(),
          },
        },
      },
    });
  }
}
