import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly usersMerchants = [
    {
      userMerchantId: 1,
      username: 'RoblesVegaSAC',
      password: 'password',
    }
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.usersMerchants.find(user => user.username === username);
  }

}
