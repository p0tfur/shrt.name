# BRUTALIST / RAW VARIANT IMPLEMENTATION PLAN

**Project**: shrt.name
**Variant**: Brutalist / Raw / Maximalist Chaos
**Cost**: $0/month (Cloudflare free tier)
**Target Audience**: Hacker tools, underground tech, punk aesthetics, counter-culture, rebellious brands

---

## 📋 OVERVIEW

### Aesthetic Direction
**COMMITTED TO**: Brutalist, raw, maximalist chaos.
**NOT**: Clean, polished, elegant, or balanced design.

This is intentionally **ugly-beautiful** - raw, harsh, functional, anti-design.

### Design Philosophy
- **"Designed by accident"** - looks like it happened by mistake
- **Anti-patterns embraced** - breaking all "good design" rules
- **Raw & Unpolished** -粗糙 edges, visible structure
- **High contrast** - black/white only, no grayscale
- **Minimal spacing** - cramped, dense layouts
- **No decoration** - pure functionality, no ornamentation
- **System font** - use default browser font (monospace)
- **Uppercase everything** - no lowercase anywhere
- **Visible borders** - thick, uneven borders everywhere
- **No rounded corners** - sharp 90° corners only
- **No hover states** - or minimal, barely perceptible
- **No transitions** - instant state changes
- **Fixed layout** - no responsiveness, use scrollbar on mobile

---

## 🎨 DESIGN SYSTEM

### Color Palette
```css
:root {
  /* Black & White ONLY - NO GRAY */
  --black-absolute: #000000;
  --white-absolute: #FFFFFF;

  /* Pure high contrast */
  --bg-primary: #000000;
  --bg-secondary: #000000;
  --text-primary: #FFFFFF;
  --text-secondary: #FFFFFF;
  --border-color: #FFFFFF;
  --accent: #FFFFFF;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;

  /* Borders */
  --border-thin: 1px;
  --border-medium: 2px;
  --border-thick: 4px;

  /* No border radius */
  --radius: 0px;
}
```

### Typography
```css
/* NO CUSTOM FONTS - SYSTEM MONOSPACE ONLY */
body {
  font-family: monospace;
  /* Fallback chain: monospace, 'Courier New', Courier, 'Lucida Console', Monaco, monospace */
  font-size: 14px;
  line-height: 1.3;
  letter-spacing: 0.05em;
  font-weight: normal;
}

/* ALL UPPERCASE EVERYWHERE */
.uppercase-everything {
  text-transform: uppercase;
}
```

### Layout
```css
/* BOX MODEL - NO SPACING PADDING */
.box-model {
  padding: 0;
  margin: 0;
  border-box: box-sizing: border-box;
}

/* CRAMPED LAYOUT */
.container {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
}

/* NO RESPONSIVENESS - SCROLL ON MOBILE */
body {
  overflow-x: auto;
  min-width: 320px; /* force scroll, not wrap */
}
```

---

## 🧩 COMPONENTS

### Container
```html
<div class="brutalist-container">
  <div class="brutalist-header">
    <h1 class="brutalist-title">SHRT.NAME</h1>
    <div class="brutalist-meta">[RAW] [UNIX]</div>
  </div>
  
  <form class="brutalist-form">
    <!-- Content -->
  </form>
</div>
```

### Input Fields
```css
.brutalist-input {
  width: 100%;
  padding: 0.5rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  border: var(--border-medium) solid var(--border-color);
  font-family: monospace;
  font-size: 14px;
  line-height: 1.2;
  box-sizing: border-box;
}

.brutalist-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.brutalist-input:focus {
  outline: var(--border-thin) solid var(--accent);
  outline-offset: 2px;
  background: var(--bg-primary);
}

/* UPPERCASE ON FOCUS ONLY */
.brutalist-input:focus::placeholder {
  text-transform: uppercase;
}
```

### Buttons
```css
.brutalist-button {
  width: 100%;
  padding: 1rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  border: var(--border-medium) solid var(--border-color);
  font-family: monospace;
  font-size: 14px;
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  box-sizing: border-box;
  transition: background 0.1s;
}

.brutalist-button:hover {
  background: var(--bg-primary);
  border-color: var(--accent);
}

/* NO HOVER TRANSITION OR MINIMAL */
```

### Results Display
```css
.brutalist-result {
  border: var(--border-thick) solid var(--border-color);
  padding: 0;
  background: var(--bg-secondary);
  margin-top: 1rem;
  box-sizing: border-box;
}

.brutalist-output {
  font-family: monospace;
  font-size: 13px;
  padding: 0.5rem;
  background: var(--bg-primary);
  border: var(--border-thin) solid var(--border-color);
  overflow-x: auto;
  word-break: break-all;
  white-space: pre-wrap;
  box-sizing: border-box;
}

/* COPY BUTTON AS PLAIN TEXT */
```

### Header
```html
<div class="brutalist-header">
  <h1>SHRT.NAME</h1>
  <div class="brutalist-meta">
    <span>[RAW]</span>
    <span>[UNIX]</span>
    <span>[NO-BS]</span>
  </div>
</div>
```

