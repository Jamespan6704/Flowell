import { Controller, Get, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PostService } from './PostService';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/feed')
  async getFeed(@Req() req) {
    const userId = req.user.userId;
    const posts = await this.postsService.findForUser(userId);
    return { posts };
  }
}
