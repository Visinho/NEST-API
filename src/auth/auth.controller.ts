import { Controller, Body, Post, Req, UseGuards, HttpStatus, HttpCode} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { JwtStrategy } from "./strategy";

@Controller("auth")
export class AuthController{
    constructor(private authService: AuthService){}

    @Post("signup")
    signup(@Body() dto: AuthDto){
        return this.authService.signup(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post("signin")
    @UseGuards(JwtStrategy)
    signin(@Body() dto: AuthDto){
        return this.authService.signin(dto);
    }
}