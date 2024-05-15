import { scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { createScaffolderFieldExtension } from '@backstage/plugin-scaffolder-react';
import { ValidateRepo, repoValidation } from './ValidateRepoExtension';

export const ValidateRepoExtension = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    name: 'ValidateRepo',
    component: ValidateRepo,
    validation: repoValidation,
  }),
);
