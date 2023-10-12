import { SoundcheckBuilder } from '@spotify/backstage-plugin-soundcheck-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return SoundcheckBuilder.create({ ...env })
    .addFactCollectors()
    .build();
}
