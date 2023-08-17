# DSP Backstage

DSP Backstage provides a suite of internal developer and platform tooling to improve the experience
and productive of Teams contributing to Terra and DSP's other platforms.

## Docker Images

Docker Images for dsp-backstage are available at `us-central1-docker.pkg.dev/dsp-artifact-registry/backstage/backstage:latest`

## Helm Chart

A helm chart for installing this backstage deployment is also available
`helm repo add terra-helm https://terra-helm.storage.googleapis.com/ && helm install terra-helm/backstage`
This helm chart's defaults are tuned to run in GKE environments managed by the DSP Devops Team. If running in another
environment, additional confiugration may be needed. Documentation for this helmchart is a available [here](https://github.com/broadinstitute/terra-helmfile/tree/master/charts/backstage)

## Developing Locally

`yarn install && yarn dev` should be sufficient to get a local development environment up and running.
`yarn dev` will just execute the script at `/scripts/setup_dev.sh` so look there if running into problems


This will use a local postgres docker container for the backing data store. Running this command expects
the user to have the `vault` cli tool installed and be able to access DSP's vault instance See our [onboarding doc](https://docs.google.com/document/d/11pZE-GqeZFeSOG0UpGg_xyTDQpgBRfr0MLxpxvvQgEw/edit#heading=h.trehvi2yr632)
for more detailed on getting setup with vault.

The [official backstage docs](https://backstage.io/docs/overview/what-is-backstage/) are the best source for more detailed info on developing backstage.

### Github Integration

Backstage will use a github integration to automatically ingest catalog entities from a github org. DSP-Backstage is currently configured to use
a Github Personal Access Token to do this. Due to API Limits on Github PATs it is recommended to generate a PAT on your personal github account for use in local
development. See [github docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) on managing a PAT
for more detailed info.
The PAT you generate should have the following scopes:
- repo
- workflow
- read:org
- user:email

Save the token in a `$HOME/.backstage-github-token` file. The setup dev script will take care of passing the token into your local environment
