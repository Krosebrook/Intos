# INT OS v2.5 - Social Media Assets Guide

Complete guide for creating and using social media assets for INT OS v2.5.

---

## 📐 Asset Specifications

### Open Graph Images (Facebook, LinkedIn, Slack)

**Primary OG Image** (`/public/og-image.png`)
- **Size**: 1200 x 630 px
- **Format**: PNG or JPG
- **Max file size**: 8 MB
- **Aspect ratio**: 1.91:1
- **Text safe zone**: 1200 x 630 px (full canvas - text won't be cropped)

**Design Requirements**:
- INT OS logo in top left
- App name/tagline prominently displayed
- Brand colors: #E27305 (orange), #529ADB (blue), #46A57B (green)
- High contrast for readability
- No critical text in bottom 100px (mobile crop zone)

---

### Twitter Cards

**Twitter Card Image** (`/public/twitter-card.png`)
- **Size**: 1200 x 675 px (16:9 aspect ratio)
- **Format**: PNG, JPG, or WEBP
- **Max file size**: 5 MB
- **Minimum size**: 300 x 157 px

**Design Requirements**:
- Similar to OG image but 16:9 ratio
- Keep important content centered
- Test preview with Twitter Card Validator

---

### App-Specific OG Images

Each app landing page should have its own OG image:

```
/public/og/
├── insighthub.png       (1200 x 630)
├── workflowengine.png   (1200 x 630)
├── unifiedinbox.png     (1200 x 630)
├── calendarsync.png     (1200 x 630)
├── filevault.png        (1200 x 630)
├── analyticsstudio.png  (1200 x 630)
├── surveycenter.png     (1200 x 630)
└── ...
```

**Template for Each App**:
1. App icon (large, centered or left)
2. App name in brand font
3. Tagline/value proposition
4. Brand gradient background
5. "INT OS v2.5" logo

---

## 🎨 Design Templates

### Figma Template Structure

Create a Figma file with these frames:

**Frame 1: OG Image Master (1200 x 630)**
```
┌─────────────────────────────────────┐
│  INT OS Logo                        │
│                                     │
│         [APP ICON]                  │
│                                     │
│      InsightHub                     │
│   Real-time Analytics               │
│                                     │
│   [Key Feature Icons]               │
└─────────────────────────────────────┘
```

**Frame 2: Twitter Card Master (1200 x 675)**
```
┌─────────────────────────────────────┐
│  INT OS Logo                        │
│                                     │
│    [APP ICON]  InsightHub           │
│                Real-time Analytics   │
│                                     │
│   [Key Feature Icons]               │
└─────────────────────────────────────┘
```

**Frame 3: Instagram Post (1080 x 1080)**
```
┌─────────────────────────┐
│                         │
│      [APP ICON]         │
│                         │
│     InsightHub          │
│  Real-time Analytics    │
│                         │
│   [Feature List]        │
│                         │
│   INT OS v2.5           │
└─────────────────────────┘
```

---

## 🖼️ Brand Assets

### Logo Variations

**Primary Logo** (`/public/logo.png`)
- Full color on dark background
- SVG and PNG formats
- Sizes: 512px, 256px, 128px, 64px, 32px

**Logo White** (`/public/logo-white.png`)
- For dark backgrounds
- High contrast

**Logo Mark** (`/public/logo-mark.png`)
- Icon only (no text)
- For small spaces

---

### Color Palette

```css
/* INT OS Official Colors */
--primary-orange: #E27305;   /* Primary CTA, accents */
--navy-ink: #33475B;         /* Headers, primary text */
--medium-blue: #529ADB;      /* Data viz, links */
--green-success: #46A57B;    /* Positive metrics */
--light-grey: #DDDDDD;       /* Borders, subtle */
--dark-bg: #0F1E33;          /* Backgrounds */
```

### Typography

**Primary Font**: Inter, system-ui
- **Headings**: 700 (Bold)
- **Body**: 400 (Regular)
- **Captions**: 300 (Light)

**Fallback Stack**:
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 
             'Droid Sans', 'Helvetica Neue', sans-serif;
```

---

## 📱 Social Media Templates

### Facebook Post (1200 x 630)

**Announcement Template**:
```
🚀 Introducing [APP NAME]

[One-line value proposition]

✅ Feature 1
✅ Feature 2
✅ Feature 3

Try it free → intos.io/[app-name]

#BusinessIntelligence #Automation #AI
```

---

### Twitter/X Post (280 characters)

**Launch Template**:
```
🚀 NEW: [APP NAME] is live!

[Value proposition in 1 sentence]

✨ [Key benefit 1]
⚡ [Key benefit 2]
🎯 [Key benefit 3]

Start free trial → [link]

#[hashtag1] #[hashtag2]
```

**Thread Template**:
```
Tweet 1: Announcement
Tweet 2: Problem it solves
Tweet 3: Key features
Tweet 4: Customer benefit
Tweet 5: CTA + link
```

---

### LinkedIn Post

**Product Launch**:
```
We're excited to announce [APP NAME] – [tagline]

THE CHALLENGE:
[2-3 sentences about the problem]

OUR SOLUTION:
[APP NAME] helps teams:
• [Benefit 1]
• [Benefit 2]
• [Benefit 3]

KEY FEATURES:
✅ [Feature 1]
✅ [Feature 2]
✅ [Feature 3]

EARLY RESULTS:
• [Stat 1]
• [Stat 2]
• [Stat 3]

Ready to transform your [workflow/operations/etc.]?
👉 Start your free trial: intos.io/[app-name]

#BusinessIntelligence #AI #Automation #B2B
```

---

### Instagram Post (1080 x 1080)

**Carousel Design** (5 slides):
1. **Cover**: App icon + name + tagline
2. **Problem**: Visual of the pain point
3. **Solution**: How the app solves it
4. **Features**: 3-4 key features with icons
5. **CTA**: "Try free → intos.io"

**Caption Template**:
```
[Emoji] [APP NAME] is here!

[2-3 sentence description]

Swipe to see how it works →

Key features:
✨ [Feature 1]
⚡ [Feature 2]
🎯 [Feature 3]

Link in bio to start free trial!

#[hashtag1] #[hashtag2] #[hashtag3]
```

---

## 🎥 Video Assets

### Product Demo Videos

**Specs**:
- **Resolution**: 1920 x 1080 (1080p)
- **Format**: MP4 (H.264)
- **Duration**: 60-90 seconds
- **Frame rate**: 30 fps
- **Aspect ratios**: 16:9 (YouTube), 9:16 (Stories), 1:1 (Feed)

**Structure**:
1. **0-5s**: Hook (problem statement)
2. **5-15s**: Solution intro
3. **15-60s**: Feature walkthrough
4. **60-90s**: CTA + brand logo

---

### YouTube Thumbnail (1280 x 720)

**Design Elements**:
- Large, readable text (70-80pt)
- Contrasting colors
- Face or screenshot
- Brand logo in corner
- "NEW" or "FREE" badge if applicable

---

## 📊 Social Media Sizes Cheat Sheet

| Platform | Image Type | Size (px) | Aspect Ratio |
|----------|-----------|-----------|--------------|
| **Facebook** | Post Image | 1200 x 630 | 1.91:1 |
| **Facebook** | Cover Photo | 820 x 312 | 2.63:1 |
| **Twitter** | Post Image | 1200 x 675 | 16:9 |
| **Twitter** | Header | 1500 x 500 | 3:1 |
| **LinkedIn** | Post Image | 1200 x 627 | 1.91:1 |
| **LinkedIn** | Cover Photo | 1584 x 396 | 4:1 |
| **Instagram** | Feed Post | 1080 x 1080 | 1:1 |
| **Instagram** | Story | 1080 x 1920 | 9:16 |
| **Instagram** | Carousel | 1080 x 1080 | 1:1 |
| **YouTube** | Thumbnail | 1280 x 720 | 16:9 |
| **YouTube** | Channel Art | 2560 x 1440 | 16:9 |

---

## 🔧 Tools & Resources

### Design Tools

**Figma** (Recommended)
- Collaborative design
- Component libraries
- Export presets
- Template: [INT OS Social Media Kit](link)

**Canva**
- Quick social posts
- Templates available
- Brand kit integration

**Adobe Creative Suite**
- Photoshop: Detailed editing
- Illustrator: Logo variations
- After Effects: Video animations

---

### Image Optimization

**Before Uploading**:
```bash
# Optimize PNGs
pngquant og-image.png --output og-image-optimized.png

# Optimize JPGs
jpegoptim --max=85 og-image.jpg

# Convert to WebP
cwebp -q 85 og-image.png -o og-image.webp
```

**Online Tools**:
- [TinyPNG](https://tinypng.com/) - Compress PNGs/JPGs
- [Squoosh](https://squoosh.app/) - Image optimization
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - SVG optimization

---

## 🧪 Testing Tools

### Open Graph Testers

**Facebook Debugger**
- URL: https://developers.facebook.com/tools/debug/
- Clear cache and re-scrape

**LinkedIn Post Inspector**
- URL: https://www.linkedin.com/post-inspector/
- Validate OG tags

**Twitter Card Validator**
- URL: https://cards-dev.twitter.com/validator
- Test card previews

**General OG Checker**
- URL: https://www.opengraph.xyz/
- Multiple platform preview

---

## 📝 Asset Checklist

### For Each App Landing Page

- [ ] OG Image (1200 x 630)
- [ ] Twitter Card (1200 x 675)
- [ ] App Icon (512 x 512)
- [ ] Feature Screenshots (1920 x 1080)
- [ ] Demo Video (60-90s)
- [ ] Social Media Posts (3-5 variations)

### General Assets

- [ ] Primary logo (multiple sizes)
- [ ] Logo variations (white, color, mark)
- [ ] Brand gradient backgrounds
- [ ] Icon set (all app icons)
- [ ] Team photos
- [ ] Office/lifestyle photos

---

## 🎯 Content Calendar

### Launch Week

**Day 1 (Monday)**: Announcement
- Platform: All channels
- Content: Product launch post
- Asset: Primary OG image

**Day 2 (Tuesday)**: Feature Spotlight
- Platform: LinkedIn, Twitter
- Content: Deep dive on key feature
- Asset: Feature screenshot

**Day 3 (Wednesday)**: Customer Story
- Platform: Blog, LinkedIn
- Content: Early adopter testimonial
- Asset: Customer quote graphic

**Day 4 (Thursday)**: Behind the Scenes
- Platform: Instagram, Twitter
- Content: Development story
- Asset: Team photo/video

**Day 5 (Friday)**: Limited Offer
- Platform: All channels
- Content: Early bird discount
- Asset: Promo graphic

---

## 📈 Analytics Tracking

### UTM Parameters for Social Links

```
?utm_source=[platform]
&utm_medium=social
&utm_campaign=app_launch
&utm_content=[post_type]
```

**Example**:
```
https://intos.io/apps/insighthub
?utm_source=twitter
&utm_medium=social
&utm_campaign=insighthub_launch
&utm_content=announcement_post
```

### Track These Metrics

- **Impressions**: How many saw the post
- **Engagements**: Likes, shares, comments
- **Click-through rate**: Post → website
- **Conversion rate**: Click → trial signup

---

## 🔗 Quick Links

- **Figma Template**: [Social Media Kit](link)
- **Brand Guidelines**: [Brand Guide PDF](link)
- **Asset Library**: [Google Drive Folder](link)
- **Content Calendar**: [Airtable](link)

---

**Last Updated**: October 25, 2025  
**Version**: 2.5.0  
**Contact**: marketing@intinc.com
