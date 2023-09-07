import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { githubPlaygroundPlugin, GithubPlaygroundPage } from '../src/plugin';

createDevApp()
  .registerPlugin(githubPlaygroundPlugin)
  .addPage({
    element: <GithubPlaygroundPage />,
    title: 'Root Page',
    path: '/github-playground'
  })
  .render();
