import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import base64url from 'base64url';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}


    @Post('login')
    async addFreelance(
        @Body('email') email: string,
        @Body('password') password: string
    ) {
        
        if (email !== 'etiqa@testing.com' && password !== 'iloveetiqa') {
            throw new UnauthorizedException();
        }

        console.log('hit')

        const token = await base64url(email);

        return {token: token};
    }
}