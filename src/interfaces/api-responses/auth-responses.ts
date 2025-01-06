import {User} from '../entities/user/user.interface';

export interface ILoginResponse {
  accessToken: string;
  user: User;
}
