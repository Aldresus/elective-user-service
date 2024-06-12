import { ApiProperty } from '@nestjs/swagger';
import type { Users, Notifications, Role } from '@prisma/client';

export class UserEntity implements Users {
  @ApiProperty()
  id: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  postal_code: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  created_at: Date;
  edited_at: Date;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  password: string;

  @ApiProperty()
  id_restaurant: string;

  @ApiProperty()
  id_users: Array<string>;

  @ApiProperty()
  notifications: Array<Notifications>;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
