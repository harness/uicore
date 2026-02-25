# Icons Package Agent Guide

## Adding a New Icon

1. **Add the SVG file** to `packages/icons/src/` with a kebab-case filename (e.g., `fme-set-target-rules.svg`)

2. **SVG requirements**:

   - Do NOT include `width` and `height` attributes on the `<svg>` element
   - Include `viewBox="0 0 32 32"` (or appropriate dimensions)
   - Include `fill="none"` and `xmlns="http://www.w3.org/2000/svg"`
   - Example:
     ```svg
     <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
       <!-- paths here -->
     </svg>
     ```

3. **Update HarnessIcons.ts**: Add entries in **alphabetical order** in three places:

   - Import statement (e.g., `import FmeSetTargetRules from './fme-set-target-rules.svg'`)
   - Type union `HarnessIconName` (e.g., `| 'fme-set-target-rules'`)
   - Record mapping `HarnessIcons` (e.g., `'fme-set-target-rules': FmeSetTargetRules,`)

   **Important**: All entries MUST be in alphabetical order. For example, `fme-set-target-rules` comes after `fme-set-dynamic-config` and before `fme-set-targets`.

4. **Increment the version** in `packages/icons/package.json`

5. **Run the build** to verify everything works:
   ```bash
   yarn build
   ```

## File Structure

```
packages/icons/
├── .skip-compress         # Optional: file names of SVGs to skip compressing, one per line (e.g. icon-name.svg)
├── src/
│   ├── *.svg              # Icon SVG files
│   ├── HarnessIcons.ts    # Icon registry (manually maintained, alphabetical order)
│   └── index.ts           # Exports
└── package.json
```

## Naming Convention

- Use kebab-case for filenames: `my-icon-name.svg`
- The icon name in code will match the filename (without extension)
- Import variable uses PascalCase: `MyIconName`
