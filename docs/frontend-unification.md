# Frontend Unification (2026-03-17)

The `shrt.name` project previously supported multiple aesthetic variants (Synthwave, Luxury, Playful, Brutalist, etc.) served through a `switcher.js` component inside the Cloudflare Worker, as well as a static folder in `pages/varianty/`.

To ensure a single cohesive, beautiful, and highly usable layout, we have consolidated everything into the primary "Synthwave" aesthetic:

## What changed:
1. **Removed `workers/src/variants/` entirely**.
2. **Removed `pages/varianty/` entirely**.
3. **Cleaned up `pages/index.html`**:
   - Removed the JavaScript block that checks `localStorage` for `shrtname_variant`.
   - Removed the `.style-selector` bottom menu.
4. **Refactored `workers/src/index.js`**:
   - Dropped the `switcher.js` dependency.
   - Now serves `mainHTML` from a single `workers/src/ui.js` file (which is the cleaned up Synthwave layout).
5. **Fixed redirect bug**:
   - Fixed `shorten.js` to cache `original_url` instead of `url`, resolving a bug where users were not correctly redirected when hitting the KV cache.

The UI is now singularly focused and easier to maintain.
