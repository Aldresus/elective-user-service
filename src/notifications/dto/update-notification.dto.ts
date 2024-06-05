import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-notification.dto';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @ApiProperty({ required: false })
  content: string;

  @ApiProperty({ required: false })
  type: string;

  @ApiProperty({ required: false })
  sent_date: Date;

  @ApiProperty({ required: false })
  usersId: string;
}
