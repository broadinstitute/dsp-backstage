import { Entity } from '@backstage/catalog-model';
import { CatalogApi, catalogApiRef } from '@backstage/plugin-catalog-react';
import { renderInTestApp, TestApiProvider } from '@backstage/test-utils';
import { IdSchema } from '@rjsf/utils';
import { fireEvent } from '@testing-library/react';
import React from 'react';
import { GithubTeamPicker } from './GithubTeamPicker';
import { FieldExtensionComponentProps, FieldExtensionUiSchema } from '@backstage/plugin-scaffolder-react';

const makeEntity = (kind: string, name: string, namespace: string) => ({
  apiVersion: 'scaffolder.backstage.io/v1beta3',
  kind,
  metadata: {
    name,
    namespace,
    annotations: {
      'github.com/team-slug': `my-org/${name}`,
    },
  },
});

describe('<GithubTeamPicker />', () => {
  let entities: Entity[];
  const onChange = jest.fn();
  const schema = {};
  const required = false;
  let uiSchema: FieldExtensionComponentProps<any, any>['uiSchema'];
  const idSchema: FieldExtensionComponentProps<any, any>['idSchema'] = {
    $id: 'test',
  } as IdSchema<any>;
  const rawErrors: string[] = [];
  const formData = undefined;

  let props: FieldExtensionComponentProps<any, any>;

  const catalogApi: jest.Mocked<CatalogApi> = {
    getLocationById: jest.fn(),
    getEntities: jest.fn(async () => ({ items: entities })),
    addLocation: jest.fn(),
    getLocationByRef: jest.fn(),
    removeEntityByUid: jest.fn(),
    getEntityByRef: jest.fn(),
  } as any;

  let Wrapper: React.ComponentType<React.PropsWithChildren<{}>>;

  beforeEach(() => {
    entities = [
      makeEntity('Group', 'default', 'team-a'),
      makeEntity('Group', 'default', 'team-b'),
    ];

    Wrapper = ({ children }: { children?: React.ReactNode }) => (
      <TestApiProvider apis={[[catalogApiRef, catalogApi]]}>
        {children}
      </TestApiProvider>
    );
  });

  afterEach(() => jest.resetAllMocks());

  describe('with default options', () => {
    beforeEach(() => {
      uiSchema = {};
      props = {
        onChange,
        schema,
        required,
        uiSchema,
        rawErrors,
        formData,
        idSchema,
      } as unknown as FieldExtensionComponentProps<any, any>;
      catalogApi.getEntities.mockResolvedValue({ items: entities });
      catalogApi.getEntities.mockResolvedValue({ items: entities });
    });

    it('searches for groups', async () => {
      await renderInTestApp(
        <Wrapper>
          <GithubTeamPicker {...props} />
        </Wrapper>,
      );

      expect(catalogApi.getEntities).toHaveBeenCalledWith(
        { filter: { kind: ['Group'] } },
        undefined,
      );
    });

    it('shows the team slug to users', async () => {
      const { getByRole } = await renderInTestApp(
        <Wrapper>
          <GithubTeamPicker {...props} />
          <div data-test-id="outside">Outside</div>
        </Wrapper>,
      );

      const input = getByRole('textbox');
      // open the autocomplete dropdown
      fireEvent.click(input);
      // select the first option
      fireEvent.change(input, { target: { value: 'my-org/team-a' } });

      expect(input).toHaveValue('my-org/team-a');
    });

    it('will not allow arbirtary values', async () => {
      const { getByRole } = await renderInTestApp(
        <Wrapper>
          <GithubTeamPicker {...props} />
          <div data-test-id="outside">Outside</div>
        </Wrapper>,
      );

      const input = getByRole('textbox');
      // try to input an invalid value
      fireEvent.change(input, { target: { value: 'fake' } });
      fireEvent.blur(input);

      expect(input).toHaveValue('');
    });
  });
});
