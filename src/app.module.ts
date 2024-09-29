import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './drizzle/drizzle.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, DrizzleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
