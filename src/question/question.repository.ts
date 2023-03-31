import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './entities/question.entity';
import { QuestionDocument } from './schemas/question.schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Model } from 'mongoose';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const newQuestion = new this.questionModel(createQuestionDto);

    return await newQuestion.save();
  }

  async findAllQuestions(): Promise<Question[]> {
    return await this.questionModel.find();
  }

  async findOneQuestion(id: string): Promise<Question> {
    return await this.questionModel.findOne({ _id: id });
  }

  async updateQuestion(question: UpdateQuestionDto): Promise<Question> {
    return this.questionModel.findOneAndUpdate(
      { _id: question.id },
      {
        tile: question.titile,
        body: question.body,
      },
      { new: true },
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this.questionModel.findByIdAndDelete({ _id: id });
  }

  async save(question: Question): Promise<Question> {
    return await this.questionModel.findByIdAndUpdate(question).exec();
  }

  public async likeQuestion(
    questionId: string,
    userId: string,
  ): Promise<Question> {
    const question = await this.questionModel.findById(questionId);
    if (!question) {
      throw new NotFoundException('Question not found');
    }

    if (question.likes.includes(userId)) {
      throw new BadRequestException('You already liked this question');
    }
    question.likes.push(userId);
    await question.save();

    return question;
  }
  public async unlikeQuestion(
    questionId: string,
    userId: string,
  ): Promise<Question> {
    const question = await this.questionModel.findById(questionId);
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    if (question.likes.includes(null)) {
      throw new BadRequestException('You have not liked this question');
    }
    if (!question.likes.includes(userId)) {
      throw new BadRequestException('You have not liked this question');
    }
    question.likes = question.likes.filter((id) => id !== userId);
    question.likes.pop();
    await question.save();

    return question;
  }
}
