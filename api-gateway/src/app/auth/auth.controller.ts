import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() req) {
        // Mock user for demonstration. In real world, this comes from a DB.
        const user = { username: req.username || 'testuser', userId: '123' };
        return this.authService.login(user);
    }
}