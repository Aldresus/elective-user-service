import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { ObjectId } from 'mongodb';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { ReferUserDto } from './dto/refer-user.dto';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.users.create({
      data: createUserDto,
    });
  }

  findMany(fields: {
    id?: string;
    last_name?: string;
    first_name?: string;
    email?: string;
  }) {
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

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.users.delete({
      where: {
        id,
      },
    });
  }

  updateRefer(id: string, referUserDto: ReferUserDto) {
    return this.prisma.users.update({
      where: {
        id,
      },
      data: {
        id_users: {
          push: referUserDto.id_refer,
        },
      },
    });
  }

  removeRefer(id: string, referUserDto: ReferUserDto) {
    return this.prisma.users
      .findUnique({
        where: {
          id: id,
        },
      })
      .then((user) => {
        if (user) {
          const previousRefers = user.id_users.filter(
            (userId) => userId !== referUserDto.id_refer,
          );
          return this.prisma.users.update({
            where: {
              id,
            },
            data: {
              id_users: previousRefers,
            },
          });
        } else {
          throw new Error('User not found');
        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  updateRole(id: string, updateRoleDto: UpdateRoleDto) {
    return this.prisma.users.update({
      where: { id },
      data: {
        role: {
          update: {
            name: updateRoleDto.name,
          },
        },
      },
    });
  }

  updatePermissions(id: string, updatePermissionsDto: UpdatePermissionsDto) {
    return this.prisma.users.update({
      where: { id },
      data: {
        role: {
          update: {
            permissions: updatePermissionsDto.permissions,
          },
        },
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
