import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const githubPlaygroundPlugin = createPlugin({
  id: 'github-playground',
  routes: {
    root: rootRouteRef,
  },
});

export const GithubPlaygroundPage = githubPlaygroundPlugin.provide(
  createRoutableExtension({
    name: 'GithubPlaygroundPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