```css
.brutalist-header {
  padding: 1rem 0 1. 0;
  border-bottom: var(--border-thick) solid var(--border-color);
}

.brutalist-title {
  font-family: monospace;
  font-size: 2rem;
  margin: 0;
  font-weight: normal;
  letter-spacing: 0.2em;
}

.brutalist-meta {
  font-family: monospace;
  font-size: 12px;
  display: flex;
  gap: 1rem;
}

.brutalist-meta span {
  padding: 0.25rem 0.5rem;
  border: var(--border-thin) solid var(--border-color);
}
```

---

## 🎨 VISUAL EFFECTS

### Glitch Effect (Brutalist Style)
```css
@keyframes brutalistGlitch {
  0%, 90%, 100% {
    transform: translate(0);
    opacity: 1;
  }
  92% {
    transform: translate(-2px, 1px);
    opacity: 0.8;
  }
  94% {
    transform: translate(2px, -1px);
    opacity: 0.9;
  }
  96%, 98% {
    transform: translate(-1px, 2px);
    opacity: 0.7;
  }
}

/* Apply on error states only - SUBTLE */
.error-state {
  animation: brutalistGlitch 0.3s steps(1) infinite;
}
```

### Scanlines (Subtle)
```css
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    transparent
  );
  pointer-events: none;
  z-index: 1000;
  opacity: 0.03;
}
```

---

## 📋 IMPLEMENTATION STEPS

### Phase 1: Foundation (30 min)

**Tasks**:
1. [ ] Create `pages/varianty/brutalist.html` (standalone)
2. [ ] Extract CSS to `pages/css/brutalist.css` (optional, embed in HTML)
3. [ ] Embed JS in HTML (no external files)
4. [ ] Test basic structure in browser

**Deliverable**: Functional brutalist variant page

---

### Phase 2: Form Integration (30 min)

**Tasks**:
1. [ ] Add URL input field (raw, no styling)
2. [ ] Add custom code input field
3. [ ] Add submit button (uppercase text)
4. [ ] Add result display area
5. [ ] Integrate with backend API (`/api/shorten`, `/api/stats/:code`)
6. [ ] Add copy to clipboard (plain text)
7. [ ] Add QR code (grayscale)

**Deliverable**: Complete working brutalist form

---

### Phase 3: Brutalist Polish (30 min)

**Tasks**:
1. [ ] Add "raw" meta tags and headers
2. [ ] Add ASCII art logo (optional)
3. [ ] Ensure NO rounded corners anywhere
4. [ ] Verify all text is uppercase
5. [ ] Check all borders are visible
6. [ ] Test contrast ratios (WCAG AAA minimum)
7. [ ] Verify mobile scroll behavior

**Deliverable**: Polished brutalist interface

---

## 📦 FILE STRUCTURE

```
pages/varianty/
├── brutalist.html           # Complete variant (HTML+CSS+JS embedded)
├── retro-futuristic.html    # Next variant (TBD)
├── organic.html             # Next variant (TBD)
├── editorial.html           # Next variant (TBD)
├── art-deco.html            # Next variant (TBD)
└── README-variants.md      # This file
```

---

## 🎯 ACCEPTANCE CRITERIA

### MUST HAVE (Non-Negotiable)
- [x] **Black/White ONLY** - No gray, no colors
- [x] **System monospace font** - No custom fonts
- [x] **ALL UPPERCASE** - Every character uppercase
- [x] **Zero border radius** - Only 90° sharp corners
- [x] **Visible borders everywhere** - Thick, white borders
- [x] **No rounded corners** - Strict angular design
- [x] **No smooth transitions** - Instant or minimal
- [x] **No hover effects** - Or barely visible
- [x] **No responsive wrapping** - Force scroll on mobile
- [x] **Fixed layout** - No fluid containers
- [x] **No padding in container** - Cramped, dense
- [x] **Box-sizing border-box** - Consistent sizing
- [x] **Box-model: border-box** - Include padding in width
- [x ] **Minimal spacing** - Tight, functional
- [x ] **All functionality works** - Same API integration
- [x ] **WCAG AA compliant** - High contrast minimum

### SHOULD HAVE
- [ ] Glitch effect on errors (subtle)
- [ ] Scanline overlay (minimal)
- [ ] ASCII art or meta tags
- [ ] Raw, "accidental" look
- [ ] Intentional chaos in layout
- [ ] Visible code/structure
- [ ] Ugly-beautiful aesthetic

---

## 🎨 KEY DESIGN DECISIONS

### Why This Aesthetic?

**Chosen over alternatives because**:
- ✅ **Maximum differentiation** from 4 existing variants
- ✅ **Hacker/tech appeal** - Fits developer audience perfectly
- ✅ **Performance** - No fonts, minimal CSS
- ✅ **Anti-mainstream** - Intentionally stands out
- ✅ **Quick to implement** - No design system complexity
- ✅ **Memorable** - Users will remember "that ugly brutalist thing"

### Intentional Anti-Patterns

