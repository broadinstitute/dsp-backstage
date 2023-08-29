import { CATALOG_FILTER_EXISTS } from '@backstage/catalog-client';
import { Entity } from '@backstage/catalog-model';
import { CatalogApi, catalogApiRef } from '@backstage/plugin-catalog-react';
import { renderInTestApp, TestApiProvider } from '@backstage/test-utils';
import { FieldProps } from '@rjsf/core';
import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { GithubTeamPicker } from './GithubTeamPicker';
import { GithubTeamPickerProps } from './schema';

const makeEntity = (kind: string, name: string, namespace: string) => ({
  apiVersion: 'scaffolder.backstage.io/v1beta3',
  kind,
  metadata: { name, namespace },
});

describe('<GithubTeamPicker />', () => {
  let entities: Entity[];
  const onChange = jest.fn();
  const schema = {};
  const required = false;
  let uiSchema: GithubTeamPickerProps['uiSchema'];
  let idSchema: GithubTeamPickerProps['idSchema'] = { $id: 'test' };
  const rawErrors: string[] = [];
  const formData = undefined;

  let props: FieldProps;

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
      } as unknown as FieldProps<any>;
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
  });
});
