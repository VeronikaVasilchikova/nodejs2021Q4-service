import { OmitType } from '@nestjs/swagger';
import { BoardDto } from './board.dto';

export class CreateBoardDto extends OmitType(BoardDto, ['id'] as const) {}
