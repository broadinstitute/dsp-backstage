import React from 'react';
import useAsync from 'react-use/lib/useAsync';
import { Typography, Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { ExampleFetchComponent } from '../ExampleFetchComponent';
import { ProfileInfo, identityApiRef, useApi } from '@backstage/core-plugin-api';
import { Alert } from "@material-ui/lab";
import { Progress } from '@backstage/core-components';

const ExampleComponentContent = (profileInfo: ProfileInfo) => (
  <Page themeId="tool">
    <Header title={`Welcome, ${profileInfo.displayName}!`}>
      <HeaderLabel label="Owner" value="dsp-devops" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <ContentHeader title="My Repos">
        <SupportButton>A description of your plugin goes here.</SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <InfoCard title={profileInfo.displayName}>
            <Typography variant="body1">
              {`${profileInfo.displayName} | ${profileInfo.email}`}
            </Typography>
          </InfoCard>
        </Grid>
        <Grid item>
          <ExampleFetchComponent />
        </Grid>
      </Grid>
    </Content>
  </Page>
);

export const ExampleComponent = () => {
  const identityApi = useApi(identityApiRef);
  const { value, loading, error } = useAsync(async () => {
    const profile = await identityApi.getProfileInfo();
    return profile;
  }, []);
  if (loading) return <Progress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  if (value && value.displayName) return <ExampleComponentContent displayName={value.displayName} email={value.email} />;
  return (
    <div>oops</div>
  );
}
