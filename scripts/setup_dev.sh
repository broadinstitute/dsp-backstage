#!/usr/bin/env sh

# test if vault is installed
if ! command -v vault &> /dev/null
then
    echo "vault could not be found"
    exit
fi

# test ~/.backstage-github-token exists
if [ ! -f ~/.backstage-github-token ]; then
  echo "File ~/.backstage-github-token does not exist. Please create it and add your GitHub token. see README.md for more info."
  exit
fi

# This script is used to setup the environment for the project.
export POSTGRES_HOST="${POSTGRES_HOST:-localhost}"
export POSTGRES_PORT="${POSTGRES_PORT:-5432}"
export POSTGRES_USER="${POSTGRES_USER:-backstage}"
export POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-password}"
export BACKSTAGE_AUTH_GITHUB_CLIENT_ID="$(VAULT_ADDR='https://clotho.broadinstitute.org:8200' vault read -field=clientId secret/suitable/backstage/local/github-oauth)"
export BACKSTAGE_AUTH_GITHUB_CLIENT_SECRET="$(VAULT_ADDR='https://clotho.broadinstitute.org:8200' vault read -field=clientSecret secret/suitable/backstage/local/github-oauth)"
export BACKSTAGE_GITHUB_TOKEN="$(cat ~/.backstage-github-token)"
export LOG_LEVEL="${LOG_LEVEL:-info}"

# if docker container is not running start it
pg_container_running=$(docker inspect -f '{{.State.Running}}' backstage-pg)
if [ $? -eq 1 ]; then
  echo "Docker container backstage-pg does not exist. Running it now..."
  docker run --name backstage-pg -e POSTGRES_PASSWORD="${POSTGRES_PASSWORD}" -e "POSTGRES_USER=${POSTGRES_USER}" -d -p "${POSTGRES_PORT}:${POSTGRES_PORT}" postgres
fi

if [ "${pg_container_running}" = "false" ]; then
  echo "Docker container backstage-pg exists but is not running. Starting it now..."
  docker start backstage-pg
fi

concurrently "yarn start" "yarn start-backend"
