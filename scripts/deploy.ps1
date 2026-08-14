[CmdletBinding()]
param(
  [string]$Bucket = 'www.tabitoedu.com',
  [string]$DistributionId = 'E1KRPEZIQMX5S6',
  [string]$Region = 'ap-northeast-1',
  [switch]$DryRun
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$siteRoot = Join-Path $repoRoot 'site'

function Invoke-AwsCli {
  param([Parameter(Mandatory)][string[]]$Arguments)

  $output = & aws @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "AWS CLI failed: aws $($Arguments -join ' ')"
  }
  return $output
}

if (-not (Get-Command aws -ErrorAction SilentlyContinue)) {
  throw 'AWS CLI is not installed or is not available on PATH.'
}

& (Join-Path $PSScriptRoot 'validate.ps1')

Write-Host 'Checking AWS login...'
[void](Invoke-AwsCli -Arguments @('sts', 'get-caller-identity', '--output', 'json'))

$syncArguments = @(
  's3', 'sync',
  $siteRoot,
  "s3://$Bucket",
  '--delete',
  '--region', $Region,
  '--exclude', '.DS_Store'
)

if ($DryRun) {
  $syncArguments += '--dryrun'
  Write-Host "Dry run for s3://$Bucket"
  Invoke-AwsCli -Arguments $syncArguments | Write-Host
  Write-Host 'Dry run complete. No files were uploaded or deleted.'
  exit 0
}

Write-Host "Syncing $siteRoot to s3://$Bucket"
Invoke-AwsCli -Arguments $syncArguments | Write-Host

Write-Host "Refreshing CloudFront distribution $DistributionId"
$invalidationId = (Invoke-AwsCli -Arguments @(
  'cloudfront', 'create-invalidation',
  '--distribution-id', $DistributionId,
  '--paths', '/', '/index.html',
  '--query', 'Invalidation.Id',
  '--output', 'text'
)).Trim()

if ([string]::IsNullOrWhiteSpace($invalidationId)) {
  throw 'CloudFront did not return an invalidation ID.'
}

Invoke-AwsCli -Arguments @(
  'cloudfront', 'wait', 'invalidation-completed',
  '--distribution-id', $DistributionId,
  '--id', $invalidationId
)

$checkUrl = "https://www.tabitoedu.com/?deploy-check=$([DateTimeOffset]::UtcNow.ToUnixTimeSeconds())"
$response = Invoke-WebRequest -Uri $checkUrl -UseBasicParsing

if ($response.StatusCode -ne 200) {
  throw "Public site returned HTTP $($response.StatusCode)."
}

if (-not $response.Content.Contains('旅人教育 TABITO')) {
  throw 'Public site is missing the current brand text.'
}

if ($response.Content.Contains('旅人学堂') -or $response.Content.Contains('国内学员')) {
  throw 'Public site still contains retired text.'
}

Write-Host "Deployment complete. CloudFront invalidation: $invalidationId"
Write-Host 'Verified: https://www.tabitoedu.com/'
