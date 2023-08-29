import { z } from "zod";
import { makeFieldSchemaFromZod } from "@backstage/plugin-scaffolder";


export const githubTeamQueryFilterExpression = z.record(
    z
        .string()
        .or(z.object({ exists: z.boolean().optional() }))
        .or(z.array(z.string())),
);


export const GithubTeamPickerFieldSchema = makeFieldSchemaFromZod(
    z.string(),
    z.object({
        allowArbitraryValues: z
            .boolean()
            .optional()
            .describe(
                'Whether to allow arbitrary values to be entered. If false, the user will be forced to select one of the available options.',
            ),
        defaultNamespace: z
            .union([z.string(), z.literal(false)])
            .optional()
            .describe(
                'The default namespace to use when the user does not specify on',
            ),
    })
);

export type GithubTeamPickerUiOptions = typeof GithubTeamPickerFieldSchema.uiOptionsType

export type GithubTeamPickerProps = typeof GithubTeamPickerFieldSchema.type;

export const GithubTeamTeamPickerSchema = GithubTeamPickerFieldSchema.schema;

export type GithubTeamPickerFilterQuery = z.TypeOf<typeof githubTeamQueryFilterExpression>;

export type GithubTeamPickerFilterQueryValue = GithubTeamPickerFilterQuery[keyof GithubTeamPickerFilterQuery];
