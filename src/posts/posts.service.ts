import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { and, eq } from 'drizzle-orm';
import { DRIZZLE_DATABASE } from '../drizzle/drizzle.const';
import * as schema from './schema';
import { CreatePostReq } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @Inject(DRIZZLE_DATABASE)
    private readonly drizzle: NodePgDatabase<typeof schema>,
  ) { }

  async getPosts(userId: number) {
    return await this.drizzle.query.posts.findMany({
      where: eq(schema.posts.userId, userId),
    });
  }

  async getPostById(userId: number, postId: number) {
    try {
      return await this.drizzle.query.posts.findFirst({
        where: and(
          eq(schema.posts.userId, userId),
          eq(schema.posts.id, postId),
        ),
      });
    } catch (err) {
      console.log('Error => ', err);
      throw new InternalServerErrorException(
        'Something went wrong, please try again later.',
      );
    }
  }

  async createPost(userId: number, post: CreatePostReq) {
    try {
      const newPost = {
        ...post,
        userId,
      };
      return await this.drizzle
        .insert(schema.posts)
        .values(newPost)
        .returning();
    } catch (err) {
      console.log('Error => ', err);
      throw new InternalServerErrorException(
        'Something went wrong, please try again later.',
      );
    }
  }

  async updatePost(userId: number, postId: number, post: any) {
    try {
      return await this.drizzle
        .update(schema.posts)
        .set(post)
        .where(
          and(eq(schema.posts.userId, userId), eq(schema.posts.id, postId)),
        )
        .returning();
    } catch (err) {
      console.log('Error => ', err);
      throw new InternalServerErrorException(
        'Something went wrong, please try again later.',
      );
    }
  }

  async removePost(userId: number, postId: number) {
    try {
      return await this.drizzle
        .delete(schema.posts)
        .where(
          and(eq(schema.posts.userId, userId), eq(schema.posts.id, postId)),
        );
    } catch (err) {
      console.log('Error => ', err);
      throw new InternalServerErrorException(
        'Something went wrong, please try again later.',
      );
    }
  }
}
