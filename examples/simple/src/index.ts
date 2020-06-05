import warp from '@varld/warp';
import { GreetingController } from './controllers/greetingController';

let app = warp({
  controllers: [
    GreetingController
  ]
});

app.listen(3000, () => {
  console.log('🔥  Woohoo your API is ready on http://localhost:3000');
});
