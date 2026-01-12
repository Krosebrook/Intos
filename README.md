# INT OS v2.5 - Unified Operations Platform

A comprehensive React-based design system and prototype for 18 integrated internal apps with glassmorphic UI, animated particle effects, and scrolling foreground that simulates live automations across HubSpot, Freshdesk, and Microsoft Teams.

[![INT OS Version](https://img.shields.io/badge/version-2.5.0-00E5FF)](https://github.com/Krosebrook/Intos)
[![Built with React](https://img.shields.io/badge/react-18.3+-B794F6)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/typescript-5.0+-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/tailwind-4.0-38bdf8)](https://tailwindcss.com/)

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Krosebrook/Intos.git
cd Intos

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Build for Production

```bash
npm run build
```

## ✨ Features

### Studio-Grade Design System
- **Official INT Inc. Brand Colors**: Medium blue (#529ADB), orange (#E27305), green (#46A57B)
- **Glassmorphism UI**: Modern glass-effect cards with backdrop blur
- **Animated Particles**: Canvas-based particle field with brand color palette
- **Responsive Design**: Mobile-first with full tablet and desktop support
- **PWA Ready**: Installable as native app on mobile and desktop

### Architecture
- **18 Internal Apps**: InsightHub, ResolveDesk, FlowForge, SyncBotPanel, and more
- **Real-time Data**: Mock data with realistic automations and live updates
- **Command Palette**: ⌘K quick navigation across all apps
- **AI Assistant**: Collapsible right drawer with contextual help

### Accessibility & Standards
- **WCAG 2.2 AA Compliant**: High contrast ratios, semantic HTML
- **Keyboard Navigation**: Full keyboard support with shortcuts
- **Screen Reader Friendly**: ARIA labels and live regions

### Technology Stack
- **Frontend**: React 18, TypeScript, Vite
- **Components**: Shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS 4.0
- **Icons**: Lucide React
- **Charts**: Recharts
- **Backend**: Supabase (optional)

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Open command palette |
| `⌘I` / `Ctrl+I` | Toggle AI assistant |
| `⌘B` / `Ctrl+B` | Toggle sidebar |
| `Esc` | Close modals/dialogs |

## 🎨 18 Integrated Apps

- **InsightHub** - Real-time analytics and business intelligence
- **AcademyPortal** - Learning management and certification
- **PulseBoard** - Team health and engagement metrics
- **ResolveDesk** - AI-powered support ticket management
- **StrategyBoard** - OKRs, goals, and strategic planning
- **FeedbackLoop** - Customer feedback and sentiment analysis
- **ConnectDesk** - CRM and contact management hub
- **SyncBotPanel** - Automation orchestration and bot management
- **PulseChat** - Team communication and collaboration
- **CommandView** - System administration and operations
- **AssuranceBoard** - Compliance, security, and audit trails
- **BrainDock** - AI knowledge base and documentation
- **FlowForge** - Workflow automation and process builder
- **SentimentScope** - Emotion detection and sentiment tracking
- **AlertOps** - Incident management and on-call routing
- **TriageLens** - Priority queue and ticket routing AI
- **PartnerHub** - Partner portal and collaboration workspace
- **INT_Studio** - No-code app builder and customization

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── apps/           # 18 app components
│   │   ├── int-os/         # Core UI components
│   │   ├── ui/             # Shadcn/ui components
│   │   └── integrations/   # Integration wizards
│   ├── lib/
│   │   ├── constants.ts    # App definitions
│   │   └── mock-data.ts    # Mock data for demos
│   ├── utils/              # Utility functions
│   ├── styles/             # Global styles
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
└── docs/                   # Documentation

```

## 🎯 Color System

### Primary Brand Colors
```css
--int-dark-blue: #33475B;      /* Links, secondary elements */
--int-orange: #E27305;         /* CTA buttons, primary actions */
--int-green: #46A57B;          /* Success states, positive metrics */
--int-medium-blue: #529ADB;    /* Primary highlights, dividers */
```

## 📚 Documentation

For more detailed documentation, see the `/src/docs` directory:
- Architecture and design decisions
- API integration guides
- Component documentation
- Deployment guide

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is part of the Master Figma File Creation bundle.
Original design: https://www.figma.com/design/Qc1K0KxQ6PVpr4GcnvI9uw/Master-Figma-File-Creation

## 🙏 Acknowledgments

- **Shadcn/ui** for beautiful component library
- **Tailwind CSS** for utility-first styling
- **Lucide** for icon system
- **Recharts** for data visualization
- **Radix UI** for accessible primitives

---

**Built with ❤️ for the INT OS team**
  