import { Service } from '@varld/warp';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/user';

@Service()
export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  async create(name: string) {
    let user = new User();
    user.name = name;
    user.token = Math.random().toString(36).substring(2);

    await this.userRepository.save(user);

    return user;
  }
}
