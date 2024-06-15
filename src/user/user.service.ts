import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { ObjectId } from 'mongodb';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { ReferUserDto } from './dto/refer-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = (
      await this.prisma.users.findMany({ where: { email: username } })
    )[0];

    const salt = this.configService.get<string>('PASSWORD_SALT');

    pass = crypto.createHmac('sha256', salt).update(pass).digest('hex');

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.email,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const salt = this.configService.get<string>('PASSWORD_SALT');

    createUserDto.password = crypto
      .createHmac('sha256', salt)
      .update(createUserDto.password)
      .digest('hex');

    return this.prisma.users.create({ data: createUserDto });
  }

  findMany(fields: {
    id?: string;
    last_name?: string;
    first_name?: string;
    email?: string;
    role?: string;
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
          {
            role: fields.role === '' ? undefined : fields.role,
          },
        ],
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const salt = this.configService.get<string>('PASSWORD_SALT');

    updateUserDto.password = crypto
      .createHmac('sha256', salt)
      .update(updateUserDto.password)
      .digest('hex');

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
