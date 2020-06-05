import warp from '@varld/warp';
import { createConnection, getRepository } from 'typeorm';
import { Post } from './entities/post';
import { User } from './entities/user';
import { PostController } from './controllers/postController';
import { UserController } from './controllers/userController';

let main = async () => {
  let connection = await createConnection({
    type: 'sqlite',
    entities: [
      Post, 
      User
    ],
    synchronize: true,
    database: 'example.db',
  });

  let userRepository = connection.getRepository(User);

  let app = warp({
    controllers: [
      PostController,
      UserController
    ],
    authenticator: async (token) => {
      let user = await userRepository.findOne({
        where: {
          token
        }
      });

      return user;
    } 
  });
  
  app.listen(3000, () => {
    console.log('🔥  Woohoo your API is ready on http://localhost:3000');
  });
};

main().catch(error => console.log(error));
