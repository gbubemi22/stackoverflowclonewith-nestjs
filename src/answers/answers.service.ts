import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AnswerRepository } from './repository/answer.repository';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswersService {
  constructor(private answerRepository: AnswerRepository) {}
  async create(createAnswerDto: CreateAnswerDto) {
    return await this.answerRepository.CreateAnswer(createAnswerDto);
  }

  async findAll() {
    return await this.answerRepository.findAllQuestion();
  }

  findOne(id: string): Promise<Answer> {
    const answer = this.answerRepository.findOneAnswer(id);
    if (!answer) {
      throw new HttpException('No Answer Found', HttpStatus.NOT_FOUND);
    }
    return answer;
  }

  async update(id: string, answer: UpdateAnswerDto): Promise<Answer> {
    return await this.answerRepository.update(id, answer);
  }

  async remove(id: string): Promise<Answer> {
    return await this.answerRepository.delete(id);
  }
}
