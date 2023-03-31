import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Answer } from './entities/answer.entity';
import { AnswerSchema } from './schema/answer.schema';
import { AnswerRepository } from './repository/answer.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
  ],
  controllers: [AnswersController],
  providers: [AnswersService, AnswerRepository],
})
export class AnswersModule {}
