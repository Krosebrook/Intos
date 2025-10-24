# INT OS v2.5 Scrollscape

**A comprehensive Figma-style design system and prototype** for 18 internal apps with fixed deep navy gradient background, animated particle field, and scrolling foreground UI that simulates live automations across HubSpot, Freshdesk, and Teams.

![INT OS Version](https://img.shields.io/badge/version-2.5.0-00E5FF)
![License](https://img.shields.io/badge/license-MIT-6B9FFF)
![Built with React](https://img.shields.io/badge/react-18.0+-B794F6)
![Supabase](https://img.shields.io/badge/backend-supabase-48E5AC)

---

## ✨ Features

### 🎨 Studio-Grade Design System
- **Official INT Inc. Brand Colors**: Medium blue (#529ADB), orange (#E27305), green (#46A57B)
- **Glassmorphism UI**: Modern glass-effect cards with backdrop blur
- **Animated Particles**: Canvas-based particle field with brand color palette
- **Responsive Design**: Mobile-first with full tablet and desktop support
- **PWA Ready**: Installable as native app on mobile and desktop

### 🏗️ Architecture
- **18 Internal Apps**: InsightHub, ResolveDesk, FlowForge, SyncBotPanel, and more
- **Three-Tier Backend**: React → Supabase Edge Functions → Postgres
- **Real-time Data**: Mock data with realistic automations and live updates
- **Command Palette**: ⌘K quick navigation across all apps
- **AI Assistant**: Collapsible right drawer with contextual help

### ♿ Accessibility & Standards
- **WCAG 2.2 AA Compliant**: High contrast ratios, semantic HTML
- **Keyboard Navigation**: Full keyboard support with shortcuts
- **RTL Support**: Right-to-left language compatibility
- **Reduced Motion**: Respects user motion preferences
- **Screen Reader Friendly**: ARIA labels and live regions

### 🛠️ Technology Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS 4.0
- **Components**: Shadcn/ui with Radix UI primitives
- **Backend**: Supabase (Postgres + Edge Functions + Auth + Storage)
- **Server**: Hono framework on Deno runtime
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Motion (Framer Motion)

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd int-os
npm install
```

### 2. Start Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see the app.

### 3. Test Backend Connection

```tsx
import { apiClient } from './lib/api-client';

// Test health endpoint
const health = await apiClient.get('/health');
console.log('Backend status:', health);
```

### 4. Build for Production

```bash
npm run build
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[📖 Documentation Index](docs/INDEX.md)** | Complete documentation guide |
| **[QUICKSTART.md](docs/QUICKSTART.md)** | 5-minute setup guide |
| **[BACKEND.md](docs/BACKEND.md)** | Complete backend documentation |
| **[API.md](docs/API.md)** | API reference and examples |
| **[EXAMPLES.md](docs/EXAMPLES.md)** | Real-world code examples |
| **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** | System architecture & design |
| **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** | Production deployment guide |

---

## 🏗️ Project Structure

```
int-os/
├── components/
│   ├── apps/              # 18 app components
│   ├── int-os/            # Core UI components
│   │   ├── ParticleField.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TopNav.tsx
│   │   ├── CommandPalette.tsx
│   │   └── RightAssistant.tsx
│   └── ui/                # Shadcn/ui components
├── lib/
│   ├── api-client.ts      # Backend API client
│   ├── constants.ts       # App definitions
│   └── mock-data.ts       # Mock data for demos
├── utils/supabase/
│   ├── client.tsx         # Supabase client (auth)
│   └── info.tsx           # Project credentials
├── supabase/functions/server/
│   ├── index.tsx          # Edge Function routes
│   └── kv_store.tsx       # KV store utilities
├── docs/                  # Documentation
└── styles/
    └── globals.css        # Design tokens & typography
```

---

## 🎯 18 Integrated Apps

| App | Description | Icon |
|-----|-------------|------|
| **InsightHub** | Real-time analytics and business intelligence | 📊 |
| **AcademyPortal** | Learning management and certification | 🎓 |
| **PulseBoard** | Team health and engagement metrics | 📈 |
| **ResolveDesk** | AI-powered support ticket management | 🎫 |
| **StrategyBoard** | OKRs, goals, and strategic planning | 🎯 |
| **FeedbackLoop** | Customer feedback and sentiment analysis | 💬 |
| **ConnectDesk** | CRM and contact management hub | 👥 |
| **SyncBotPanel** | Automation orchestration and bot management | 🤖 |
| **PulseChat** | Team communication and collaboration | 💬 |
| **CommandView** | System administration and operations | 💻 |
| **AssuranceBoard** | Compliance, security, and audit trails | 🛡️ |
| **BrainDock** | AI knowledge base and documentation | 🧠 |
| **FlowForge** | Workflow automation and process builder | 🔀 |
| **SentimentScope** | Emotion detection and sentiment tracking | 😊 |
| **AlertOps** | Incident management and on-call routing | 🔔 |
| **TriageLens** | Priority queue and ticket routing AI | 📋 |
| **PartnerHub** | Partner portal and collaboration workspace | 🤝 |
| **INT_Studio** | No-code app builder and customization | ✨ |

---

## 🔧 Backend Integration

### Key-Value Store

Store any data with simple key-value pairs:

```tsx
import { apiClient } from './lib/api-client';

// Set value
await apiClient.post('/kv/settings', {
  value: { theme: 'dark', language: 'en' }
});

// Get value
const response = await apiClient.get('/kv/settings');
console.log(response.value); // { theme: 'dark', language: 'en' }

// Get by prefix
const users = await apiClient.get('/kv/prefix/user:');
```

### Authentication

```tsx
import { createClient } from './utils/supabase/client';

const supabase = createClient();

// Sign in
const { data } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
});

// Make authenticated request
const profile = await apiClient.get(
  '/auth/profile',
  data.session.access_token
);
```

### React Hook

```tsx
import { useKVStore } from './lib/hooks/useKVStore';

function MyComponent() {
  const { data, loading, save } = useKVStore('preferences');

  return (
    <div>
      <p>Theme: {data?.theme}</p>
      <button onClick={() => save({ theme: 'dark' })}>
        Update
      </button>
    </div>
  );
}
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Open command palette |
| `⌘I` / `Ctrl+I` | Toggle AI assistant |
| `⌘B` / `Ctrl+B` | Toggle sidebar |
| `Esc` | Close modals/dialogs |

---

## 🎨 Color System

### Official INT Inc. Brand Colors

```css
/* Primary Brand Colors from intinc.com */
--int-dark-blue: #33475B;      /* Links, secondary elements */
--int-orange: #E27305;         /* CTA buttons, primary actions */
--int-green: #46A57B;          /* Success states, positive metrics */
--int-medium-blue: #529ADB;    /* Primary highlights, dividers */
--int-dark-grey: #333333;      /* Text, footer elements */
--int-light-grey: #DDDDDD;     /* Borders, dividers */
```

### Application Colors

```css
/* Functional Colors */
--int-primary: #529ADB;        /* Primary actions */
--int-secondary: #33475B;      /* Secondary elements */
--int-accent: #E27305;         /* Call-to-action buttons */
--success: #46A57B;            /* Success states */
```

### Background Colors

```css
--int-bg: #1A2F4D → #0F1E33;  /* Navy Gradient */
--int-surface: #2A4365;        /* Card Background */
--int-card: #334E7A;           /* Elevated Cards */
```

### Typography

- **Display**: Sora (headings, hero text)
- **UI**: Inter (body text, components)
- **Scale**: Automatic based on HTML elements (no manual font-size classes)

---

## 🔐 Security

- ✅ Row Level Security (RLS) ready
- ✅ Environment variables for sensitive keys
- ✅ CORS configured for production
- ✅ Supabase Auth with JWT tokens
- ✅ Service role key never exposed to frontend

---

## 📱 PWA Features

- **Installable**: Add to home screen on mobile/desktop
- **Offline Ready**: Service worker with cache strategies
- **Native Feel**: Standalone display mode
- **App Icons**: Multiple sizes for all devices
- **Manifest**: Full PWA manifest configuration

---

## 🧪 Testing

### Test Backend

```bash
curl https://fnmcgmotzlorfpgcpglc.supabase.co/functions/v1/make-server-07d6ee5a/health
```

### Test in Browser Console

```javascript
// Test API
fetch('https://fnmcgmotzlorfpgcpglc.supabase.co/functions/v1/make-server-07d6ee5a/health')
  .then(r => r.json())
  .then(console.log);
```

---

## 🚀 Deployment

Your app is automatically deployed via GitHub integration:

1. **Push to GitHub** → Triggers build
2. **Edge Function** → Auto-deployed
3. **Frontend** → Hosted on Supabase
4. **CDN** → Global content delivery

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for production checklist.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📝 License

MIT License - see LICENSE file for details

---

## 🙏 Acknowledgments

- **Shadcn/ui** for beautiful components
- **Supabase** for backend infrastructure
- **Tailwind CSS** for utility-first styling
- **Lucide** for icon system
- **Recharts** for data visualization

---

## 📞 Support

- **Documentation**: [docs/](docs/)
- **Issues**: GitHub Issues
- **Discord**: [Your Discord link]
- **Email**: support@intos.com

---

## 🗺️ Roadmap

- [ ] Real-time collaboration
- [ ] Advanced analytics dashboards
- [ ] Custom theme builder
- [ ] Plugin marketplace
- [ ] Mobile native apps
- [ ] Desktop Electron app

---

**Built with ❤️ for the INT OS team**

Version: 2.5.0 | Last Updated: October 24, 2025