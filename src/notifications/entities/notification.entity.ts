import { ApiProperty } from '@nestjs/swagger';
import type { Users_Notifications } from '@prisma/client';

export class NotificationEntity implements Users_Notifications {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  sent_date: Date;

  @ApiProperty()
  usersId: string;
}
