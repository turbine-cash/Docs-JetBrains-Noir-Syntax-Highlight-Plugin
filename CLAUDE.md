# Noir JetBrains Plugin Documentation

Astro Starlight documentation site for the Noir JetBrains Plugin. Deployed to Cloudflare Pages at noir-plugin.zklsol.com.

## Tech Stack

- **Framework**: Astro + Starlight
- **Plugins**: @pasqal-io/starlight-client-mermaid (diagrams)
- **Deploy**: Cloudflare Pages (static)
- **Styling**: Custom CSS with orange theme (#F97315)
- **Search**: Pagefind (built-in)

## Commands

```bash
npm run dev      # Start dev server (localhost:4321)
npm run build    # Build to ./dist
npm run preview  # Preview build locally
npm run deploy   # Build and deploy to Cloudflare Pages
```

## Directory Structure

```
src/
├── assets/
│   └── logo.svg             # Noir plugin logo
├── components/
│   ├── Header.astro         # Custom header with Install Plugin button
│   ├── PageFrame.astro      # Layout with TOC highlighting
│   ├── PageTitle.astro      # Title without breadcrumbs
│   └── ThemeToggle.astro
├── content/docs/            # MDX documentation pages
│   ├── index.mdx            # Redirects to /introduction
│   ├── introduction.mdx     # Main landing page
│   ├── quick-start.mdx
│   ├── installation.mdx
│   ├── syntax-highlighting.mdx
│   ├── lsp-intelligence.mdx
│   ├── live-templates.mdx
│   ├── actions.mdx
│   ├── settings.mdx
│   ├── troubleshooting.mdx
│   └── limitations.mdx
└── styles/
    └── custom.css           # Theme overrides

public/
├── examples/                # Sample .nr files for users
│   ├── main.nr
│   ├── functions.nr
│   ├── structs.nr
│   ├── tests.nr
│   ├── macros.nr
│   └── README.md
├── images/screenshots/      # Documentation screenshots
└── favicon.svg

screenshot-tools/            # Automated screenshot capture
├── build.gradle.kts         # RemoteRobot dependencies
├── settings.gradle.kts
├── src/test/kotlin/screenshots/
│   └── ScreenshotRunner.kt  # Screenshot automation
├── demo-project/            # Noir project for demos
│   ├── Nargo.toml
│   └── src/main.nr
├── output/                  # Generated screenshots
└── README.md
```

## Site Structure

Single-section navigation (no tabs):

```
/                      Redirects to /introduction
/introduction          Main landing page
/quick-start           5-minute getting started
/installation          Plugin + nargo installation
/syntax-highlighting   Syntax highlighting features
/lsp-intelligence      LSP features (completion, diagnostics, etc.)
/live-templates        All 13 templates
/actions               Tools menu actions
/settings              App + project settings
/troubleshooting       FAQ-style issues
/limitations           Known limitations
```

## Adding New Documentation

### 1. Create MDX File

Add file to `src/content/docs/`:

```mdx
---
title: "Page Title"
description: "Brief description for SEO"
---

import { Aside, Steps } from '@astrojs/starlight/components';

Content here...
```

### 2. Update Sidebar

Edit `astro.config.mjs` → `sidebar` array:

```javascript
sidebar: [
  { label: 'Introduction', slug: 'introduction' },
  { label: 'New Page', slug: 'new-page' },
  // ...
],
```

### 3. Use Components

```mdx
import { Aside, Steps, Card, CardGrid } from '@astrojs/starlight/components';

<Aside type="caution">
Important warning here
</Aside>

<Steps>
1. First step
2. Second step
</Steps>
```

## Screenshot Automation

Screenshots are captured using JetBrains RemoteRobot:

```bash
cd screenshot-tools

# Start IDE with Robot Server (from main plugin repo)
# ../JetBrains-Noir-Syntax-Highlight-Plugin/gradlew runIdeForUiTests

# Capture screenshots
./gradlew test
```

Screenshots are saved to `output/` with version-stamped names: `feature-v0.1.0.png`

### Creating GIFs

```bash
# Record screen
screencapture -v output/recording.mov

# Convert to GIF
ffmpeg -i output/recording.mov -vf "fps=15,scale=1280:-1" output/feature-v0.1.0.gif
```

## Configuration

### astro.config.mjs Key Sections

```javascript
// Noir syntax highlighting (aliases noir to rust)
markdown: {
  shikiConfig: {
    langAlias: {
      noir: 'rust',
      nr: 'rust',
    },
  },
},

starlight({
  plugins: [starlightClientMermaid()],
  title: 'Noir JetBrains Plugin',
  logo: { src: './src/assets/logo.svg', replacesTitle: true },
  pagefind: true,
  social: [
    { icon: 'github', label: 'GitHub', href: 'https://github.com/turbine-cash/JetBrains-Noir-Syntax-Highlight-Plugin' },
  ],
  sidebar: [
    { label: 'Introduction', slug: 'introduction' },
    // ...
  ],
})
```

### Cloudflare Deployment

```jsonc
// wrangler.jsonc
{
  "name": "noir-jetbrains-plugin-docs",
  "pages_build_output_dir": "./dist"
}
```

## Gotchas

1. **Mermaid diagrams**: Requires `@pasqal-io/starlight-client-mermaid` plugin
2. **Logo path**: Must reference `./src/assets/`, not `./public/`
3. **Image imports in MDX**: Use relative paths from the MDX file location
4. **Noir code blocks**: Use `noir` or `nr` language identifier - Shiki aliases these to `rust` via `langAlias` in astro.config.mjs
5. **Starlight auto-tabs**: Directories in `src/content/docs/` auto-generate navigation tabs - keep only flat MDX files to maintain single-section nav
6. **Shiki config changes**: Require dev server restart (not hot-reloaded)

## Related Projects

- **Plugin Marketplace**: https://plugins.jetbrains.com/plugin/29753-noir-language-support
- **Plugin Source Code**: https://github.com/turbine-cash/JetBrains-Noir-Syntax-Highlight-Plugin
- **Noir Language**: https://noir-lang.org/
- **JetBrains Plugin SDK**: https://plugins.jetbrains.com/docs/intellij/
