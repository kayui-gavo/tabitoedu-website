[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$siteRoot = Join-Path $repoRoot 'site'
$indexPath = Join-Path $siteRoot 'index.html'

if (-not (Test-Path -LiteralPath $indexPath -PathType Leaf)) {
  throw "Missing site entry: $indexPath"
}

$html = [IO.File]::ReadAllText($indexPath, [Text.Encoding]::UTF8)

$requiredText = @(
  '<title>日本留学｜旅人教育 TABITO</title>',
  '旅人教育 TABITO',
  '14,000 元/科',
  '所有学员均收取5,000元材料及咨询服务费',
  '19,000 元',
  '33,000 元',
  '47,000 元',
  '61,000 元'
)

$forbiddenText = @(
  '旅人学堂',
  '国内学员',
  '在中国报名的学员',
  '在日本报名并自行提交材料',
  '日元汇率'
)

$problems = [Collections.Generic.List[string]]::new()

foreach ($text in $requiredText) {
  if (-not $html.Contains($text)) {
    $problems.Add("Missing required text: $text")
  }
}

foreach ($text in $forbiddenText) {
  if ($html.Contains($text)) {
    $problems.Add("Found forbidden text: $text")
  }
}

$references = [Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
$attributePattern = '(?i)(?:src|href)=["'']([^"'']+)["'']'
$cssUrlPattern = '(?i)url\(["'']?([^\)"'']+)["'']?\)'

foreach ($match in [regex]::Matches($html, $attributePattern)) {
  [void]$references.Add($match.Groups[1].Value)
}

foreach ($match in [regex]::Matches($html, $cssUrlPattern)) {
  [void]$references.Add($match.Groups[1].Value)
}

$sitePrefix = [IO.Path]::GetFullPath($siteRoot).TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar
$checkedLocalFiles = 0

foreach ($reference in $references) {
  if ($reference -match '^(?:https?:|data:|mailto:|tel:|javascript:|#)') {
    continue
  }

  $relativePath = ($reference -split '[?#]', 2)[0]
  if ([string]::IsNullOrWhiteSpace($relativePath)) {
    continue
  }

  $decodedPath = [Uri]::UnescapeDataString($relativePath).Replace('/', [IO.Path]::DirectorySeparatorChar)
  $fullPath = [IO.Path]::GetFullPath((Join-Path $siteRoot $decodedPath))

  if (-not $fullPath.StartsWith($sitePrefix, [StringComparison]::OrdinalIgnoreCase)) {
    $problems.Add("Reference escapes site directory: $reference")
    continue
  }

  $checkedLocalFiles++
  if (-not (Test-Path -LiteralPath $fullPath -PathType Leaf)) {
    $problems.Add("Missing referenced file: $reference")
  }
}

if ($problems.Count -gt 0) {
  $problems | ForEach-Object { Write-Error $_ }
  throw "Site validation failed with $($problems.Count) problem(s)."
}

$trackedSiteFiles = Get-ChildItem -LiteralPath $siteRoot -Recurse -File -Force |
  Where-Object { $_.Name -ne '.DS_Store' }

Write-Host "Site validation passed."
Write-Host "Checked $checkedLocalFiles local references."
Write-Host "Website files: $($trackedSiteFiles.Count)"