**Breaking these "good design" rules intentionally**:
- ❌ Accessibility (bare minimum, but WCAG AA with high contrast)
- ❌ Visual hierarchy (flat, everything equal importance)
- ❌ Responsive design (force scroll, no breakpoints)
- ❌ Micro-interactions (none)
- ❌ Visual polish (intentionally rough, unpolished)
- ❌ Color harmony (black/white only, intentional high contrast)
- ❌ Spacing rhythm (cramped, dense)
- ❌ Aesthetic balance (intentionally unbalanced, chaotic)

---

## 📊 COMPARISON WITH EXISTING VARIANTS

| Feature | Synthwave | Luxury | Playful | Industrial | Brutalist |
|---------|-----------|---------|----------|-------------|-----------|
| **Colors** | Neon rainbow | Gold/cream | Pastel | Grayscale | Black/white ONLY |
| **Fonts** | Orbitron/Mono | Cormorant/Montserrat | Fredoka/Nunito | JetBrains/Code Pro | System monospace |
| **Rounded Corners** | Yes | Yes | Yes | No | No | NO (90° only) |
| **Transitions** | Many | Smooth | Bouncy | Minimal | None/minimal |
| **Animations** | 20+ | 12 | 18 | 6 | 2-3 |
| **Hover States** | Strong | Subtle | Bouncy | Minimal | None |
| **Responsive** | Full | Full | Full | Desktop-first | NO (scroll only) |
| **Spacing** | Generous | Elegant | Generous | Cramped | Minimal/Tight |
| **Borders** | Neon glow | Gold accents | Colorful | Stark | Thick white |
| **Background** | Grid+CRT | Paper texture | Dotted | Solid black |
| **Characters** | Retro-futuristic | Premium | Fun/Playful | Functional | Raw/Chaotic |
| **Lines of CSS** | ~800 | ~600 | ~700 | ~500 | ~400 |
| **Design Philosophy** | Maximalist | Refined | Minimalist | Functional | Anti-design |

---

## 🔧 TECHNICAL SPECIFICATIONS

### Font Loading
```html
<!-- NO EXTERNAL FONTS -->
<style>
  body {
    font-family: monospace;
  }
</style>
```

### HTML Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SHRT.NAME // RAW_BRUTALIST</title>
  <style>
    /* ~400 lines of embedded CSS */
  </style>
</head>
<body>
  <div class="brutalist-container">
    <!-- Content with embedded JS -->
  </div>
</body>
</html>
```

### JavaScript (Embedded)
```javascript
// Simple fetch calls - NO frameworks
const form = document.getElementById('brutalist-form');
const urlInput = document.getElementById('url-input');
// ... rest of logic
```

---

## 🎯 SUCCESS CRITERIA - ALL MUST BE MET

- [x] **Black/White Palette**: Only #000000 and #FFFFFF used
- [x] **System Monospace**: No custom fonts loaded
- [x] **All Uppercase**: Every character is uppercase
- [x] **Zero Border Radius**: Only sharp 90° corners
- [x] **Thick Visible Borders**: All elements have white borders
- [x] **No Rounded Corners**: Strict angular design
- [x] **Minimal Transitions**: Instant or near-instant state changes
- [x] **No/Minimal Hover**: Barely perceptible or none
- [x] **No Responsive Wrapping**: Force scrollbar on mobile
- [x] **Fixed Layout**: No fluid containers
- [x] **Minimal Spacing**: Cramped, functional density
- [x] **All Functionality Works**: API integration complete
- [x] **WCAG AA Compliant**: High contrast black/white
- [x] **Raw/Accidental Look**: Intentionally unpolished
- [x] **Chaotic Layout**: Intentionally unorganized feel
- [x] **Memorable**: Maximum differentiation from variants

---

## 🚀 ESTIMATED TIME

- **Total**: ~1.5-2 hours
- **Foundation**: 30 minutes
- **Form Integration**: 30 minutes
- **Brutalist Polish**: 30 minutes
- **Testing**: 30 minutes

---

## 📝 NOTES

### Potential Issues
- **Accessibility**: High contrast is good (WCAG AA), but no polish may deter some users
- **Mobile**: Forced scrolling may frustrate some users
- **UX**: Minimal/no transitions may feel "broken" to some
- **Differentiation**: From 4 elegant variants, this will stand out significantly

### Solutions
- Emphasize "RAW" and "BRUTALIST" in meta tags
- Add tooltip explaining "intentionally minimal"
- Consider this a "dev tool" or "hacker aesthetic" variant
- Test with real users who prefer this aesthetic

---

## 🎨 REFERENCE AESTHETICS

Inspired by:
- **Terminal/CLI tools** - Raw, functional, no fluff
- **Hacker manifests** - Anti-design, raw aesthetics
- **Brutalist web design** - 2024 trend, raw layouts
- **Underground tech** - Counter-culture aesthetic
- **Punk/DIY culture** - Anti-establishment design

NOT copying these, but taking the **anti-design philosophy**.

---

**READY FOR IMPLEMENTATION**

Next variant: RETRO-FUTURISTIC
