import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../user.enum';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
  })
  username: string;

  @Prop({
    type: String,
    unique: true,
    required: [true, 'Please provide email'],
  })
  email: string;

  @Prop({
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  })
  password: string;

  @Prop({
    type: String,
  })
  image: string;
  @Prop({})
  role: Role;
  @Prop({
    type: Boolean,
    default: false,
  })
  blocked = false;
}

export const UserSchema = SchemaFactory.createForClass(User);
