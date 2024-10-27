import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { DRIZZLE_DATABASE } from './drizzle.const';
import * as usersSchema from '../users/schema';
import * as postsSchema from '../posts/schema';

@Module({
  providers: [
    {
      provide: DRIZZLE_DATABASE,
      useFactory: (config: ConfigService) => {
        const pool = new Pool({
          connectionString: config.getOrThrow('DATABASE_URL'),
        });
        return drizzle(pool, {
          schema: {
            ...usersSchema,
            ...postsSchema,
          },
        });
      },
      inject: [ConfigService],
    },
  ],

  exports: [DRIZZLE_DATABASE],
})
export class DrizzleModule {}
