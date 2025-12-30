# Opus 355 Design System

A comprehensive design system based on Client-first methodology, designed for consistency between Figma and code.

## Typography

### Font Families
- **Sans Serif**: Inter
- **Serif**: Playfair Display (headings)

### Type Scale

| Token | Size | Use Case |
|-------|------|----------|
| `text-xs` | 12px | Small labels, captions |
| `text-sm` | 14px | Body small, buttons |
| `text-base` | 16px | Body default |
| `text-lg` | 18px | Body large, intro text |
| `text-xl` | 20px | Subheadings |
| `text-2xl` | 24px | Card headings |
| `text-3xl` | 30px | Section headings (mobile) |
| `text-4xl` | 36px | Section headings |
| `text-5xl` | 48px | Display headings |
| `text-6xl` | 60px | Hero headings (tablet) |
| `text-7xl` | 72px | Hero headings (desktop) |

### Typography Utilities

```css
.heading-display    /* Hero: text-4xl md:text-6xl lg:text-7xl */
.heading-section    /* Sections: text-3xl md:text-5xl */
.heading-subsection /* Subsections: text-3xl md:text-4xl */
.heading-card       /* Cards: text-xl md:text-2xl */
.text-label         /* Eyebrow: uppercase tracking-[0.2em] */
.text-label-wide    /* Wide eyebrow: tracking-[0.3em] */
.text-body          /* Default body text */
.text-body-lg       /* Large body text */
.text-body-sm       /* Small body text */
```

## Color System

### Core Colors

| Token | HSL Value | Usage |
|-------|-----------|-------|
| `background` | hsl(0 0% 100%) | Page background (white) |
| `foreground` | hsl(0 0% 10%) | Primary text (near black) |
| `primary` | hsl(0 0% 20%) | Buttons, links, accents |
| `primary-foreground` | hsl(0 0% 100%) | Text on primary |
| `muted` | hsl(0 0% 96%) | Subtle backgrounds |
| `muted-foreground` | hsl(0 0% 45%) | Secondary text |
| `card` | hsl(0 0% 98%) | Card backgrounds |
| `border` | hsl(0 0% 92%) | Borders, dividers |
| `secondary` | hsl(35 20% 90%) | Warm neutral accents |

### Section Backgrounds

- **Light sections**: `bg-background` or `bg-muted/30`
- **Dark sections**: `bg-foreground text-background`

## Spacing Scale

| Token | Value | Pixels |
|-------|-------|--------|
| `space-xs` | 0.25rem | 4px |
| `space-sm` | 0.5rem | 8px |
| `space-md` | 1rem | 16px |
| `space-lg` | 1.5rem | 24px |
| `space-xl` | 2rem | 32px |
| `space-2xl` | 3rem | 48px |
| `space-3xl` | 4rem | 64px |
| `space-4xl` | 6rem | 96px |
| `space-section` | 6rem | 96px (py-24) |

## Layout Utilities

### Sections
```css
.section          /* py-24 */
.section-dark     /* py-24 bg-foreground text-background */
.container-page   /* container mx-auto px-6 */
```

### Grids
```css
.grid-cards      /* sm:grid-cols-2 lg:grid-cols-3 gap-8 */
.grid-features   /* sm:grid-cols-2 lg:grid-cols-4 gap-8 */
.grid-two-col    /* lg:grid-cols-2 gap-16 items-center */
```

## Button Styles

### Primary Button
```css
.btn-primary
/* bg-primary text-primary-foreground px-8 py-4 uppercase tracking-widest */
```

### Secondary Button
```css
.btn-secondary
/* border border-border px-8 py-4 uppercase tracking-widest */
```

### White Button (on dark backgrounds)
```css
.btn-white
/* bg-white text-black px-8 py-4 uppercase tracking-widest */
```

### Ghost Button
```css
.btn-ghost
/* text-primary uppercase tracking-widest, hover gap transition */
```

## Card Styles

### Interactive Card
```css
.card-interactive
/* bg-card border border-border hover:border-primary/50 transition */
```

### Static Card
```css
.card-static
/* bg-card border border-border p-8 */
```

## Component Patterns

### Hero Section Structure
```html
<section class="relative min-h-[70vh] flex items-center justify-center">
  <div class="absolute inset-0 z-0">
    <img class="w-full h-full object-cover" />
    <div class="hero-overlay" /> <!-- bg-black/50 -->
  </div>
  <div class="hero-content">
    <!-- Content centered, white text -->
  </div>
</section>
```

### Section with Eyebrow
```html
<section class="section">
  <div class="container-page">
    <div class="text-center mb-16">
      <span class="text-label mb-4 block">Eyebrow Text</span>
      <h2 class="heading-section">Section Title</h2>
    </div>
    <!-- Content -->
  </div>
</section>
```

### Feature/Process Card
```html
<div class="feature-card">
  <div class="feature-icon">
    <Icon class="w-8 h-8 text-primary" />
  </div>
  <div class="step-number">01</div>
  <h3 class="feature-title">Title</h3>
  <p class="feature-description">Description</p>
</div>
```

### Bullet List
```html
<ul class="list-bullet">
  <li>
    <span class="bullet-dot" />
    Item text
  </li>
</ul>
```

### Check List
```html
<ul class="list-check">
  <li>
    <Check class="w-5 h-5 text-primary" />
    <span>Item text</span>
  </li>
</ul>
```

## Responsive Breakpoints

| Breakpoint | Width | Common Usage |
|------------|-------|--------------|
| `sm` | 640px | 2-column grids |
| `md` | 768px | Larger typography |
| `lg` | 1024px | 3+ column grids, 2-col layouts |
| `xl` | 1280px | Max container widths |

## Animation Guidelines

- **Page transitions**: Framer Motion with 0.6-0.8s duration
- **Micro-interactions**: 0.3s transitions
- **Hover states**: transition-colors, transition-all
- **Stagger delays**: 0.1-0.2s between elements

## Figma Token Sync

These CSS custom properties can be synced to Figma using the Tokens Studio plugin:

```json
{
  "colors": {
    "background": { "value": "#ffffff" },
    "foreground": { "value": "#1a1a1a" },
    "primary": { "value": "#333333" },
    "muted": { "value": "#f5f5f5" },
    "muted-foreground": { "value": "#737373" },
    "border": { "value": "#ebebeb" }
  },
  "typography": {
    "fontFamilies": {
      "sans": { "value": "Inter" },
      "serif": { "value": "Playfair Display" }
    }
  },
  "spacing": {
    "xs": { "value": "4" },
    "sm": { "value": "8" },
    "md": { "value": "16" },
    "lg": { "value": "24" },
    "xl": { "value": "32" },
    "2xl": { "value": "48" },
    "3xl": { "value": "64" },
    "4xl": { "value": "96" }
  }
}
```
