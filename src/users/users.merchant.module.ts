import { Module } from '@nestjs/common';
import { UsersService } from './users.merchant.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
