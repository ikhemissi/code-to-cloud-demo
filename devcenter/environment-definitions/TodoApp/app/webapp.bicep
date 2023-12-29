param name string
param location string = resourceGroup().location
param tags object = {}

param appCommandLine string = ''
param applicationInsightsName string = ''
param appServicePlanId string
@secure()
param appSettings object = {}
param keyVaultName string
param azdServiceName string = 'webapp'

module webapp '../core/host/appservice.bicep' = {
  name: 'webapplication'
  params: {
    name: name
    location: location
    tags: union(tags, { 'azd-service-name': azdServiceName })
    appCommandLine: appCommandLine
    applicationInsightsName: applicationInsightsName
    appServicePlanId: appServicePlanId
    appSettings: appSettings
    keyVaultName: keyVaultName
    runtimeName: 'node'
    runtimeVersion: '20-lts'
    scmDoBuildDuringDeployment: true
  }
}

output SERVICE_WEBAPP_IDENTITY_PRINCIPAL_ID string = webapp.outputs.identityPrincipalId
output SERVICE_WEBAPP_NAME string = webapp.outputs.name
output SERVICE_WEBAPP_URI string = webapp.outputs.uri
