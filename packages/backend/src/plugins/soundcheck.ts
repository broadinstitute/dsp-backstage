import { SoundcheckBuilder } from '@spotify/backstage-plugin-soundcheck-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { GithubFactCollector } from '@spotify/backstage-plugin-soundcheck-backend-module-github'

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return SoundcheckBuilder.create({ ...env })
    .addFactCollectors(
      GithubFactCollector.create(env.config, env.logger, env.cache)
    )
    .build();
}
