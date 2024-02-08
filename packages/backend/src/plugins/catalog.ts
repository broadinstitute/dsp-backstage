import { CatalogBuilder, CodeOwnersProcessor } from '@backstage/plugin-catalog-backend';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-scaffolder-backend';
import {
  GithubEntityProvider,
  GithubOrgEntityProvider,
} from '@backstage/plugin-catalog-backend-module-github';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const builder = await CatalogBuilder.create(env);
  builder.addEntityProvider(
    GithubEntityProvider.fromConfig(env.config, {
      logger: env.logger,
      schedule: env.scheduler.createScheduledTaskRunner({
        frequency: { hours: 6 },
        timeout: { minutes: 3 },
        initialDelay: { minutes: 1 },
      }),
      scheduler: env.scheduler,
    }),
  );
  builder.addEntityProvider(
    GithubOrgEntityProvider.fromConfig(env.config, {
      logger: env.logger,
      id: 'databiosphereOrgProvider',
      orgUrl: 'https://github.com/DataBiosphere',
      schedule: env.scheduler.createScheduledTaskRunner({
        frequency: { hours: 6 },
        timeout: { minutes: 3 },
        initialDelay: { minutes: 5 },
      }),
    }),
    GithubOrgEntityProvider.fromConfig(env.config, {
      logger: env.logger,
      id: 'broadinstituteOrgProvider',
      orgUrl: 'https://github.com/broadinstitute',
      schedule: env.scheduler.createScheduledTaskRunner({
        frequency: { hours: 6 },
        timeout: { minutes: 3 },
        initialDelay: { minutes: 5 },
      }),
    }),
  );
  builder.addProcessor(new ScaffolderEntitiesProcessor());
  builder.addProcessor(CodeOwnersProcessor.fromConfig(env.config, {
    logger: env.logger,
    reader: env.reader,
  }));
  const { processingEngine, router } = await builder.build();
  await processingEngine.start();
  return router;
}
