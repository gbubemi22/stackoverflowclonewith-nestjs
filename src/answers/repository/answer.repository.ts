import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer, AnswerDocument } from '../schema/answer.schema';

import { CreateAnswerDto } from '../dto/create-answer.dto';
import { UpdateAnswerDto } from '../dto/update-answer.dto';
import { Question } from 'src/question/schemas/question.schema';

@Injectable()
export class AnswerRepository {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
  ) {}

  async CreateAnswer(CreateAnswerDto: CreateAnswerDto): Promise<Answer> {
    const Answer = new this.answerModel(CreateAnswerDto);

    return await Answer.save();
  }

  async findOneAnswer(id: string): Promise<Answer> {
    return await this.answerModel.findOne({ id });
  }

  async findAllQuestion(): Promise<Answer[]> {
    return await this.answerModel.find({});
  }

  async update(id: string, answer: UpdateAnswerDto): Promise<Answer> {
    return this.answerModel.findByIdAndUpdate(id, answer, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string): Promise<boolean> {
    return await this.answerModel.findByIdAndDelete({ _id: id });
  }

  async save(answer: Answer): Promise<Answer> {
    return await this.answerModel.findByIdAndUpdate(answer).exec();
  }

  async likeAnswer(answerId: string, userId: string): Promise<Answer> {
    const answer = await this.answerModel.findById(answerId);
    if (!answer) {
      throw new NotFoundException('Answer not found');
    }

    if (answer.likes.includes(userId))
      throw new BadRequestException('You already like this Question');

    answer.likes.push(userId);
    await answer.save();

    return answer;
  }

  async unlikeAnswer(answerId: string, userId: string): Promise<Answer> {
    const answer = await this.answerModel.findById(answerId);
    if (!answer) {
      throw new NotFoundException('Answer not found');
    }
    if (answer.likes.includes(null)) {
      throw new BadRequestException('You have not liked this answer');
    }
    if (!answer.likes.includes(userId)) {
      throw new BadRequestException('You have not liked this question');
    }
    answer.likes = answer.likes.filter((id) => id !== userId);
    answer.likes.pop();
    await answer.save();

    return answer;
  }
}
