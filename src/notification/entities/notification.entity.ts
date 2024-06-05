import { Users_Notifications } from '@prisma/client';

export class NotificationEntity implements Users_Notifications {
  id: string;
  id_users: string;
  sent_date: Date;
  Users: any;
}
