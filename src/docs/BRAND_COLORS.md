# INT Inc. Brand Colors - Implementation Guide

Complete reference for using official INT Inc. brand colors from intinc.com in INT OS v2.5.

---

## 🎨 Official Brand Palette

These colors are defined in the WordPress/Divi child theme and form the core visual identity of INT Inc.

### Primary Brand Colors

| Color Name | Hex Value | Usage | CSS Variable |
|------------|-----------|-------|--------------|
| **Dark Blue** | `#33475B` | Links, secondary elements | `--int-dark-blue` |
| **Orange** | `#E27305` | CTA buttons, primary actions | `--int-orange` |
| **Green** | `#46A57B` | Success states, check icons | `--int-green` |
| **Medium Blue** | `#529ADB` | Highlights, dividers, primary | `--int-medium-blue` |
| **Dark Grey** | `#333333` | Footer text, body copy | `--int-dark-grey` |
| **Light Grey** | `#DDDDDD` | Borders, dividers | `--int-light-grey` |

---

## 📐 Color Usage Guidelines

### Primary Actions
```css
/* Use Medium Blue for primary buttons and highlights */
background-color: var(--int-primary);      /* #529ADB */
background-color: var(--int-medium-blue);  /* Same */

/* Hover state */
background-color: var(--int-primary-hover); /* #6AAEE5 */
```

**Example:**
```tsx
<Button className="bg-[#529ADB] hover:bg-[#6AAEE5]">
  Primary Action
</Button>
```

---

### Call-to-Action Buttons
```css
/* Use Orange for important CTAs */
background-color: var(--int-accent);       /* #E27305 */
background-color: var(--int-orange);       /* Same */

/* Hover state */
background-color: var(--int-accent-hover); /* #F08515 */
```

**Example:**
```tsx
<Button className="bg-[#E27305] hover:bg-[#F08515]">
  Get Started
</Button>
```

---

### Success States
```css
/* Use Green for positive feedback */
color: var(--success);                     /* #46A57B */
background-color: var(--success-bg);       /* #46A57B30 (with transparency) */
```

**Example:**
```tsx
<Alert className="border-[#46A57B] bg-[#46A57B]/10">
  <CheckCircle className="text-[#46A57B]" />
  <span>Success! Changes saved.</span>
</Alert>
```

---

### Links & Secondary Elements
```css
/* Use Dark Blue for links and secondary actions */
color: var(--int-secondary);               /* #33475B */
color: var(--int-dark-blue);               /* Same */

/* Hover state */
color: var(--int-secondary-hover);         /* #45596D */
```

**Example:**
```tsx
<a href="#" className="text-[#33475B] hover:text-[#45596D] hover:underline">
  Learn more
</a>
```

---

### Borders & Dividers
```css
/* Use Light Grey for subtle borders */
border-color: var(--int-light-grey);       /* #DDDDDD */
border-color: var(--border-default);       /* rgba(221, 221, 221, 0.15) - with transparency */
```

**Example:**
```tsx
<div className="border border-white/15 rounded-lg">
  {/* Content */}
</div>
```

---

## 🎯 Functional Color Mapping

INT OS maps brand colors to functional roles:

### Interactive States

| State | Color | Variable | Hex |
|-------|-------|----------|-----|
| **Primary** | Medium Blue | `--int-primary` | `#529ADB` |
| **Primary Hover** | Lighter Blue | `--int-primary-hover` | `#6AAEE5` |
| **Secondary** | Dark Blue | `--int-secondary` | `#33475B` |
| **Accent/CTA** | Orange | `--int-accent` | `#E27305` |
| **Success** | Green | `--success` | `#46A57B` |
| **Focus Ring** | Medium Blue | `--focus-ring` | `#529ADB` |
| **Border Hover** | Medium Blue | `--border-hover` | `rgba(82, 154, 219, 0.5)` |
| **Border Active** | Orange | `--border-active` | `rgba(226, 115, 5, 0.8)` |

---

## 📊 Color Contrast & Accessibility

All brand colors meet WCAG 2.2 AA standards when used correctly:

### Light Text on Dark Background ✅

```css
/* White text on Dark Blue */
color: #FFFFFF;
background: #33475B;
/* Contrast ratio: 8.72:1 (AAA) */

/* White text on Medium Blue */
color: #FFFFFF;
background: #529ADB;
/* Contrast ratio: 3.24:1 (AA for large text) */
```

### Dark Text on Light Background ✅

```css
/* Dark Grey text on white */
color: #333333;
background: #FFFFFF;
/* Contrast ratio: 12.63:1 (AAA) */
```

### Color on Color ⚠️

```css
/* Orange on Medium Blue */
color: #E27305;
background: #529ADB;
/* Contrast ratio: 2.1:1 (Fails AA - use with caution) */
```

**Recommendation:** Always pair brand colors with white or dark backgrounds, not with each other.

---

## 🎨 Component Examples

