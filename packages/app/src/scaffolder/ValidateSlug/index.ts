import { scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { createScaffolderFieldExtension } from '@backstage/plugin-scaffolder-react';
import { ValidateSlug, slugValidation } from './ValidateSlugExtension';

export const ValidateSlugExtension = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    name: 'ValidateSlug',
    component: ValidateSlug,
    validation: slugValidation,
  }),
);
