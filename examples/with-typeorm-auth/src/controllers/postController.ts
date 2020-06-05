import { Controller, Get, Param, Post, Body, Authenticated } from '@varld/warp';
import { IsString, Length } from 'class-validator';
import { PostService } from '../services/postService';

class CreatePostDTO {
  @IsString()
  @Length(2, 250)
  text: string;
}

@Controller('/post')
export class PostController {
  constructor(
    private postService: PostService
  ) {}

  @Get('/')
  async getAllPosts() {
    let posts = await this.postService.getPosts();

    return {
      posts
    };
  }

  @Get('/:postId')
  async getPostById(@Param('postId') postId: string) {
    let postIdNumber = Number.parseInt(postId);
    let post = await this.postService.getPost(postIdNumber);

    return {
      post
    };
  }

  @Post('/')
  @Authenticated()
  async createPost(@Body() body: CreatePostDTO) {
    let post = await this.postService.create(body.text);

    return {
      post
    };
  }

  @Post('/:postId/like')
  @Authenticated()
  async likePost(@Param('postId') postId: string) {
    let postIdNumber = Number.parseInt(postId);
    let post = await this.postService.getPost(postIdNumber);

    post.likes++;

    post = await this.postService.save(post);

    return {
      post
    };
  }
}
