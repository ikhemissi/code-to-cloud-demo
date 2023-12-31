param accountName string
param location string = resourceGroup().location
param tags object = {}

param keyVaultName string
@description('OpenAI deployments to create.')
param deployments array = [
  {
    name: 'gpt-35-turbo'
    model: {
      name: 'gpt-35-turbo'
      version: '0301'
      format: 'OpenAI'
    }
    sku: {
      name: 'Standard'
      capacity: 1
    }
    raiPolicyName: ''
  }
]

module aoai '../core/ai/cognitiveservices.bicep' = {
  name: 'aoai'
  params: {
    name: accountName
    location: location
    tags: tags
    kind: 'OpenAI'
    deployments: deployments
    keyVaultName: keyVaultName
  }
}

output endpoint string = aoai.outputs.endpoint
output apiKeySecret string = aoai.outputs.apiKeySecret
output deploymentId string = deployments[0].name
