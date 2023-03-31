import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Question } from 'src/question/schemas/question.schema';
import { User } from 'src/users/schema/user.schema';

export type AnswerDocument = Answer & mongoose.Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Answer {
  @Prop({
    type: String,
    required: [true, 'provied a content'],
  })
  body: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  likes: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    user: 'User',
  })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    user: 'User',
  })
  question: Question;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
