[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$siteRoot = Join-Path $repoRoot 'site'
$indexPath = Join-Path $siteRoot 'index.html'
$teacherPath = Join-Path $siteRoot 'teachers/liu-kewei.html'
$robotsPath = Join-Path $siteRoot 'robots.txt'
$sitemapPath = Join-Path $siteRoot 'sitemap.xml'

$requiredFiles = @($indexPath, $teacherPath, $robotsPath, $sitemapPath)
foreach ($path in $requiredFiles) {
  if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
    throw "Missing required public file: $path"
  }
}

$html = [IO.File]::ReadAllText($indexPath, [Text.Encoding]::UTF8)
$teacherHtml = [IO.File]::ReadAllText($teacherPath, [Text.Encoding]::UTF8)
$robots = [IO.File]::ReadAllText($robotsPath, [Text.Encoding]::UTF8)
$sitemap = [IO.File]::ReadAllText($sitemapPath, [Text.Encoding]::UTF8)

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

$teacherRequired = @(
  '刘可惟',
  '劉 可惟',
  'Kewei Liu',
  '东京大学大学院',
  '京都大学',
  'https://kayui-gavo.github.io/education/',
  'application/ld+json'
)
foreach ($text in $teacherRequired) {
  if (-not $teacherHtml.Contains($text)) {
    $problems.Add("Instructor profile is missing: $text")
  }
}

if (-not $robots.Contains('Sitemap: https://www.tabitoedu.com/sitemap.xml')) {
  $problems.Add('robots.txt does not advertise the production sitemap.')
}
if (-not $sitemap.Contains('https://www.tabitoedu.com/teachers/liu-kewei.html')) {
  $problems.Add('sitemap.xml does not contain the Liu Kewei instructor profile.')
}

$attributePattern = '(?i)(?:src|href)=["'']([^"'']+)["'']'
$cssUrlPattern = '(?i)url\(["'']?([^\)"'']+)["'']?\)'
$checkedLocalFiles = 0
$sitePrefix = [IO.Path]::GetFullPath($siteRoot).TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar

$htmlFiles = Get-ChildItem -LiteralPath $siteRoot -Recurse -File -Filter '*.html'
foreach ($htmlFile in $htmlFiles) {
  $document = [IO.File]::ReadAllText($htmlFile.FullName, [Text.Encoding]::UTF8)
  $references = [Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)

  foreach ($match in [regex]::Matches($document, $attributePattern)) {
    [void]$references.Add($match.Groups[1].Value)
  }
  foreach ($match in [regex]::Matches($document, $cssUrlPattern)) {
    [void]$references.Add($match.Groups[1].Value)
  }

  foreach ($reference in $references) {
    if ($reference -match '^(?:https?:|data:|mailto:|tel:|javascript:|#)') {
      continue
    }

    $relativePath = ($reference -split '[?#]', 2)[0]
    if ([string]::IsNullOrWhiteSpace($relativePath)) {
      continue
    }

    if ($relativePath.StartsWith('/')) {
      $decodedPath = [Uri]::UnescapeDataString($relativePath.TrimStart('/')).Replace('/', [IO.Path]::DirectorySeparatorChar)
      $fullPath = [IO.Path]::GetFullPath((Join-Path $siteRoot $decodedPath))
    } else {
      $decodedPath = [Uri]::UnescapeDataString($relativePath).Replace('/', [IO.Path]::DirectorySeparatorChar)
      $fullPath = [IO.Path]::GetFullPath((Join-Path $htmlFile.DirectoryName $decodedPath))
    }

    if (-not $fullPath.StartsWith($sitePrefix, [StringComparison]::OrdinalIgnoreCase)) {
      $problems.Add("Reference escapes site directory in $($htmlFile.Name): $reference")
      continue
    }

    $checkedLocalFiles++
    if (-not (Test-Path -LiteralPath $fullPath -PathType Leaf)) {
      $problems.Add("Missing referenced file in $($htmlFile.Name): $reference")
    }
  }
}

if ($problems.Count -gt 0) {
  $problems | ForEach-Object { Write-Error $_ }
  throw "Site validation failed with $($problems.Count) problem(s)."
}

$trackedSiteFiles = Get-ChildItem -LiteralPath $siteRoot -Recurse -File -Force |
  Where-Object { $_.Name -ne '.DS_Store' }

Write-Host "Site validation passed."
Write-Host "Checked $checkedLocalFiles local references across $($htmlFiles.Count) HTML files."
Write-Host "Website files: $($trackedSiteFiles.Count)"
