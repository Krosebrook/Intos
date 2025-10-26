# 🎨 Visual Brand Reference - INT OS v2.5

**Quick reference for developers implementing INT Inc. brand**

---

## 🎯 COLOR PALETTE (Official)

### Primary Colors

```
Primary Blue (Main Brand)
━━━━━━━━━━━━━━━━━━━━━━━
#33475B
RGB: 51, 71, 91
Use: Headers, text, navigation, icons

Secondary Orange (Call-to-Action)
━━━━━━━━━━━━━━━━━━━━━━━
#E27305
RGB: 226, 115, 5
Use: CTAs, buttons, focus rings, The Dot

Accent Green (Success)
━━━━━━━━━━━━━━━━━━━━━━━
#46A57B
RGB: 70, 165, 123
Use: Success states, highlights, positive actions

Support Blue (Links)
━━━━━━━━━━━━━━━━━━━━━━━
#529ADB
RGB: 82, 154, 219
Use: Links, secondary actions, info states
```

---

## 🖼️ BACKGROUND SYSTEM

### Light Theme (Current)

```tsx
// Base background
bg-[#F9FAFB]  /* Light gray - professional, clean */

// Gradient overlay (60% opacity)
bg-gradient-to-br from-[#FFFFFF] via-[#F9FAFB] to-[#E5F0F9]

// Subtle pattern (30% opacity)
radial-gradient(circle at 1px 1px, #33475B08 1px, transparent 1px)
backgroundSize: '40px 40px'
```

**Result**: Clean, professional, with subtle depth

### Surface Colors

```
White surfaces:    #FFFFFF
Light gray:        #F9FAFB
Darker surface:    #F2F6F9
Border tint:       #E5E7EB
```

---

## 📝 TEXT COLORS

### Hierarchy

```tsx
// Primary text (headlines, important text)
text-[#33475B]  // Primary Blue - 10.12:1 contrast ✅ AAA

// Body text (paragraphs, descriptions)
text-[#666666]  // Gray - 5.52:1 contrast ✅ AA

// Muted text (captions, metadata)
text-[#999999]  // Light Gray - Use 18px+ only

// Links
text-[#529ADB]  // Support Blue - Always underline
hover:text-[#67A6DF]  // Lighter on hover
```

### Usage Guide

```tsx
// ✅ CORRECT
<h1 className="text-[#33475B]">Main Heading</h1>
<p className="text-[#666666]">Body paragraph text</p>
<a href="#" className="text-[#529ADB] underline">Link text</a>
<span className="text-[#999999] text-sm">Caption</span>

// ❌ WRONG
<p className="text-[#999999]">Body text</p>  // Too light for body text
<a href="#" className="text-[#529ADB]">Link</a>  // Missing underline
```

---

## 🎨 GRADIENT PATTERNS

### Primary Gradient (Orange → Green)

```tsx
// For CTAs, featured buttons
bg-gradient-to-br from-[#E27305] to-[#46A57B]

// Example
<button className="bg-gradient-to-br from-[#E27305] to-[#46A57B] text-white">
  Start Free Trial
</button>
```

### Secondary Gradient (Blue tones)

```tsx
// For subtle backgrounds
bg-gradient-to-br from-[#529ADB] to-[#33475B]

// For cards, panels
<div className="bg-gradient-to-br from-[#529ADB]/10 to-[#33475B]/10">
```

---

## 🔘 BUTTON STYLES

### Primary Button (CTA)

```tsx
<button className="px-6 py-3 bg-gradient-to-br from-[#E27305] to-[#46A57B] text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200" style={{ fontFamily: "'Rubik', sans-serif" }}>
  Get Started
</button>
```

### Secondary Button

```tsx
<button className="px-6 py-3 bg-[#529ADB] text-white rounded-lg font-semibold hover:bg-[#67A6DF] transition-colors" style={{ fontFamily: "'Rubik', sans-serif" }}>
  Learn More
</button>
```

### Outline Button

```tsx
<button className="px-6 py-3 border-2 border-[#33475B] text-[#33475B] rounded-lg font-semibold hover:bg-[#33475B] hover:text-white transition-all" style={{ fontFamily: "'Rubik', sans-serif" }}>
  View Details
</button>
```

### Ghost Button

```tsx
<button className="px-6 py-3 text-[#529ADB] hover:text-[#67A6DF] hover:bg-[#529ADB]/10 rounded-lg transition-all" style={{ fontFamily: "'Rubik', sans-serif" }}>
  Cancel
</button>
```

---

## 🎯 FOCUS STATES

### Orange Focus Ring (Brand Standard)

```tsx
// All interactive elements
className="focus:outline-none focus:ring-2 focus:ring-[#E27305] focus:ring-offset-2"

// Or use utility class
className="int-focus-ring"

// Defined in globals.css as:
.int-focus-ring:focus {
  outline: 2px solid #E27305;
  outline-offset: 2px;
}
```

---

## 📦 CARD STYLES

### Standard Card

