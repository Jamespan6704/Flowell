import {
  Controller,
  Delete,
  Param,
  Req,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PostService } from './PostService';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostService,
    private readonly jwtService: JwtService,
  ) {}

  @Delete(':id')
  async deletePost(@Param('id') id: string, @Req() req) {
    const userId = req.user.userId; // assuming you have middleware to extract user data from JWT
    const post = await this.postsService.findOneById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.userId !== userId) {
      throw new UnauthorizedException(
        'User not authorized to delete this post',
      );
    }
    await this.postsService.delete(id);
  }
}
