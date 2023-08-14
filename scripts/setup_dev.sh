#!/usr/bin/env sh

# This script is used to setup the environment for the project.
export POSTGRES_HOST=localhost
export POSTGRES_PORT='5432'
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=password
export BACKSTAGE_AUTH_GITHUB_CLIENT_ID=$(VAULT_ADDR='https://clotho.broadinstitute.org:8200' vault read -field=clientId secret/suitable/backstage/local/github-oauth)
export BACKSTAGE_AUTH_GITHUB_CLIENT_SECRET=$(VAULT_ADDR='https://clotho.broadinstitute.org:8200' vault read -field=clientSecret secret/suitable/backstage/local/github-oauth)
export BACKSTAGE_GITHUB_TOKEN=$(VAULT_ADDR='https://clotho.broadinstitute.org:8200' vault read -field=token secret/suitable/backstage/common/github-token)
export LOG_LEVEL="${LOG_LEVEL:-debug}"

concurrently "yarn start" "yarn start-backend"