### Primary Button
```tsx
<Button className="bg-[#529ADB] hover:bg-[#6AAEE5] text-white">
  Primary Action
</Button>
```

### CTA Button
```tsx
<Button className="bg-[#E27305] hover:bg-[#F08515] text-white shadow-lg">
  Get Started
</Button>
```

### Success Badge
```tsx
<Badge className="bg-[#46A57B]/20 text-[#46A57B] border-[#46A57B]">
  Completed
</Badge>
```

### Info Card
```tsx
<Card className="border-[#529ADB] bg-[#529ADB]/5">
  <CardHeader>
    <Info className="text-[#529ADB]" />
    <h3>Information</h3>
  </CardHeader>
  <CardContent>
    Important details here...
  </CardContent>
</Card>
```

### Link
```tsx
<a href="#" className="text-[#33475B] hover:text-[#529ADB] underline">
  Read documentation
</a>
```

---

## 🖼️ Particle Animation Colors

The ParticleField component uses brand colors:

```tsx
// Primary particles
color: '#529ADB'  // Medium Blue

// Secondary particles  
color: '#33475B'  // Dark Blue

// Accent particles
color: '#E27305'  // Orange
```

**Distribution:**
- 60% Medium Blue (#529ADB)
- 25% Dark Blue (#33475B)
- 15% Orange (#E27305)

---

## 📱 Status & Semantic Colors

### Success
```css
--success: #46A57B;           /* INT Inc. Green */
--success-bg: #46A57B30;      /* 30% opacity */
```

**Usage:** Completed tasks, positive metrics, check marks

### Warning
```css
--warning: #F5A623;           /* Warm amber (complements orange) */
--warning-bg: #F5A62330;
```

**Usage:** Attention needed, pending states

### Error
```css
--error: #E85D75;             /* Soft red (not from brand, but complements) */
--error-bg: #E85D7530;
```

**Usage:** Errors, critical alerts, failed states

### Info
```css
--info: #529ADB;              /* Medium Blue */
--info-bg: #529ADB30;
```

**Usage:** Informational messages, tips, helpers

---

## 🎭 Dark Theme Implementation

INT OS uses a dark navy background to make brand colors pop:

### Background Gradient
```css
background: linear-gradient(
  180deg, 
  #1A2F4D 0%,    /* Navy top */
  #0F1E33 100%   /* Darker navy bottom */
);
```

### Surface Colors
```css
--int-surface: #2A4365;       /* Card backgrounds */
--int-card: #334E7A;          /* Elevated cards */
```

### Text Colors
```css
--int-text: #FFFFFF;          /* Primary text */
--int-subtext: #E2E8F0;       /* Secondary text */
--int-muted: #CBD5E0;         /* Muted text */
```

---

## 🔧 Tailwind Custom Colors

To use brand colors in Tailwind classes, reference them directly:

```tsx
// Background
className="bg-[#529ADB]"

// Text
className="text-[#E27305]"

// Border
className="border-[#46A57B]"

// With opacity
className="bg-[#529ADB]/20"

// Hover
className="hover:bg-[#6AAEE5]"
```

Or use CSS variables:
```tsx
className="bg-[var(--int-primary)]"
```

---

## 📋 Quick Reference Table

| Use Case | Color | Hex | Variable |
|----------|-------|-----|----------|
| Primary button | Medium Blue | #529ADB | `--int-primary` |
| CTA button | Orange | #E27305 | `--int-accent` |
| Success message | Green | #46A57B | `--success` |
| Link | Dark Blue | #33475B | `--int-secondary` |
| Border | Light Grey | #DDDDDD | `--int-light-grey` |
| Focus ring | Medium Blue | #529ADB | `--focus-ring` |
| Scrollbar | Medium Blue | #529ADB | `--int-medium-blue` |

---

## ✅ Do's and Don'ts

### ✅ Do:
- Use Orange (#E27305) for primary CTAs and important actions
- Use Medium Blue (#529ADB) for interactive elements and highlights
- Use Green (#46A57B) for success states and positive feedback
- Use Dark Blue (#33475B) for links and secondary elements
- Maintain sufficient contrast with backgrounds
- Test colors with accessibility tools

### ❌ Don't:
- Mix brand colors as text and background (low contrast)
- Use brand colors for decorative purposes only
- Override brand colors without design approval
- Use colors outside the official palette
- Forget to test accessibility

---

## 🔍 Testing Colors

### Browser DevTools
```javascript
// Test color contrast
getComputedStyle(element).color
getComputedStyle(element).backgroundColor
```

### Accessibility Tools
- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Chrome DevTools**: Lighthouse accessibility audit
- **Browser Extensions**: axe DevTools, WAVE

---

## 📞 Questions?

For questions about brand color usage:
- **Design Team**: design@intinc.com
- **Brand Guidelines**: intinc.com/brand
- **Developer Docs**: [ARCHITECTURE.md](ARCHITECTURE.md)

---

**Last Updated**: October 24, 2025  
**Version**: 2.5.0
