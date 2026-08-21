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
$invalidationPaths = @(
  '/',
  '/index.html',
  '/robots.txt',
  '/sitemap.xml',
  '/teachers/liu-kewei.html'
)
$invalidationArguments = @(
  'cloudfront', 'create-invalidation',
  '--distribution-id', $DistributionId,
  '--paths'
) + $invalidationPaths + @(
  '--query', 'Invalidation.Id',
  '--output', 'text'
)
$invalidationId = (Invoke-AwsCli -Arguments $invalidationArguments).Trim()

if ([string]::IsNullOrWhiteSpace($invalidationId)) {
  throw 'CloudFront did not return an invalidation ID.'
}

Invoke-AwsCli -Arguments @(
  'cloudfront', 'wait', 'invalidation-completed',
  '--distribution-id', $DistributionId,
  '--id', $invalidationId
)

$cacheBust = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
$checkUrl = "https://www.tabitoedu.com/?deploy-check=$cacheBust"
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

$teacherUrl = "https://www.tabitoedu.com/teachers/liu-kewei.html?deploy-check=$cacheBust"
$teacherResponse = Invoke-WebRequest -Uri $teacherUrl -UseBasicParsing
if ($teacherResponse.StatusCode -ne 200 -or -not $teacherResponse.Content.Contains('刘可惟')) {
  throw 'Public instructor profile verification failed.'
}

$robotsUrl = "https://www.tabitoedu.com/robots.txt?deploy-check=$cacheBust"
$robotsResponse = Invoke-WebRequest -Uri $robotsUrl -UseBasicParsing
if ($robotsResponse.StatusCode -ne 200 -or -not $robotsResponse.Content.Contains('Sitemap: https://www.tabitoedu.com/sitemap.xml')) {
  throw 'Public robots.txt verification failed.'
}

Write-Host "Deployment complete. CloudFront invalidation: $invalidationId"
Write-Host 'Verified: https://www.tabitoedu.com/'
Write-Host 'Verified: https://www.tabitoedu.com/teachers/liu-kewei.html'
Write-Host 'Verified: https://www.tabitoedu.com/robots.txt'
