# NeoIPC DHIS2 App Icons — sources

This folder holds the **source** files for the app icon set: the SVG masters in
[`masters/`](masters/) and the App Hub logo `apphub-logo-512x512.png`. The
**deployed** icons (the fixed-name files the DHIS2 App Platform serves) live in
the repo-root [`../public/`](../public/).

Generated from the NeoIPC symbol (true vector extraction), exact brand hex
**blue #0083C1** / **orange #FF9015**.

## Naming scheme
Two families by container, each with a qualifier:

| Variant | What it is |
|---------|------------|
| **Tile-Blue** | #0083C1 rounded tile + white symbol (DHIS2-native) |
| **Tile-White** | White rounded tile + full-colour symbol |
| **Tile-Bleed** | Edge-to-edge #0083C1 + white symbol, 80% safe zone (maskable) |
| **Clear-Color** | Transparent, full-colour symbol |
| **Clear-Mono** | Transparent single-colour silhouette (adaptive: black on light, white on dark) |

`Tile-*` = has a background tile. `Clear-*` = transparent (no tile).

**Approved (CoDi/WP6):** Tile-Blue for the in-product icon; #0083C1 confirmed as the NeoIPC brand colour; symbol-only use is within the brand guidelines' approved cases.

## Masters (`masters/`)
Re-export / regenerate from these:
- `neoipc-icon-tile-blue.svg`
- `neoipc-icon-tile-white.svg`
- `neoipc-icon-tile-bleed.svg`
- `neoipc-icon-clear-color.svg`
- `neoipc-icon-clear-mono.svg` (uses `currentColor` — set `color` to recolour; defaults usable as black, white version on request)

## Deployed files (repo-root `../public/`)
**These filenames are fixed** — the DHIS2 App Platform and the favicon convention require these
exact names, so they are NOT renamed to the scheme. Each one's variant is noted below.

| File (fixed name) | Size | Variant used |
|-------------------|------|--------------|
| `dhis2-app-icon.png` | 48x48 | Tile-Blue |
| `favicon-16x16.png` | 16 | Tile-Blue |
| `favicon-32x32.png` | 32 | Tile-Blue |
| `favicon-48x48.png` | 48 | Tile-Blue |
| `favicon.ico` | 16/32/48 | Tile-Blue |
| `mstile-150x150.png` | 150 | Tile-Blue |
| `apple-touch-icon.png` | 180 | Tile-White (opaque) |
| `android-chrome-192x192.png` | 192 | Tile-White |
| `android-chrome-384x384.png` | 384 | Tile-White |
| `maskable-512x512.png` | 512 | Tile-Bleed |
| `safari-pinned-tab.svg` | vector | Clear-Mono (adaptive) |
| `icon.svg` | vector | Tile-Blue (SVG browser favicon) |

(`../public/neoipc-mono-white.png` — Clear-Mono, white — also ships as a brand asset for dark surfaces; it is not platform-wired.)

## Copyright & licensing
The NeoIPC symbol may be used alone per the brand guideline (NeoIPC Visual Guideline); its structure and proportions are unaltered here (recolour + matte only).

These icon masters, the App Hub logo, and every icon in `../public/` derived from them are **© Fondazione Penta ETS, all rights reserved**. They are an exception to this repository's MIT/CC-BY licensing and are used under the NeoIPC brand guideline — do not reuse, redistribute, or modify them outside this application; confirm any reuse with the NeoIPC / Penta team before publishing. See the repository-root [COPYRIGHT](../COPYRIGHT).
