# 🎨 INT Inc. Official Brand Kit v1.0.0

**Platform**: INT Inc. - Business Solutions You CAN Take for Granted  
**Website**: [intinc.com](https://intinc.com)  
**Tagline**: "Our Purpose is YOUR Business."

---

## 📋 Table of Contents

1. [Brand Overview](#brand-overview)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Logo & Brand Marks](#logo--brand-marks)
5. [Component Styling](#component-styling)
6. [Animation System](#animation-system)
7. [Voice & Tone](#voice--tone)
8. [Usage Guidelines](#usage-guidelines)
9. [Quick Reference](#quick-reference)

---

## 🎯 Brand Overview

### Mission

INT Inc.'s mission is to implement innovative, tailored solutions that support clients' growth while focusing on the details so clients can concentrate on what matters most – growing their business. When clients win, INT wins.

### Brand Promise

INT provides end-to-end business solutions covering:
- Information Security
- Technology Support
- Website Design & Development
- Branding & Content Creation
- Marketing Strategy
- Business Operations

### Brand Personality

| Attribute | Description |
|-----------|-------------|
| **Professional** | Demonstrates reliability and expertise through accredited partnerships (QuickBooks, Cisco, Microsoft) |
| **Partner-Oriented** | Positions itself as a long-term partner, measuring success by clients' success |
| **Innovative** | Leverages modern technology and creative solutions |
| **Approachable** | Uses friendly, conversational language without jargon |
| **Detail-Driven** | Embodies "The Dot" – living in the details and connecting ideas to execution |

---

## 🎨 Color System

### Primary Brand Colors

#### Primary Blue (#33475B)
**Main brand color** - Used for navigation, headings, backgrounds

```css
--int-primary-50:  #85A0BA;  /* Lightest */
--int-primary-100: #6E8EAE;
--int-primary-200: #537495;
--int-primary-300: #45607B;
--int-primary-400: #3C536B;
--int-primary-500: #33475B;  /* ★ MAIN */
--int-primary-600: #293A4A;
--int-primary-700: #202D3A;
--int-primary-800: #121920;
--int-primary-900: #050709;  /* Darkest */
```

**Usage**:
- Primary navigation bars
- Section headings
- Dark backgrounds
- Secondary text

---

#### Secondary Orange (#E27305)
**Call-to-action color** - Used for primary CTAs and highlights

```css
--int-secondary-50:  #FCCC9C;
--int-secondary-100: #FCBA79;
--int-secondary-200: #FAA047;
--int-secondary-300: #FA8C1F;
--int-secondary-400: #F97F06;
--int-secondary-500: #E27305;  /* ★ MAIN CTA */
--int-secondary-600: #C96604;
--int-secondary-700: #B05903;
--int-secondary-800: #884503;
--int-secondary-900: #653302;
```

**Usage**:
- Primary CTA buttons
- "The Dot" brand element
- Highlights and accents
- Hover states

---

#### Accent Green (#46A57B)
**Success & highlights** - Used for positive metrics and success states

```css
--int-accent-50:  #BBE2D1;
--int-accent-100: #A2D7BF;
--int-accent-200: #7EC8A7;
--int-accent-300: #61BC94;
--int-accent-400: #4FB488;
--int-accent-500: #46A57B;  /* ★ MAIN */
--int-accent-600: #3E936D;
--int-accent-700: #368160;
--int-accent-800: #2A644A;
--int-accent-900: #204B38;
```

**Usage**:
- Check-list icons
- Success messages
- Positive metrics
- Growth indicators

---

#### Support Blue (#529ADB)
**Links & dividers** - Used for secondary elements

```css
--int-support-50:  #E5F0F9;
--int-support-100: #C8DFF3;
--int-support-200: #9DC6EA;
--int-support-300: #7CB2E3;
--int-support-400: #67A6DF;
--int-support-500: #529ADB;  /* ★ SUPPORT */
--int-support-600: #3C8DD6;
--int-support-700: #2B81CE;
--int-support-800: #246CAD;
--int-support-900: #1D598F;
```

**Usage**:
- Hyperlinks
- Dividing lines
- Secondary buttons
- Info messages

---

### Semantic Colors

#### Success (Green)
```css
--int-success-500: #10B981;  /* Main success color */
```

#### Warning (Amber)
```css
--int-warning-500: #F59E0B;  /* Main warning color */
```

#### Error (Red)
```css
--int-error-500: #EF4444;  /* Main error color */
```

#### Info (Blue)
```css
--int-info-500: #3B82F6;  /* Main info color */
```

---

### Accessibility - Contrast Ratios

| Foreground | Background | Ratio | WCAG Status |
|------------|------------|-------|-------------|
| #333333 (Text) | #FFFFFF (Light) | 21:1 | ✅ AAA |
| #FFFFFF (White) | #33475B (Primary Blue) | 9.3:1 | ✅ AAA |
| #FFFFFF (White) | #E27305 (Orange) | 4.5:1 | ✅ AA |
| #33475B (Primary) | #F9FAFB (Surface) | 7.4:1 | ✅ AAA |

**All combinations maintain at least AA contrast (4.5:1)**

---

## 📝 Typography

### Font Families

#### Primary Font: Rubik
**Geometric sans-serif** for headings, CTAs, and UI elements

```css
font-family: 'Rubik', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
```

**Weights Available**: 300, 400, 500, 600, 700, 800, 900

**Usage**:
- All headings (H1-H6)
- Call-to-action buttons
- Navigation menus
- UI labels

---

#### Secondary Font: Roboto
**Clean, readable sans-serif** for body text

```css
font-family: 'Roboto', system-ui, -apple-system, sans-serif;
```

**Weights Available**: 300, 400, 500, 700, 900

**Usage**:
- Body text
- Paragraphs
- Descriptions
- Long-form content

---

#### Alternate Font: Roboto Condensed
**Condensed version** for narrow spaces

**Usage**:
- Tight layouts
- Sidebar labels
- Compact headings

---

### Typography Scale (Fluid & Responsive)

```css
--int-text-xs:   clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);   /* 12px → 14px */
--int-text-sm:   clamp(0.875rem, 0.8rem + 0.375vw, 1rem);     /* 14px → 16px */
--int-text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);       /* 16px → 18px */
--int-text-lg:   clamp(1.125rem, 1rem + 0.625vw, 1.25rem);    /* 18px → 20px */
--int-text-xl:   clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);     /* 20px → 24px */
--int-text-2xl:  clamp(1.5rem, 1.3rem + 1vw, 1.875rem);       /* 24px → 30px */
--int-text-3xl:  clamp(1.875rem, 1.6rem + 1.375vw, 2.25rem);  /* 30px → 36px */
--int-text-4xl:  clamp(2.25rem, 1.9rem + 1.75vw, 3rem);       /* 36px → 48px */
--int-text-5xl:  clamp(3rem, 2.5rem + 2.5vw, 3.75rem);        /* 48px → 60px */
--int-text-6xl:  clamp(3.75rem, 3rem + 3.75vw, 4.5rem);       /* 60px → 72px */
```

### Typography Hierarchy

```css
/* Hero Headline */
.int-hero-h1 {
  font-family: 'Rubik', sans-serif;
  font-size: var(--int-text-6xl);  /* 60px → 72px */
  font-weight: 800;
  line-height: 1.1;
}

/* Page Title */
.int-h1 {
  font-family: 'Rubik', sans-serif;
  font-size: var(--int-text-5xl);  /* 48px → 60px */
  font-weight: 700;
  line-height: 1.2;
}

/* Section Heading */
.int-h2 {
  font-family: 'Rubik', sans-serif;
  font-size: var(--int-text-4xl);  /* 36px → 48px */
  font-weight: 700;
  line-height: 1.25;
}

/* Subsection Heading */
.int-h3 {
  font-family: 'Rubik', sans-serif;
  font-size: var(--int-text-3xl);  /* 30px → 36px */
  font-weight: 600;
  line-height: 1.3;
}

/* Body Text */
.int-body {
  font-family: 'Roboto', sans-serif;
  font-size: var(--int-text-base);  /* 16px → 18px */
  font-weight: 400;
  line-height: 1.6;
}
```

---

## 🎯 Logo & Brand Marks

### The Dot Symbol

The orange dot is the cornerstone of INT's visual identity. It represents:
- The starting point of every idea and project
- Connection between concepts
- Attention to detail
- Planting a seed for growth

**Construction**:
```html
<span class="int-dot"></span>         <!-- Small (12px) -->
<span class="int-dot-lg"></span>      <!-- Large (24px) -->
```

**Color**: Always use Secondary Orange (#E27305)

---

### Logo Variations

#### Full Logo
**"INT"** in Primary Blue (#33475B) with orange dot accent

#### Logo + Tagline
Full logo plus **"Our Purpose is YOUR Business"**

#### Dot Only
Stand-alone orange dot for favicons and icons

#### Wordmark
"INT" in solid white or Primary Blue depending on background

---

### Logo Usage

✅ **Do**:
- Use full logo on light or dark backgrounds with sufficient contrast
- Maintain clear space (0.5× logo height on all sides)
- Use dot motif as design element throughout materials

❌ **Don't**:
- Alter colors or proportions
- Add drop shadows, gradients, or effects
- Place logo on busy backgrounds without contrast

---

## 🎨 Component Styling

### Buttons

#### Primary Button
```jsx
<Button className="bg-gradient-to-r from-[#FA8C1F] to-[#E27305] text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-[0_0_20px_rgba(226,115,5,0.5)] transition-all"
  style={{ fontFamily: "'Rubik', sans-serif" }}>
  Start Your Project
</Button>
```

**Or use utility class**:
```html
<button class="int-btn-primary">Start Your Project</button>
```

**Specifications**:
- Background: Gradient orange (#FA8C1F → #E27305)
- Text: White, Rubik Semi Bold
- Padding: 12px vertical, 24px horizontal
- Border radius: 12px (rounded-xl)
- Hover: Orange glow (20px blur)

---

#### Secondary Button
```html
<button class="int-btn-secondary">Learn More</button>
```

**Specifications**:
- Background: Gradient blue (#67A6DF → #529ADB)
- Same padding and border radius as primary

---

#### Accent Button
```html
<button class="int-btn-accent">Contact Us</button>
```

**Specifications**:
- Background: Gradient green (#61BC94 → #46A57B)

---

### Cards

#### Interactive Card
```jsx
<Card className="bg-[#F9FAFB] border border-[#33475B]/10 rounded-2xl p-6 
                 transition-all duration-300 
                 hover:border-[#E27305] hover:-translate-y-1 
                 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
  <CardContent>...</CardContent>
</Card>
```

**Or use utility class**:
```html
<div class="int-card-interactive">...</div>
```

**Specifications**:
- Background: Light surface (#F9FAFB)
- Border: 1px Primary Blue at 10% opacity
- Border radius: 16px
- Hover: Orange border, lift 4px, shadow

---

### Form Inputs

```jsx
<Input className="bg-[#F9FAFB] border border-[#33475B]/20 rounded-lg px-4 py-3 
                  text-[#33475B] placeholder:text-[#999999] 
                  focus:border-[#E27305] focus:ring-2 focus:ring-[#E27305]/30"
  style={{ fontFamily: "'Roboto', sans-serif" }} />
```

**Or use utility class**:
```html
<input class="int-focus-ring" />
```

---

### Badges

#### Success Badge
```html
<span class="int-badge-success">✓ Active</span>
```

#### Premium Badge
```html
<span class="int-badge-premium">PREMIUM</span>
```

---

## 🎬 Animation System

### Fade In Up
```css
.int-fade-in-up {
  animation: intFadeInUp 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
```

### Scale Pop
```css
.int-scale-pop {
  animation: intScalePop 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
```

### Pulse Glow
```css
.int-pulse-glow {
  animation: intPulseGlow 2s ease-in-out infinite;
}
```

### Hover Effects
```css
.int-hover-glow:hover {
  box-shadow: 0 0 20px rgba(226,115,5,0.5);
}

.int-hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
}

.int-hover-scale:hover {
  transform: scale(1.05);
}
```

### Staggered Animations
```html
<div class="int-stagger-fade">
  <div>Item 1</div>  <!-- Delays 0ms -->
  <div>Item 2</div>  <!-- Delays 100ms -->
  <div>Item 3</div>  <!-- Delays 200ms -->
</div>
```

---

## 🗣️ Voice & Tone

### Writing Guidelines

✅ **Do use**:
- **Active voice**: "INT designs solutions..." vs "Solutions are designed..."
- **Second person**: "You can focus on growth"
- **Clear benefits**: Highlight value ("improve efficiency by 30%")
- **Concrete numbers**: Quantify results when possible

❌ **Don't use**:
- Buzzwords ("game-changing", "revolutionary")
- Unexplained jargon
- Passive voice
- Vague claims ("great service")

---

### Messaging Framework

**Problem → Solution → Benefit**

Example:
- **Problem**: "Cyberattacks? Not on our watch."
- **Solution**: "We'll work with you to strengthen your security."
- **Benefit**: "...so you can stay focused on your business."

---

### Headline Formulas

1. **Value + Outcome**: "Streamline Operations and Save Hours Every Week"
2. **How-To**: "How to Secure Your Business Without a Dedicated IT Team"
3. **Number + Benefit**: "5 Ways to Turn Your Website into a Sales Machine"
4. **Question + Answer**: "Tired of Hidden Problems? Let's Find and Fix Them"

---

### Call-to-Action Patterns

**Strong CTAs**:
- "Start Your Project" ✅
- "Talk to an Expert" ✅
- "Get a Free Consultation" ✅
- "Request a Demo" ✅

**Avoid weak CTAs**:
- "Click Here" ❌
- "Submit" ❌
- "Learn More" (use sparingly)

---

## 📐 Usage Guidelines

### Spacing System (4px Grid)

```css
--int-space-1:  4px;    /* 0.25rem */
--int-space-2:  8px;    /* 0.5rem */
--int-space-3:  12px;   /* 0.75rem */
--int-space-4:  16px;   /* 1rem */
--int-space-6:  24px;   /* 1.5rem */
--int-space-8:  32px;   /* 2rem */
--int-space-12: 48px;   /* 3rem */
--int-space-16: 64px;   /* 4rem */
--int-space-24: 96px;   /* 6rem */
--int-space-32: 128px;  /* 8rem */
```

---

### Border Radius

```css
--int-radius-sm:   6px;     /* Small elements */
--int-radius:      12px;    /* Default */
--int-radius-lg:   16px;    /* Large cards */
--int-radius-xl:   20px;    /* Hero sections */
--int-radius-2xl:  24px;    /* Full sections */
--int-radius-full: 9999px;  /* Pills, badges */
```

---

### Shadows & Depth

```css
--int-shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.05);
--int-shadow:     0 4px 12px rgba(0, 0, 0, 0.15);
--int-shadow-md:  0 4px 6px -1px rgba(0, 0, 0, 0.1);
--int-shadow-lg:  0 8px 24px rgba(0, 0, 0, 0.25);
--int-shadow-xl:  0 20px 25px -5px rgba(0, 0, 0, 0.1);
--int-shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Glow Effects */
--int-glow-primary:   0 0 20px rgba(226,115,5,0.5);   /* Orange */
--int-glow-support:   0 0 20px rgba(82,154,219,0.4);  /* Blue */
--int-glow-accent:    0 0 20px rgba(70,165,123,0.4);  /* Green */
```

---

### Responsive Breakpoints

```css
/* Mobile First */
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Large Desktop */ }
@media (min-width: 1536px) { /* Extra Large */ }
```

---

### Grid Patterns

```jsx
/* 1 → 2 → 3 columns */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  ...
</div>

/* 1 → 2 → 4 columns (pricing) */
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
  ...
</div>
```

---

## 🎯 Quick Reference

### Most-Used Color Codes
```
Primary Blue:     #33475B
Secondary Orange: #E27305
Accent Green:     #46A57B
Support Blue:     #529ADB
Background:       #FFFFFF (light), #33475B (dark)
Text Primary:     #333333
Text Secondary:   #666666
Success:          #10B981
Warning:          #F59E0B
Error:            #EF4444
```

---

### Most-Used Classes
```css
.int-btn-primary       /* Primary CTA button */
.int-btn-secondary     /* Secondary button */
.int-card-interactive  /* Hover-responsive card */
.int-focus-ring        /* Input focus ring */
.int-text-gradient     /* Gradient headline */
.int-fade-in-up        /* Entrance animation */
.int-hover-glow        /* Glow on hover */
.int-hover-lift        /* Lift on hover */
.int-dot               /* The Dot brand element */
```

---

### Common Patterns

#### Hero Section
```jsx
<h1 className="int-hero-h1">
  <span className="int-text-gradient">
    INT Inc<span className="int-dot"></span>
  </span>
</h1>
```

#### Primary CTA
```html
<button class="int-btn-primary int-hover-glow">
  Start Your Project
</button>
```

#### Feature Card
```jsx
<div className="int-card-interactive int-fade-in-up">
  <div className="w-12 h-12 bg-gradient-to-br from-[#E27305] to-[#46A57B] rounded-xl 
                  flex items-center justify-center mb-4">
    <Icon className="h-6 w-6 text-white" />
  </div>
  <h3 className="int-h4 mb-2">Feature Title</h3>
  <p className="int-body text-[#666666]">Feature description...</p>
</div>
```

---

## ✅ Brand Compliance Checklist

### Visual Design
- [ ] Uses approved color palette (no unapproved colors)
- [ ] Uses approved fonts (Rubik/Roboto)
- [ ] Logo has proper clear space
- [ ] Contrast ratios meet WCAG 2.2 AA (4.5:1 minimum)
- [ ] Animations use approved classes
- [ ] Gradients use approved directions and colors

### Typography
- [ ] Headings use Rubik
- [ ] Body text uses Roboto
- [ ] Font weights follow approved set
- [ ] Text hierarchy is logical (H1 → H2 → H3)

### Components
- [ ] Buttons use INT gradient backgrounds
- [ ] Cards use light backgrounds with subtle borders
- [ ] Inputs have orange focus rings
- [ ] Badges use semantic colors correctly
- [ ] All components include explicit font-family

### Copy & Messaging
- [ ] Uses approved voice and tone
- [ ] Avoids buzzwords and superlatives
- [ ] Focuses on benefits, not just features
- [ ] Uses active voice and concrete language

### Accessibility
- [ ] All interactive elements are keyboard-accessible
- [ ] Focus states are visible
- [ ] Alt text on all images
- [ ] ARIA labels on icon-only buttons
- [ ] Semantic HTML structure

---

**INT Inc. Brand Kit v1.0.0**  
Build with precision. Partner for success. 🚀

For questions, contact the INT Inc. marketing team.  
This brand kit is the official source of truth for all INT visual identity.
