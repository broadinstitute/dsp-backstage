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

