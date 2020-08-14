import {Controller, Get} from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";

import {UserService} from "./user.service";

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {
    }

    @Get('tag-list')
    async tagList() {
        return await this.userService.tagList()
    }
}
