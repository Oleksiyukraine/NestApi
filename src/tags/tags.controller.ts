import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TagsService } from './tags.service';
import { ITags } from "./interfaces/tags.interface";

@ApiTags('tags')
@Controller('tags')
export class TagsController {
}
