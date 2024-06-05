import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-notification.dto';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @ApiProperty({ required: false })
  id: string;

  @ApiProperty({ required: false })
  id_users: string;

  @ApiProperty({ required: false })
  sent_date: Date;

  @ApiProperty({ required: false })
  Users: any;
}
