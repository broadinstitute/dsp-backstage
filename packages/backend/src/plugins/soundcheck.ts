import { SoundcheckBuilder } from '@spotify/backstage-plugin-soundcheck-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { GithubFactCollector } from '@spotify/backstage-plugin-soundcheck-backend-module-github';
import { ScmFactCollector } from '@spotify/backstage-plugin-soundcheck-backend-module-scm';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return SoundcheckBuilder.create({ ...env })
    .addFactCollectors(
      GithubFactCollector.create(env.config, env.logger, env.cache),
      ScmFactCollector.create(env.config, env.logger),
    )
    .build();
}
