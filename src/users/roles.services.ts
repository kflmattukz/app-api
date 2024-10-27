import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, sql } from 'drizzle-orm';
import { DRIZZLE_DATABASE } from 'src/drizzle/drizzle.const';
import { CreateRoleRes } from './dto/create-role.dto';
import { UpdateRoleRes } from './dto/update-role.dto';
import * as schema from './schema';

@Injectable()
export class RolesService {
  constructor(
    @Inject(DRIZZLE_DATABASE)
    private readonly drizzle: NodePgDatabase<typeof schema>,
  ) { }

  async getRoles() {
    return await this.drizzle.query.roles.findMany();
  }

  async creatRole(
    role: typeof schema.roles.$inferInsert,
  ): Promise<CreateRoleRes[]> {
    return await this.drizzle.insert(schema.roles).values(role).returning({
      id: schema.roles.id,
      role_name: schema.roles.roleName,
      created_at: schema.roles.createdAt,
    });
  }

  async updateRole(
    roleId: number,
    role: typeof schema.roles.$inferInsert,
  ): Promise<UpdateRoleRes[]> {
    return await this.drizzle
      .update(schema.roles)
      .set(role)
      .where(eq(schema.roles.id, roleId))
      .returning({
        id: schema.roles.id,
        role_name: schema.roles.roleName,
        created_at: schema.roles.createdAt,
      });
  }

  async removeRole(roleId: number) {
    return await this.drizzle
      .delete(schema.roles)
      .where(eq(schema.roles.id, roleId))
      .returning({
        id: schema.roles.id,
        role_name: schema.roles.roleName,
      });
  }

  async isExist(
    table: any,
    field: string,
    value: number | string,
  ): Promise<boolean> {
    const { rows } = await this.drizzle.execute(sql`
    select exists (select 1 from ${table} where ${table[field]} = ${value}) as is_exist
    `);

    return rows[0].is_exist as boolean;
  }
}
