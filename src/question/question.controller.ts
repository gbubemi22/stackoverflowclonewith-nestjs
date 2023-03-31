import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Put,
  InternalServerErrorException,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.questionService.findOneById(id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }
  @Post(':id/like')
  @HttpCode(200)
  async likeQestion(@Param('id') id: string, @Body('userId') userId: string) {
    await this.questionService.addLikes(id, userId);

    return 'Qestion has been liked successfully';
  }

  @Post(':id/unlike')
  @HttpCode(200)
  async unlike(@Param('id') id: string, @Body('userId') userId: string) {
    await this.questionService.dislikes(id, userId);

    return 'You unlike a question';
  }
}
