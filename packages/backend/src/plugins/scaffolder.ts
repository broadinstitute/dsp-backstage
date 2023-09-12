import { CatalogClient } from '@backstage/catalog-client';
import {
  createBuiltinActions,
  createRouter,
} from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import { ScmIntegrations } from '@backstage/integration';
import type { PluginEnvironment } from '../types';
import { createGithubTerraformAction } from '../../../../plugins/scaffolder-backend-module-githubterraform/src';
import { createWriteFileAction, createYamlJSONataTransformAction } from '@roadiehq/scaffolder-backend-module-utils'

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const catalogClient = new CatalogClient({
    discoveryApi: env.discovery,
  });
  const integrations = ScmIntegrations.fromConfig(env.config);
  const builtinActions = createBuiltinActions({
    integrations,
    catalogClient,
    config: env.config,
    reader: env.reader,
  });

  const actions = [
    ...builtinActions,
    createGithubTerraformAction(),
    createYamlJSONataTransformAction(),
    createWriteFileAction(),
  ];

  return await createRouter({
    actions,
    logger: env.logger,
    config: env.config,
    database: env.database,
    reader: env.reader,
    catalogClient,
    identity: env.identity,
    permissions: env.permissions,
  });
}
