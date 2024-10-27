import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtTokenType } from '../type/jwt.type';
import { CurrentUser } from '../decorator/current-user.decorator';
import { CreatePostReq } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(@CurrentUser() user: JwtTokenType) {
    return await this.postsService.getPosts(user.sub);
  }

  @Get(':id')
  async getPostById(
    @CurrentUser() user: JwtTokenType,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    return await this.postsService.getPostById(user.sub, postId);
  }

  @Post()
  async createPost(
    @CurrentUser() user: JwtTokenType,
    @Body() post: CreatePostReq,
  ) {
    return await this.postsService.createPost(user.sub, post);
  }

  @Patch(':id')
  async updatePost(
    @CurrentUser() user: JwtTokenType,
    @Param('id', ParseIntPipe) postId: number,
    @Body() post: any,
  ) {
    return await this.postsService.updatePost(user.sub, postId, post);
  }

  @Delete(':id')
  async removePost(
    @CurrentUser() user: JwtTokenType,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    return await this.postsService.removePost(user.sub, postId);
  }
}
