import { Injectable, Logger } from '@nestjs/common';
import {Cron, Interval, Timeout} from '@nestjs/schedule';

import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class ScheduleService {
    private readonly logger = new Logger(ScheduleService.name);

    @Timeout(5000)
    async set(createScheduleDto: CreateScheduleDto) {
        this.logger.debug('Scheduler Timeout 5000')
        return createScheduleDto
    }
}
