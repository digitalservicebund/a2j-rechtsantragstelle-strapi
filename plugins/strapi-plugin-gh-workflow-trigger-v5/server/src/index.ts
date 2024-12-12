import { config } from './config';
import { githubController } from './controller';

export default {
  /** Application methods if needed */
  // register, bootstrap, destroy,

  /** Plugin server methods */
  config,
  controllers: { githubController },
  routes: {
    routes: {
      type: 'admin',
      routes: [
        {
          method: 'GET',
          path: '/listWorkflows',
          handler: 'githubController.listWorkflows',
        },
        {
          method: 'POST',
          path: '/trigger',
          handler: 'githubController.trigger',
        },
        {
          method: 'POST',
          path: '/cancel',
          handler: 'githubController.cancel',
        },
      ],
    },
  },
  // services, contentTypes, policies, middlewares,
};
