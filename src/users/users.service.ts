import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE_DATABASE } from 'src/drizzle/drizzle.const';
import * as schema from './schema';
import { eq, or, sql } from 'drizzle-orm';
import { CreateUserRes } from './dto/create-user.dto';
import { UpdateUserRes } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE_DATABASE)
    private readonly drizzle: NodePgDatabase<typeof schema>,
  ) {}

  async getUsers() {
    return await this.drizzle.query.users.findMany();
  }

  async getUser(searchValue: string | number) {
    if (typeof searchValue === 'string') {
      return await this.drizzle.query.users.findFirst({
        where: or(
          eq(schema.users.username, searchValue),
          eq(schema.users.email, searchValue),
        ),
      });
    } else {
      return await this.drizzle.query.users.findFirst({
        where: eq(schema.users.id, searchValue),
      });
    }
  }

  async createUser(
    user: typeof schema.users.$inferInsert,
  ): Promise<CreateUserRes[]> {
    try {
      return await this.drizzle.insert(schema.users).values(user).returning({
        id: schema.users.id,
        username: schema.users.username,
        email: schema.users.email,
      });
    } catch (err) {
      console.error('Error => ', err);
      throw new InternalServerErrorException(
        'Something went wrong, please try again later.',
      );
    }
  }

  async updateUser(
    id: number,
    user: Partial<typeof schema.users.$inferInsert>,
  ): Promise<UpdateUserRes[]> {
    const isExist = await this.isUserExist(id);
    if (!isExist) {
      throw new NotFoundException(`User with id: ${id} not found.`);
    }
    try {
      return await this.drizzle.update(schema.users).set(user).returning({
        id: schema.users.id,
        username: schema.users.username,
        email: schema.users.email,
      });
    } catch (err) {
      console.error('Error => ', err);
      throw new InternalServerErrorException(
        'Something went wrlong, please try again later.',
      );
    }
  }

  async remdoveUser(id: number) {
    const isExist = await this.isUserExist(id);
    if (!isExist) {
      throw new NotFoundException(`User with id: ${id} not found.`);
    }

    try {
      return await this.drizzle
        .delete(schema.users)
        .where(eq(schema.users.id, id))
        .returning({
          id: schema.users.id,
        });
    } catch (err) {
      console.error('Error => ', err);
      throw new InternalServerErrorException(
        'Something went wrong, please try again later.',
      );
    }
  }

  private async isUserExist(id: number): Promise<boolean> {
    const { rows } = await this.drizzle.execute(
      sql`SELECT EXISTS (SELECT 1 FROM ${schema.users} WHERE ${schema.users.id} = ${id}) as is_exist`,
    );
    return rows[0].is_exist as boolean;
  }
}
