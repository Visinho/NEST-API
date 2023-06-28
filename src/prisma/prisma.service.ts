import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient{
    [x: string]: any;
    constructor(){
        super({
            datasources: {
                db: {
                    url: "postgresql://postgres:123@localhost:5434/nest-project?schema=public"
                }
            }
        })
    }
}
