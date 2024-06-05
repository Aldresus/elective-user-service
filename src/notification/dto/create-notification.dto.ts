import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty()
  id_users: string;

  @ApiProperty()
  sent_date: Date;

  @ApiProperty()
  Users: any;
}