```tsx
<div className="bg-white rounded-xl border border-[#33475B]/10 p-6 shadow-sm hover:shadow-md transition-shadow">
  <h3 className="text-[#33475B] mb-2" style={{ fontFamily: "'Rubik', sans-serif" }}>
    Card Title
  </h3>
  <p className="text-[#666666]" style={{ fontFamily: "'Roboto', sans-serif" }}>
    Card content goes here
  </p>
</div>
```

### Interactive Card

```tsx
<div className="bg-white rounded-xl border border-[#33475B]/10 p-6 shadow-sm hover:shadow-lg hover:border-[#E27305]/30 hover:-translate-y-1 transition-all duration-200 cursor-pointer">
  <h3 className="text-[#33475B] mb-2" style={{ fontFamily: "'Rubik', sans-serif" }}>
    Interactive Card
  </h3>
  <p className="text-[#666666]" style={{ fontFamily: "'Roboto', sans-serif" }}>
    Hover to see effect
  </p>
</div>
```

### Success Card

```tsx
<div className="bg-gradient-to-br from-[#46A57B]/5 to-[#46A57B]/10 rounded-xl border border-[#46A57B]/20 p-6">
  <h3 className="text-[#46A57B]" style={{ fontFamily: "'Rubik', sans-serif" }}>
    Success!
  </h3>
  <p className="text-[#666666]" style={{ fontFamily: "'Roboto', sans-serif" }}>
    Your action was completed
  </p>
</div>
```

---

## 🔗 BORDER STYLES

### Border Colors & Opacity

```tsx
// Subtle border (default)
border border-[#33475B]/10

// Medium border
border border-[#33475B]/20

// Strong border
border border-[#33475B]/30

// Accent borders
border-[#E27305]     // Orange
border-[#46A57B]     // Green
border-[#529ADB]     // Support Blue
```

---

## 📱 RESPONSIVE PATTERNS

### Mobile-First Approach

```tsx
// Mobile: Stack vertically
<div className="flex flex-col md:flex-row gap-4">
  
// Mobile: Full width, Desktop: Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  
// Mobile: Hidden, Desktop: Show
<div className="hidden md:block">
  
// Mobile: Show, Desktop: Hidden
<div className="block md:hidden">
```

---

## 🎭 SHADOW SYSTEM

### Elevation Levels

```tsx
// Level 1 - Subtle
shadow-sm
// Use: Cards at rest

// Level 2 - Medium
shadow-md
// Use: Hover states, raised cards

// Level 3 - Strong
shadow-lg
// Use: Modals, popovers, active cards

// Level 4 - Dramatic
shadow-xl
// Use: Full-screen modals, important dialogs

// Custom brand shadow (orange glow)
shadow-[0_0_20px_rgba(226,115,5,0.2)]
// Use: AI assistant, featured CTAs
```

---

## 🔤 TYPOGRAPHY SYSTEM

### Font Families

```tsx
// Headings (Rubik)
style={{ fontFamily: "'Rubik', system-ui, sans-serif" }}

// Body text (Roboto)
style={{ fontFamily: "'Roboto', system-ui, sans-serif" }}
```

### Heading Hierarchy

```tsx
// H1 - Page title
<h1 className="text-4xl md:text-6xl" style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 700, color: '#33475B' }}>
  
// H2 - Section title
<h2 className="text-3xl md:text-5xl" style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 600, color: '#33475B' }}>
  
// H3 - Subsection
<h3 className="text-2xl md:text-3xl" style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 600, color: '#33475B' }}>
  
// H4 - Card title
<h4 className="text-xl md:text-2xl" style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 600, color: '#33475B' }}>
```

### Body Text Sizes

```tsx
// Large body
<p className="text-lg" style={{ fontFamily: "'Roboto', sans-serif", color: '#666666' }}>

// Regular body (default)
<p className="text-base" style={{ fontFamily: "'Roboto', sans-serif", color: '#666666' }}>

// Small body
<p className="text-sm" style={{ fontFamily: "'Roboto', sans-serif", color: '#666666' }}>

// Caption/meta
<p className="text-xs" style={{ fontFamily: "'Roboto', sans-serif", color: '#999999' }}>
```

---

## 🎨 THE DOT (Brand Element)

### Implementation

```tsx
// Inline with heading
<h2 style={{ fontFamily: "'Rubik', sans-serif", color: '#33475B' }}>
  Powerful Features
  <span className="inline-block w-3 h-3 bg-[#E27305] rounded-full ml-2" />
</h2>

// As decorative element
<div className="flex items-center gap-2 mb-6">
  <div className="w-1 h-8 bg-gradient-to-b from-[#E27305] to-[#46A57B] rounded-full" />
  <h3 style={{ fontFamily: "'Rubik', sans-serif", color: '#33475B' }}>
    Section Title
  </h3>
</div>
```

---

## 🎯 SPACING SYSTEM

### Consistent Spacing

```tsx
// Extra small
gap-1 p-1    // 4px
gap-2 p-2    // 8px

// Small
gap-3 p-3    // 12px
gap-4 p-4    // 16px

// Medium (default)
gap-6 p-6    // 24px

// Large
gap-8 p-8    // 32px
gap-12 p-12  // 48px

// Extra large
gap-16 p-16  // 64px
gap-24 p-24  // 96px
```

