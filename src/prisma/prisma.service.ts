import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient{
    [x: string]: any;
    constructor(){
        super({
            datasources: {
                db: {
                    url: "postgresql://username:password@localhost:5432/A-Nest?schema=public"
                }
            }
        })
    }
}
