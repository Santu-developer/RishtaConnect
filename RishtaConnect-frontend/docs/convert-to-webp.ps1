# PowerShell Script to Convert Images to WebP
# Install webp tools first if not installed
# Download from: https://developers.google.com/speed/webp/download

# Path to your assets folder
$assetsPath = "src\assets"

# Get all image files
$images = Get-ChildItem -Path $assetsPath -Include *.jpg,*.png,*.jpeg -Recurse

Write-Host "Found $($images.Count) images to convert" -ForegroundColor Green

foreach ($image in $images) {
    $outputPath = $image.FullName -replace '\.(jpg|png|jpeg)$', '.webp'
    
    # Using cwebp command (install WebP tools first)
    # cwebp -q 85 "$($image.FullName)" -o "$outputPath"
    
    Write-Host "Would convert: $($image.Name) -> $(Split-Path $outputPath -Leaf)" -ForegroundColor Yellow
}

Write-Host "`nNOTE: Install WebP tools from https://developers.google.com/speed/webp/download" -ForegroundColor Cyan
Write-Host "Then uncomment line 16 in this script and run again" -ForegroundColor Cyan