---

## 📋 FORM ELEMENTS

### Input Fields

```tsx
<input
  type="text"
  className="w-full px-4 py-2 border border-[#33475B]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E27305] focus:border-transparent bg-white text-[#33475B]"
  style={{ fontFamily: "'Roboto', sans-serif" }}
  placeholder="Enter text..."
/>
```

### Select Dropdown

```tsx
<select
  className="w-full px-4 py-2 border border-[#33475B]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E27305] bg-white text-[#666666]"
  style={{ fontFamily: "'Roboto', sans-serif" }}
>
  <option>Choose option</option>
</select>
```

### Textarea

```tsx
<textarea
  className="w-full px-4 py-2 border border-[#33475B]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E27305] bg-white text-[#33475B] resize-none"
  style={{ fontFamily: "'Roboto', sans-serif" }}
  rows={4}
  placeholder="Enter message..."
/>
```

### Checkbox

```tsx
<label className="flex items-center gap-2 cursor-pointer">
  <input
    type="checkbox"
    className="w-5 h-5 border-2 border-[#33475B]/30 rounded focus:ring-2 focus:ring-[#E27305] checked:bg-gradient-to-br checked:from-[#E27305] checked:to-[#46A57B]"
  />
  <span className="text-[#666666]" style={{ fontFamily: "'Roboto', sans-serif" }}>
    I agree to terms
  </span>
</label>
```

---

## 🎨 QUICK COPY/PASTE PATTERNS

### Hero Section

```tsx
<section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFFFFF] via-[#F9FAFB] to-[#E5F0F9] px-4">
  <div className="max-w-5xl text-center">
    <h1 className="text-5xl md:text-7xl mb-6" style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 700, color: '#33475B' }}>
      Transform Your Business
      <span className="inline-block w-4 h-4 bg-[#E27305] rounded-full ml-3" />
    </h1>
    <p className="text-xl md:text-2xl mb-8 text-[#666666]" style={{ fontFamily: "'Roboto', sans-serif" }}>
      26 AI-powered applications in one unified platform
    </p>
    <button className="px-8 py-4 bg-gradient-to-br from-[#E27305] to-[#46A57B] text-white rounded-lg text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all" style={{ fontFamily: "'Rubik', sans-serif" }}>
      Start Free Trial
    </button>
  </div>
</section>
```

### Feature Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {features.map((feature) => (
    <div key={feature.id} className="bg-white rounded-xl border border-[#33475B]/10 p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
      <div className="w-12 h-12 bg-gradient-to-br from-[#E27305] to-[#46A57B] rounded-lg flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl mb-2" style={{ fontFamily: "'Rubik', sans-serif", color: '#33475B' }}>
        {feature.title}
      </h3>
      <p className="text-[#666666]" style={{ fontFamily: "'Roboto', sans-serif" }}>
        {feature.description}
      </p>
    </div>
  ))}
</div>
```

### Pricing Card

```tsx
<div className="bg-white rounded-2xl border-2 border-[#E27305] p-8 shadow-xl">
  <div className="inline-block px-4 py-1 bg-gradient-to-r from-[#E27305] to-[#46A57B] text-white rounded-full text-sm mb-4" style={{ fontFamily: "'Rubik', sans-serif" }}>
    Most Popular
  </div>
  <h3 className="text-2xl mb-2" style={{ fontFamily: "'Rubik', sans-serif", color: '#33475B' }}>
    Professional
  </h3>
  <div className="flex items-baseline mb-6">
    <span className="text-5xl" style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 700, color: '#33475B' }}>
      $79
    </span>
    <span className="text-xl ml-2 text-[#666666]">/month</span>
  </div>
  <button className="w-full py-3 bg-gradient-to-br from-[#E27305] to-[#46A57B] text-white rounded-lg font-semibold hover:shadow-lg transition-all" style={{ fontFamily: "'Rubik', sans-serif" }}>
    Get Started
  </button>
</div>
```

---

## ✅ CHECKLIST FOR NEW COMPONENTS

When creating new components, ensure:

- [ ] **Primary Blue (#33475B)** for main text
- [ ] **Gray (#666666)** for body text
- [ ] **Orange (#E27305)** for CTAs
- [ ] **Support Blue (#529ADB)** for links (underlined)
- [ ] **Rubik** font for headings
- [ ] **Roboto** font for body text
- [ ] **Orange focus rings** on interactive elements
- [ ] **White/Light backgrounds** (#FFFFFF, #F9FAFB)
- [ ] **Proper contrast** (4.5:1 minimum for text)
- [ ] **Hover states** on all interactive elements
- [ ] **Responsive** (mobile-first approach)
- [ ] **Accessible** (ARIA labels, keyboard navigation)

---

**Quick Reference**: Keep this guide open while coding for instant color/pattern lookups!

🎨 **"Brand Consistency = Professional Excellence"** - INT Inc.
