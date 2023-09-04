import { ConfigService } from '@nestjs/config/dist';
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get("JWT_SECRET"),
        })
    }

    validate(payload: any) {
        console.log({
            payload,
        });

        return payload;
    }
}