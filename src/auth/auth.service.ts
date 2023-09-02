import { IsEmail } from 'class-validator';
import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // saving the user to the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
        // select: {
        //   id: true,
        //   email: true,
        //   createdAt: true
        // } This would display only the fields that you want to be displayed
      });
      delete user.hash; // To remove any field that should not be returned (Hash)
      return user;
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // Find user by unique property
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    // Check if user exists
    if (!user)
      throw new ForbiddenException(
        'User does not exist',
      );
    // Comparing passwords
    const passwordMatch = await argon.verify(
      user.hash,
      dto.password,
    );
    //if passwords do not match
    if(!passwordMatch) throw new ForbiddenException("Passwords do not match!");
    // user response
    delete user.hash;
    return user;
  }

}
