# INT Inc. Brand Quick Reference Card

**For Developers** - Keep this handy while coding!

---

## 🎨 Colors (Copy & Paste)

```css
/* PRIMARY COLORS */
#33475B  /* Primary Blue - Navigation, headings */
#E27305  /* Secondary Orange - CTAs, The Dot */
#46A57B  /* Accent Green - Success, highlights */
#529ADB  /* Support Blue - Links, dividers */

/* TEXT COLORS */
#333333  /* Primary text */
#666666  /* Secondary text */
#999999  /* Muted text */
#FFFFFF  /* White text */

/* BACKGROUNDS */
#FFFFFF  /* Light background */
#F9FAFB  /* Surface */
#33475B  /* Dark background (Primary Blue) */

/* SEMANTIC */
#10B981  /* Success */
#F59E0B  /* Warning */
#EF4444  /* Error */
#3B82F6  /* Info */
```

---

## 📝 Typography

```css
/* FONTS */
font-family: 'Rubik', system-ui, sans-serif;    /* Headings, CTAs */
font-family: 'Roboto', system-ui, sans-serif;   /* Body text */

/* CLASSES */
.int-hero-h1    /* 60-72px, Rubik Bold */
.int-h1         /* 48-60px, Rubik Bold */
.int-h2         /* 36-48px, Rubik Bold */
.int-h3         /* 30-36px, Rubik Semi Bold */
.int-h4         /* 24-30px, Rubik Semi Bold */
.int-body-lg    /* 18-20px, Roboto Regular */
.int-body       /* 16-18px, Roboto Regular */
.int-body-sm    /* 14-16px, Roboto Regular */
.int-caption    /* 12-14px, Roboto Regular */
```

---

## 🔘 Buttons

```jsx
/* PRIMARY BUTTON (Orange Gradient) */
<button className="int-btn-primary">
  Start Your Project
</button>

/* SECONDARY BUTTON (Blue Gradient) */
<button className="int-btn-secondary">
  Learn More
</button>

/* ACCENT BUTTON (Green Gradient) */
<button className="int-btn-accent">
  Contact Us
</button>

/* MANUAL (Tailwind) */
<button className="bg-gradient-to-r from-[#FA8C1F] to-[#E27305] 
                   text-white font-semibold px-6 py-3 rounded-xl 
                   hover:shadow-[0_0_20px_rgba(226,115,5,0.5)]"
  style={{ fontFamily: "'Rubik', sans-serif" }}>
  Button Text
</button>
```

---

## 🃏 Cards

```jsx
/* INTERACTIVE CARD */
<div className="int-card-interactive">
  Content here
</div>

/* MANUAL (Tailwind) */
<div className="bg-[#F9FAFB] border border-[#33475B]/10 
                rounded-2xl p-6 
                hover:border-[#E27305] hover:-translate-y-1 
                transition-all duration-300">
  Content here
</div>
```

---

## 🎭 Animations

```html
<!-- FADE IN UP -->
<div class="int-fade-in-up">Content</div>

<!-- SCALE POP -->
<div class="int-scale-pop">Content</div>

<!-- PULSE GLOW -->
<div class="int-pulse-glow">Content</div>

<!-- HOVER EFFECTS -->
<div class="int-hover-glow">Glows on hover</div>
<div class="int-hover-lift">Lifts on hover</div>
<div class="int-hover-scale">Scales on hover</div>

<!-- STAGGERED (Children animate sequentially) -->
<div class="int-stagger-fade">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

## 🎨 Gradients

```jsx
/* ORANGE GRADIENT (Primary CTA) */
className="bg-gradient-to-r from-[#FA8C1F] to-[#E27305]"

/* BLUE GRADIENT (Secondary) */
className="bg-gradient-to-r from-[#67A6DF] to-[#529ADB]"

/* GREEN GRADIENT (Accent) */
className="bg-gradient-to-r from-[#61BC94] to-[#46A57B]"

/* MULTI-COLOR (Hero text) */
className="bg-gradient-to-r from-[#E27305] via-[#529ADB] to-[#46A57B] 
           bg-clip-text text-transparent"

/* ICON BACKGROUND */
className="bg-gradient-to-br from-[#E27305] to-[#46A57B]"
```

---

## ● The Dot

```html
<!-- SMALL DOT (12px) -->
<span class="int-dot"></span>

<!-- LARGE DOT (24px) -->
<span class="int-dot-lg"></span>

<!-- MANUAL -->
<span style="width: 12px; height: 12px; 
              background: #E27305; 
              border-radius: 50%; 
              display: inline-block;"></span>
```

---

## 🏷️ Badges

```html
<!-- SUCCESS BADGE -->
<span class="int-badge-success">✓ Active</span>

<!-- PREMIUM BADGE -->
<span class="int-badge-premium">PREMIUM</span>

