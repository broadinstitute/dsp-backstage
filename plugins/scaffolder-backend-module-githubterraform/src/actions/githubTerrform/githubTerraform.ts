import {
  createTemplateAction,
  TemplateAction,
} from '@backstage/plugin-scaffolder-node';

/**
 * Creates a `dsp:githubTerraform` Scaffolder action.
 *
 * @remarks
 *
 * See {@link https://example.com} for more information.
 *
 * @public
 */
export function createGithubTerraformAction(): TemplateAction<{
  myParameter: string;
}> {
  // For more information on how to define custom actions, see
  //   https://backstage.io/docs/features/software-templates/writing-custom-actions
  return createTemplateAction<{
    myParameter: string;
  }>({
    id: 'dsp:githubTerraform',
    description:
      'Initializes the terraform setup for a new github repository in terraform-ap-deployments',
    schema: {
      input: {
        type: 'object',
        required: ['myParameter'],
        properties: {
          myParameter: {
            title: 'An example parameter',
            description: 'This is the schema for our example parameter',
            type: 'string',
          },
        },
      },
    },
    async handler(ctx) {
      ctx.logger.info(
        `Running example template with parameters: ${ctx.input.myParameter}`,
      );

      await new Promise(resolve => setTimeout(resolve, 1000));
    },
  });
}
