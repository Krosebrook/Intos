# Changelog

All notable changes to INT OS v2.5 Scrollscape will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.5.1] - 2025-10-24

### 🎨 Brand Color System Update

Official INT Inc. brand colors from intinc.com have been integrated throughout the entire design system.

### Changed

#### Color System
- **Updated Primary Colors**: Now using official INT Inc. brand palette
  - Primary: #529ADB (Medium Blue) - from intinc.com footer dividers
  - Secondary: #33475B (Dark Blue) - from intinc.com links
  - Accent/CTA: #E27305 (Orange) - from intinc.com CTA buttons
  - Success: #46A57B (Green) - from intinc.com check icons
  - Borders: #DDDDDD (Light Grey) - from intinc.com dividers

- **Updated Design Tokens** (`/styles/globals.css`):
  ```css
  --int-dark-blue: #33475B      /* Links, secondary elements */
  --int-orange: #E27305         /* CTA buttons */
  --int-green: #46A57B          /* Success states */
  --int-medium-blue: #529ADB    /* Primary actions */
  --int-dark-grey: #333333      /* Text */
  --int-light-grey: #DDDDDD     /* Borders */
  ```

- **Updated Interactive States**:
  - Focus ring: Now uses Medium Blue (#529ADB)
  - Border hover: Medium Blue with transparency
  - Border active: Orange (#E27305) with transparency
  - Scrollbar: Medium Blue (#529ADB)

#### Documentation
- **Added** [BRAND_COLORS.md](docs/BRAND_COLORS.md) - Complete brand color implementation guide
- **Updated** README.md - New color system section
- **Updated** Color references throughout all documentation

### Maintained
- Dark navy gradient background (#1A2F4D → #0F1E33) - unchanged
- Glassmorphism effects - unchanged
- All component functionality - unchanged
- WCAG 2.2 AA compliance - maintained with new colors

---

## [2.5.0] - 2025-10-24

### 🎉 Initial Complete Release

This is the first complete release of INT OS v2.5 Scrollscape with full backend integration.

### Added

#### Backend Infrastructure
- **Supabase Integration**: Full three-tier architecture (React → Edge Functions → Postgres)
- **Edge Function Server**: Hono-based REST API with KV store endpoints
- **API Client**: Singleton API client for frontend-backend communication
- **Supabase Client**: Frontend auth and storage client with helper functions
- **KV Store Utilities**: Complete CRUD operations for key-value data storage

#### Frontend Features
- **18 App Pages**: Complete suite of internal applications
  - InsightHub (Analytics)
  - ResolveDesk (Support Tickets)
  - ConnectDesk (CRM)
  - FlowForge (Workflow Automation)
  - SentimentScope (Sentiment Analysis)
  - AlertOps (Incident Management)
  - SyncBotPanel (Bot Management)
  - AcademyPortal (Learning Management)
  - PulseBoard (Team Health)
  - BrainDock (Knowledge Base)
  - TriageLens (Ticket Routing)
  - Plus 7 more generic apps

- **Core UI Components**:
  - Command Palette (⌘K)
  - Collapsible Sidebar
  - AI Assistant Drawer
  - Top Navigation
  - Particle Animation Field
  - Welcome Modal
  - Landing Page with PWA install

- **Design System**:
  - Vibrant color palette (Electric Cyan #00E5FF primary)
  - Glassmorphism cards with backdrop blur
  - Bright particles with enhanced glow effects
  - Responsive mobile-first design
  - WCAG 2.2 AA compliant contrast ratios

#### Documentation
- **Complete Documentation Suite**:
  - README.md - Project overview
  - docs/INDEX.md - Documentation index and guide
  - docs/QUICKSTART.md - 5-minute setup guide
  - docs/BACKEND.md - Complete backend documentation (45+ pages)
  - docs/API.md - Full API reference with examples
  - docs/EXAMPLES.md - Real-world code examples (Todo app, Auth, File upload, etc.)
  - docs/ARCHITECTURE.md - System architecture deep dive
  - docs/DEPLOYMENT.md - Production deployment guide
  - CHANGELOG.md - This file

#### Developer Tools
- **React Hooks**:
  - `useKVStore<T>` - Store and retrieve data
  - `useKVPrefix<T>` - Query data by prefix
  
- **Test Suite**:
  - Backend connection tests
  - KV store CRUD tests
  - Error handling tests
  - Large data storage tests
  - `runBackendTests()` function for automated testing

#### API Endpoints
- `GET /health` - Health check
- `GET /info` - Server information
- `GET /kv/:key` - Get value by key
- `POST /kv/:key` - Set key-value pair
- `DELETE /kv/:key` - Delete key
- `GET /kv/prefix/:prefix` - Get all keys with prefix
- `GET /auth/profile` - Get authenticated user profile

### Changed

#### Color System Updates
- Brightened background gradient from `#0A1628 → #060F1A` to `#1A2F4D → #0F1E33`
- Updated primary cyan from `#00D9FF` to `#00E5FF` (more vibrant)
- Enhanced secondary blue from `#5B8DEE` to `#6B9FFF` (brighter)
- Improved all accent colors for better visibility
- Increased border opacity from 12% to 25%
- Updated particle glow to 2x brightness

#### Layout Fixes
- Fixed sidebar overlap with main content
- Corrected padding logic for responsive sidebar
- Improved mobile sidebar overlay behavior
- Fixed z-index conflicts between components

#### Component Updates
- Updated all 18 app icons to use brighter color palette
- Enhanced glassmorphism effects on cards
- Improved hover states with glowing shadows
- Updated sidebar active state colors
- Refined particle animation for better performance

### Fixed
- Sidebar overlapping dashboard content on desktop
- Inconsistent padding on mobile devices
- Particle animation performance on low-end devices
- Color contrast issues with dark backgrounds
- TypeScript type errors in API client
- Missing auth token validation in protected routes

### Security
- Added authentication middleware for protected routes
- Implemented JWT token validation
- Protected service role key (never exposed to frontend)
- Added CORS configuration (currently open for development)
- Row Level Security (RLS) ready for production

### Infrastructure
- GitHub integration for automatic deployment
- Supabase Edge Functions hosting
- CDN for global content delivery
- PostgreSQL database with KV store table
- Automatic daily backups (7-day retention)

---

## [Unreleased]

### Planned for v2.6.0
- [ ] Real-time data subscriptions with Supabase Realtime
- [ ] Social authentication (Google, GitHub, Microsoft)
- [ ] File upload functionality with Supabase Storage
- [ ] Advanced search with PostgreSQL full-text search
- [ ] Rate limiting middleware
- [ ] API response caching
- [ ] User profile pages
- [ ] Settings management UI
- [ ] Dark/light theme toggle
- [ ] Notification system

### Planned for v2.7.0
- [ ] GraphQL API alternative
- [ ] WebSocket support for real-time updates
- [ ] Advanced analytics dashboards
- [ ] Custom theme builder
- [ ] Plugin system
- [ ] Mobile native apps (React Native)
- [ ] Desktop app (Electron)
- [ ] Offline mode improvements

### Planned for v3.0.0
- [ ] Multi-tenancy support
- [ ] Team collaboration features
- [ ] Advanced role-based access control (RBAC)
- [ ] Audit logging
- [ ] Export/import functionality
- [ ] API versioning
- [ ] Microservices architecture
- [ ] Kubernetes deployment

---

## Version History

| Version | Release Date | Status | Notes |
|---------|--------------|--------|-------|
| 2.5.0 | 2025-10-24 | ✅ Stable | Initial complete release |
| 2.4.x | - | ⏭️ Skipped | Development iterations |
| 2.3.x | - | ⏭️ Skipped | Early prototypes |

---

## Migration Guides

### Migrating to v2.5.0 (Initial Release)

This is the first complete release, so no migration needed. Follow the [QUICKSTART.md](docs/QUICKSTART.md) guide to get started.

---

## Breaking Changes

### v2.5.0
- None (initial release)

---

## Deprecations

### v2.5.0
- None (initial release)

---

## Known Issues

### v2.5.0

**Minor Issues**:
- [ ] Particle animation may lag on low-end mobile devices
  - **Workaround**: Reduce particle count in `/components/int-os/ParticleField.tsx`
- [ ] Command palette search is case-sensitive
  - **Workaround**: Use lowercase search terms
- [ ] Landing page PWA install prompt may not show on all browsers
  - **Workaround**: Use Chrome or Safari for best PWA support

**Planned Fixes in v2.5.1**:
- Optimize particle rendering for mobile
- Add case-insensitive search to command palette
- Improve PWA install prompt detection

---

## Support

For questions, issues, or feature requests:

1. **Documentation**: Check [docs/INDEX.md](docs/INDEX.md)
2. **GitHub Issues**: Report bugs or request features
3. **Discord**: [Your Discord link]
4. **Email**: support@intos.com

---

## Contributors

Thanks to all contributors who made this release possible!

- **Lead Developer**: [Your Name]
- **Design**: [Designer Name]
- **Documentation**: [Doc Writer Name]
- **Testing**: [QA Team]

---

## Acknowledgments

Special thanks to:
- Supabase team for amazing backend platform
- Shadcn for beautiful component library
- Tailwind CSS team for utility-first CSS
- React team for the framework
- All open source contributors

---

**Last Updated**: October 24, 2025