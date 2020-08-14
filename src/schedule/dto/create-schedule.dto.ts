import { IsNotEmpty } from "class-validator";

export class CreateScheduleDto {
    @IsNotEmpty()
    readonly interval: string
}