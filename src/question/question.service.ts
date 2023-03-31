import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionRepository } from './question.repository';
import { Question } from './schemas/question.schema';

@Injectable()
export class QuestionService {
  constructor(private qestionRepo: QuestionRepository) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<any> {
    return await this.qestionRepo.create(createQuestionDto);
  }

  async findAll() {
    return await this.qestionRepo.findAllQuestions();
  }

  async findOneById(id: string): Promise<any> {
    const question = this.qestionRepo.findOneQuestion(id);

    if (!question) {
      throw new HttpException('No Question Found', HttpStatus.NOT_FOUND);
    }
    return question;
  }

  update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<any> {
    return this.qestionRepo.updateQuestion(updateQuestionDto);
  }

  async remove(id: string): Promise<boolean> {
    const x = await this.qestionRepo.delete(id);
    console.log(x);
    return x;
  }

  async addLikes(questionId: string, userId: string): Promise<any> {
    return await this.qestionRepo.likeQuestion(questionId, userId);
  }

  async dislikes(questionId: string, userId: string): Promise<any> {
    return this.qestionRepo.unlikeQuestion(questionId, userId);
  }
}
