import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [UserModule, NotificationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
