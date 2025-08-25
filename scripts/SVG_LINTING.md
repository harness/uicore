# SVG Linting Script

## Overview

This project uses a simple Node.js script to ensure all SVG files contain only pure vector graphics without any embedded raster images.

## Rule: No Image Tags in SVG

### What it checks

The linting script (`scripts/check-svg-images.js`) checks for the presence of `<image>` tags in SVG files. These tags are typically used to embed raster images (PNG, JPEG, etc.) within SVG files, which defeats the purpose of using scalable vector graphics.

### Why this rule exists

1. **Scalability**: Pure vector graphics scale perfectly at any size, while embedded raster images become pixelated when scaled up.
2. **File size**: Embedded images significantly increase SVG file sizes.
3. **Performance**: Vector graphics render faster and use less memory than embedded raster images.
4. **Consistency**: Maintaining pure vector graphics ensures consistent quality across all icon sizes and resolutions.

### How to run

```bash
# Check all SVG files in the project
yarn lint:svg

# Check specific SVG files
node scripts/check-svg-images.js path/to/file1.svg path/to/file2.svg
```

### Integration

- The script runs automatically on staged SVG files during pre-commit hooks via lint-staged.
- It can be run manually using `yarn lint:svg`.
- The script automatically skips deleted files, so it won't fail when removing SVG files from the repository.

### Fixing violations

If your SVG file contains an `<image>` tag:

1. **Replace with vector graphics**: Recreate the image using vector shapes and paths.
2. **Use external references**: If a raster image is absolutely necessary, consider using it as a separate file and referencing it externally.
3. **Convert to paths**: Use tools like Adobe Illustrator or Inkscape to trace raster images and convert them to vector paths.

### Example violation

```svg
<!-- ❌ BAD: Contains embedded raster image -->
<svg>
  <image href="data:image/png;base64,iVBORw0KG..." width="100" height="100"/>
</svg>

<!-- ✅ GOOD: Pure vector graphics -->
<svg>
  <path d="M10 10 L90 90" stroke="black"/>
  <circle cx="50" cy="50" r="40" fill="blue"/>
</svg>
```
