import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schema/user.schema';

export type QuestionDocument = Question & mongoose.Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Question {
  @Prop({
    type: String,
    required: true,
    minlength: [3, 'Title must be at leaste 3 characters'],
  })
  title: string;

  @Prop({
    type: String,

    required: [true, 'Body must be included'],
  })
  body: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  likes: string[];

  // @Prop({
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Answer',
  // })
  // answers: Answer;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    user: 'User',
  })
  user: User;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
