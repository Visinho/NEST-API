import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {
    @UseGuards(AuthGuard("jwt"))
    @Get("me")
    getMe(@Req() req: Request) {
        // Access the authenticated user's data from req.user
        console.log({
            user: req.user,
        })
            
        
        // Return the user information
        return "user info"
    }
}





