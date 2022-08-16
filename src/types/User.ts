import { IContact } from './Contact';

export interface IUser {
  email: string;
  password: string;
  contacts?: IContact[];
}
