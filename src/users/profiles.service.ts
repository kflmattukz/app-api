import {
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE_DATABASE } from '../drizzle/drizzle.const';
import * as schema from './schema';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class ProfilesService {
  constructor(
    @Inject(DRIZZLE_DATABASE)
    private readonly drizzle: NodePgDatabase<typeof schema>,
  ) {}

  async getProfile(userId: number) {
    const isExist = await this.isProfileExist(userId);
    if (!isExist) {
      throw new NotFoundException();
    }
    try {
      const data = await this.drizzle.query.profiles.findFirst({
        where: eq(schema.profiles.userId, userId),
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'SUCCESS',
        data,
      };
    } catch (err) {
      console.log('Error => ', err);
      throw new InternalServerErrorException(
        'Something went wrong, please try again later.',
      );
    }
  }

  async createProfile(
    userId: number,
    profile: typeof schema.profiles.$inferInsert,
  ) {
    const isExist = await this.isProfileExist(userId);
    if (isExist) {
      throw new ConflictException();
    }

    try {
      const userProfile = {
        ...profile,
        userId,
      };
      const user_id: { userId: number }[] = await this.drizzle
        .insert(schema.profiles)
        .values(userProfile)
        .returning({
          userId: schema.profiles.userId,
        });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'SUCCESS',
        data: {
          user_id,
        },
      };
    } catch (err) {
      console.log('Error => ', err);
      throw new InternalServerErrorException(
        'Something went wrong, please try again later.',
      );
    }
  }

  async updateProfile(
    userId: number,
    profile: Partial<typeof schema.profiles.$inferInsert>,
  ) {
    const isExist = await this.isProfileExist(userId);
    if (!isExist) {
      throw new NotFoundException();
    }
    try {
      const user_id: { userId: number }[] = await this.drizzle
        .update(schema.profiles)
        .set(profile)
        .where(eq(schema.profiles.userId, userId))
        .returning({
          userId: schema.profiles.userId,
        });

      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'SUCCESS',
        data: {
          user_id,
        },
      };
    } catch (err) {
      console.log('Error => ', err);
      throw new InternalServerErrorException(
        'Something went wrong, please try again later.',
      );
    }
  }

  private async isProfileExist(userId: number): Promise<boolean> {
    const { rows } = await this.drizzle.execute(sql`
    SELECT EXISTS (SELECT 1 FROM ${schema.profiles} where ${schema.profiles.userId} = ${userId}) as is_exist  
    `);

    return rows[0].is_exist as boolean;
  }
}

