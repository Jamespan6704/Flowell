import { Injectable } from '@nestjs/common';
const bcrypt = require('bcrypt');

interface User {
  id: number;
  email: string;
  password: string;
  username: string;
}

@Injectable()
export class UserService {
  private users: User[] = [];

  async register(
    email: string,
    password: string,
    username: string,
  ): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    this.users.push({
      id: this.users.length + 1,
      email,
      password: hashedPassword,
      username,
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}
