export interface User {
  id: number;
  username: string;
  nickname?: string;
  password: string;
  createdAt: Date;
  signAt?: Date;
  monthlyAt?: Date;
  token?: string;
  lastLogin?: Date;
}