<!-- MANUAL -->
<span className="bg-[#10B981]/20 text-[#10B981] 
                 border border-[#10B981]/30 
                 px-3 py-1 rounded-full text-xs font-semibold"
      style={{ fontFamily: "'Rubik', sans-serif" }}>
  Badge Text
</span>
```

---

## 📏 Spacing (4px Grid)

```css
/* SPACING SCALE */
4px   /* var(--int-space-1)  or  p-1 */
8px   /* var(--int-space-2)  or  p-2 */
12px  /* var(--int-space-3)  or  p-3 */
16px  /* var(--int-space-4)  or  p-4 */
24px  /* var(--int-space-6)  or  p-6 */
32px  /* var(--int-space-8)  or  p-8 */
48px  /* var(--int-space-12) or  p-12 */
64px  /* var(--int-space-16) or  p-16 */
```

---

## 📐 Border Radius

```css
6px    /* var(--int-radius-sm)   or  rounded-sm */
12px   /* var(--int-radius)      or  rounded-xl */
16px   /* var(--int-radius-lg)   or  rounded-2xl */
20px   /* var(--int-radius-xl)   or  rounded-[20px] */
24px   /* var(--int-radius-2xl)  or  rounded-[24px] */
9999px /* var(--int-radius-full) or  rounded-full */
```

---

## 🎨 Shadows

```css
/* SHADOW SCALE */
var(--int-shadow-sm)   /* 0 1px 2px rgba(0,0,0,0.05) */
var(--int-shadow)      /* 0 4px 12px rgba(0,0,0,0.15) */
var(--int-shadow-md)   /* 0 4px 6px rgba(0,0,0,0.1) */
var(--int-shadow-lg)   /* 0 8px 24px rgba(0,0,0,0.25) */
var(--int-shadow-xl)   /* 0 20px 25px rgba(0,0,0,0.1) */
var(--int-shadow-2xl)  /* 0 25px 50px rgba(0,0,0,0.25) */

/* GLOW EFFECTS */
var(--int-glow-primary)  /* 0 0 20px rgba(226,115,5,0.5)  - Orange */
var(--int-glow-support)  /* 0 0 20px rgba(82,154,219,0.4) - Blue */
var(--int-glow-accent)   /* 0 0 20px rgba(70,165,123,0.4) - Green */
```

---

## 📱 Responsive Breakpoints

```css
/* MOBILE FIRST */
@media (min-width: 768px)  { /* md: Tablet */ }
@media (min-width: 1024px) { /* lg: Desktop */ }
@media (min-width: 1280px) { /* xl: Large Desktop */ }
@media (min-width: 1536px) { /* 2xl: Extra Large */ }

/* TAILWIND CLASSES */
sm:  /* 640px */
md:  /* 768px */
lg:  /* 1024px */
xl:  /* 1280px */
2xl: /* 1536px */
```

---

## 🎯 Common Patterns

### Hero Section
```jsx
<section className="py-20">
  <div className="container mx-auto px-4 text-center">
    <h1 className="int-hero-h1 mb-6">
      <span className="int-text-gradient">
        INT Inc<span className="int-dot"></span>
      </span>
    </h1>
    <p className="int-body-lg text-[#666666] mb-8 max-w-2xl mx-auto">
      Your tagline here
    </p>
    <button className="int-btn-primary">
      Start Your Project
    </button>
  </div>
</section>
```

### Feature Card
```jsx
<div className="int-card-interactive int-fade-in-up">
  <div className="w-12 h-12 bg-gradient-to-br from-[#E27305] to-[#46A57B] 
                  rounded-xl flex items-center justify-center mb-4">
    <Icon className="h-6 w-6 text-white" />
  </div>
  <h3 className="int-h4 mb-2" style={{ fontFamily: "'Rubik'" }}>
    Feature Title
  </h3>
  <p className="int-body text-[#666666]" style={{ fontFamily: "'Roboto'" }}>
    Feature description goes here...
  </p>
</div>
```

### CTA Section
```jsx
<section className="bg-[#F9FAFB] py-16">
  <div className="container mx-auto px-4 text-center">
    <h2 className="int-h2 mb-4">Ready to Get Started?</h2>
    <p className="int-body text-[#666666] mb-8">
      Join thousands of teams using INT Inc.
    </p>
    <div className="flex gap-4 justify-center">
      <button className="int-btn-primary">Start Free Trial</button>
      <button className="int-btn-secondary">Contact Sales</button>
    </div>
  </div>
</section>
```

---

## ✅ Checklist

Before pushing code, verify:

- [ ] Uses INT Inc. colors (#33475B, #E27305, #46A57B, #529ADB)
- [ ] Rubik for headings, Roboto for body
- [ ] Buttons use gradient backgrounds
- [ ] Interactive elements have hover states
- [ ] Orange (#E27305) focus rings on inputs
- [ ] "The Dot" appears in appropriate places
- [ ] Spacing follows 4px grid
- [ ] Border radius uses approved scale
- [ ] WCAG AA contrast ratios met
- [ ] Animations use approved classes

---

## 📚 Full Documentation

**Complete Guide**: `/docs/INT_BRAND_KIT.md`  
**Global Styles**: `/styles/globals.css`  
**Update Summary**: `/BRAND_UPDATE_COMPLETE.md`

---

**INT Inc. Brand Kit v1.0.0**  
🎨 "Our Purpose is YOUR Business."
