import React from "react";
import useAsync from "react-use/lib/useAsync";
import { Alert } from "@material-ui/lab";
import { Table, TableColumn, Progress } from "@backstage/core-components";
import { githubAuthApiRef, useApi } from "@backstage/core-plugin-api";
import { graphql } from "@octokit/graphql";

export const ExampleFetchComponent = () => {
  const auth = useApi(githubAuthApiRef);
  const { value, loading, error } = useAsync(async () => {
    const token = await auth.getAccessToken();
    const graphqlWithAuth = graphql.defaults({
      headers: {
        authorization: `token ${token}`,
      },
    });
    const { viewer } = await graphqlWithAuth(query);
    return viewer;
  }, []);
  if (loading) return <Progress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  if (value && value.repositories) return <DenseTable viewer={value} isLoading={loading} />;
  return (
    <Table
      title="Your Repositories"
      options={{ search: false }}
      columns={[]}
      data={[]}
      isLoading={loading}
    />
  );
}


const query = `{
  viewer {
    repositories(first: 100) {
      totalCount
      nodes {
        name
        description
        createdAt
        diskUsage
        isFork
        url
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}`;

type Node =  {
  name: string;
  description: string;
  createdAt: string;
  diskUsage: number;
  isFork: boolean;
  url: string;
};

type Viewer = {
  repositories: {
    totalCount: number;
    nodes: Node[];
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
  };
};

type DenseTableProps = {
  viewer: Viewer;
  isLoading?: boolean;
};

const DenseTable = ({ viewer, isLoading }: DenseTableProps) => {
  const columns: TableColumn[] = [
    { title: "Name", field: "name" },
    { title: "URL", field: "url"},
    { title: "Description", field: "description" },
    { title: "Created At", field: "createdAt" },
    { title: "Disk Usage", field: "diskUsage" },
    { title: "Is Fork", field: "isFork" },
  ];

  return (
    <Table
      title="Your Repositories"
      options={{ search: false, paging: false }}
      columns={columns}
      data={viewer.repositories.nodes}
      isLoading={isLoading}
    />
  )
};
