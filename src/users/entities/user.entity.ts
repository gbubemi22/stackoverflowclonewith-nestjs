import { Document } from 'mongoose';

export class IsUser extends Document {
  readonly email: string;
  readonly password: string;
  readonly username: string;
  readonly role: boolean;
  readonly image: string;
}
