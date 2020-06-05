import { Service } from '@varld/warp';
import { getRepository, Repository } from 'typeorm';
import { Post } from '../entities/post';

@Service()
export class PostService {
  private postRepository: Repository<Post>;

  constructor() {
    this.postRepository = getRepository(Post);
  }

  async create(text: string) {
    let post = new Post();
    post.likes = 0;
    post.text = text;

    await this.postRepository.save(post);

    return post;
  }

  save(post: Post) {
    return this.postRepository.save(post);
  }

  getPost(id: number) {
    return this.postRepository.findOne(id);
  }

  getPosts() {
    return this.postRepository.find();
  }
}
