import { Injectable } from '@nestjs/common';

interface Post {
  id: number;
  title: string;
  text: string;
  userId: number;
}

@Injectable()
export class PostService {
  private posts: Post[] = [];

  async create(userId: number, title: string, text: string): Promise<void> {
    this.posts.push({
      id: this.posts.length + 1,
      userId,
      title,
      text,
    });
  }

  async delete(id: number, userId: number): Promise<void> {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    const post = this.posts[postIndex];
    if (post.userId !== userId) {
      throw new UnauthorizedException(
        'You do not have permission to delete this post',
      );
    }
    this.posts.splice(postIndex, 1);
  }

  async findByUserId(userId: number): Promise<Post[]> {
    return this.posts.filter((post) => post.userId === userId);
  }

  async findAll(): Promise<Post[]> {
    return this.posts;
  }
}
