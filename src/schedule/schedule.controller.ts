import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags} from '@nestjs/swagger';

import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@ApiTags('scheduler')
@Controller('schedule')
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) { }

    @Post('/set')
    async setSchedule(@Body(new ValidationPipe()) createScheduleDto: CreateScheduleDto): Promise<CreateScheduleDto> {
        return await this.scheduleService.set(createScheduleDto)
    }
}
