import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
    constructor(private httpService: HttpService) { }
    async findAll(): Promise<any> {
        const response = await this.httpService.get('http://jsonplaceholder.typicode.com/todos').toPromise();
        return response.data
    }
}
