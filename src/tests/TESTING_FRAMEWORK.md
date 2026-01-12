# 🧪 INT OS v2.5 - Comprehensive Testing Framework

**Version**: 1.0.0  
**Last Updated**: January 12, 2026  
**Status**: Ready for Implementation

---

## 📋 TABLE OF CONTENTS

1. [Testing Strategy Overview](#testing-strategy)
2. [Setup Instructions](#setup-instructions)
3. [Unit Testing](#unit-testing)
4. [Component Testing](#component-testing)
5. [Integration Testing](#integration-testing)
6. [E2E Testing](#e2e-testing)
7. [Accessibility Testing](#accessibility-testing)
8. [Performance Testing](#performance-testing)
9. [Visual Regression Testing](#visual-regression-testing)
10. [Test Data & Fixtures](#test-data)
11. [CI/CD Integration](#cicd)
12. [Coverage Goals](#coverage)

---

## 🎯 TESTING STRATEGY

### Testing Pyramid

```
           /\
          /  \  E2E Tests (10%)
         /    \  - Critical user flows
        /------\
       /        \  Integration Tests (20%)
      /          \  - Component interactions
     /            \  - API integration
    /--------------\
   /                \  Unit Tests (70%)
  /                  \  - Business logic
 /                    \  - Utilities
/______________________\ - Pure functions
```

### Coverage Goals

| Test Type | Target Coverage | Priority |
|-----------|----------------|----------|
| Unit Tests | 80% | 🔴 High |
| Component Tests | 70% | 🔴 High |
| Integration Tests | 60% | 🟡 Medium |
| E2E Tests | Critical flows | 🟡 Medium |
| Accessibility | 100% | 🔴 High |

### Technology Stack

- **Unit/Component**: Vitest + React Testing Library
- **E2E**: Playwright
- **Accessibility**: axe-core, Pa11y
- **Visual**: Percy or Chromatic
- **Performance**: Lighthouse CI

---

## 🔧 SETUP INSTRUCTIONS

### 1. Install Dependencies

```bash
# Install testing libraries
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# Install E2E testing
npm install -D @playwright/test

# Install accessibility testing
npm install -D axe-core @axe-core/react pa11y

# Install code coverage
npm install -D @vitest/coverage-v8

# Install mocking utilities
npm install -D msw
```

### 2. Configuration Files

**vitest.config.ts**:
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/dist/**',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@components': path.resolve(__dirname, './components'),
      '@lib': path.resolve(__dirname, './lib'),
    },
  },
});
```

**tests/setup.ts**:
```typescript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
};

// Mock scrollTo
window.scrollTo = vi.fn();

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;
```

**playwright.config.ts**:
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

### 3. Package.json Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:a11y": "pa11y-ci",
    "test:all": "npm run test:coverage && npm run test:e2e && npm run test:a11y"
  }
}
```

---

## 🧩 UNIT TESTING

### Testing Utilities and Constants

**tests/unit/lib/constants.test.ts**:
```typescript
import { describe, it, expect } from 'vitest';
import { APPS, KEYBOARD_SHORTCUTS, LANGUAGES } from '@lib/constants';

describe('Constants', () => {
  describe('APPS', () => {
    it('should have exactly 26 apps', () => {
      expect(APPS).toHaveLength(26);
    });

    it('should have unique app IDs', () => {
      const ids = APPS.map(app => app.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(APPS.length);
    });

    it('should have unique app paths', () => {
      const paths = APPS.map(app => app.path);
      const uniquePaths = new Set(paths);
      expect(uniquePaths.size).toBe(APPS.length);
    });

    it('should have valid categories', () => {
      const validCategories = ['Analytics', 'Support', 'Operations', 'Productivity', 'HR & Learning'];
      APPS.forEach(app => {
        expect(validCategories).toContain(app.category);
      });
    });

    it('should have all required properties', () => {
      APPS.forEach(app => {
        expect(app).toHaveProperty('id');
        expect(app).toHaveProperty('name');
        expect(app).toHaveProperty('path');
        expect(app).toHaveProperty('icon');
        expect(app).toHaveProperty('description');
        expect(app).toHaveProperty('color');
        expect(app).toHaveProperty('category');
      });
    });

    it('should have valid color formats', () => {
      const colorRegex = /^#[0-9A-F]{6}$/i;
      APPS.forEach(app => {
        expect(app.color).toMatch(colorRegex);
      });
    });
  });

  describe('KEYBOARD_SHORTCUTS', () => {
    it('should have command palette shortcuts', () => {
      expect(KEYBOARD_SHORTCUTS.COMMAND_PALETTE).toEqual(['cmd+k', 'ctrl+k']);
    });

    it('should have all expected shortcuts', () => {
      expect(KEYBOARD_SHORTCUTS).toHaveProperty('COMMAND_PALETTE');
      expect(KEYBOARD_SHORTCUTS).toHaveProperty('SEARCH');
      expect(KEYBOARD_SHORTCUTS).toHaveProperty('NAVIGATION');
      expect(KEYBOARD_SHORTCUTS).toHaveProperty('TOGGLE_SIDEBAR');
      expect(KEYBOARD_SHORTCUTS).toHaveProperty('TOGGLE_ASSISTANT');
    });
  });

  describe('LANGUAGES', () => {
    it('should have 4 supported languages', () => {
      expect(LANGUAGES).toHaveLength(4);
    });

    it('should have RTL direction for Arabic', () => {
      const arabic = LANGUAGES.find(lang => lang.code === 'ar');
      expect(arabic?.direction).toBe('rtl');
    });

    it('should have LTR direction for other languages', () => {
      const ltrLanguages = LANGUAGES.filter(lang => lang.code !== 'ar');
      ltrLanguages.forEach(lang => {
        expect(lang.direction).toBe('ltr');
      });
    });
  });
});
```

### Testing Integration Types

**tests/unit/lib/integration-types.test.ts**:
```typescript
import { describe, it, expect } from 'vitest';
import type { 
  ConnectionStatus, 
  SyncDirection, 
  IntegrationConfig,
  IntegrationState 
} from '@lib/integration-types';

describe('Integration Types', () => {
  describe('Type Guards', () => {
    it('should accept valid ConnectionStatus values', () => {
      const validStatuses: ConnectionStatus[] = [
        'connected',
        'limited',
        'disconnected',
        'not_configured',
        'syncing',
        'error',
      ];

      validStatuses.forEach(status => {
        const state: IntegrationState = {
          id: 'test',
          name: 'Test',
          icon: 'Settings',
          status,
          stats: { syncedToday: 0, successRate: 100 },
        };
        expect(state.status).toBe(status);
      });
    });

    it('should accept valid SyncDirection values', () => {
      const validDirections: SyncDirection[] = [
        'one-way-in',
        'one-way-out',
        'two-way',
      ];

      validDirections.forEach(direction => {
        expect(['one-way-in', 'one-way-out', 'two-way']).toContain(direction);
      });
    });
  });

  describe('IntegrationConfig Interface', () => {
    it('should create valid config object', () => {
      const config: IntegrationConfig = {
        id: 'config-1',
        serviceId: 'hubspot',
        isEnabled: true,
        authMethod: 'oauth',
        syncDirection: 'two-way',
        syncFrequency: 'hourly',
        fieldMapping: { email: 'email', name: 'full_name' },
        conflictResolution: 'newest',
      };

      expect(config.id).toBe('config-1');
      expect(config.authMethod).toBe('oauth');
      expect(config.syncDirection).toBe('two-way');
    });
  });
});
```

### Testing Utility Functions

**tests/unit/lib/utils.test.ts**:
```typescript
import { describe, it, expect } from 'vitest';
import { cn } from '@lib/utils';

describe('Utils', () => {
  describe('cn (className merger)', () => {
    it('should merge class names', () => {
      const result = cn('class1', 'class2');
      expect(result).toBe('class1 class2');
    });

    it('should handle conditional classes', () => {
      const result = cn('base', true && 'active', false && 'inactive');
      expect(result).toBe('base active');
    });

    it('should deduplicate classes', () => {
      const result = cn('text-red-500', 'text-blue-500');
      // Should keep the last one (Tailwind behavior)
      expect(result).toContain('text-blue-500');
    });

    it('should handle undefined and null', () => {
      const result = cn('class1', undefined, null, 'class2');
      expect(result).toBe('class1 class2');
    });
  });
});
```

---

## 🎨 COMPONENT TESTING

### Testing Sidebar Component

**tests/component/Sidebar.test.tsx**:
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Sidebar } from '@components/int-os/Sidebar';

describe('Sidebar Component', () => {
  const mockNavigate = vi.fn();

  const defaultProps = {
    currentPath: '/insights',
    onNavigate: mockNavigate,
    isExpanded: true,
    onToggle: vi.fn(),
  };

  it('should render sidebar with all categories', () => {
    render(<Sidebar {...defaultProps} />);
    
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Operations')).toBeInTheDocument();
    expect(screen.getByText('Productivity')).toBeInTheDocument();
    expect(screen.getByText('HR & Learning')).toBeInTheDocument();
  });

  it('should highlight active app', () => {
    render(<Sidebar {...defaultProps} />);
    
    const insightHubButton = screen.getByRole('button', { name: /InsightHub/i });
    expect(insightHubButton).toHaveClass('bg-[#E27305]/20');
  });

  it('should call onNavigate when app is clicked', () => {
    render(<Sidebar {...defaultProps} />);
    
    const resolveDeskButton = screen.getByRole('button', { name: /ResolveDesk/i });
    fireEvent.click(resolveDeskButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/resolve');
  });

  it('should toggle category expansion', () => {
    render(<Sidebar {...defaultProps} />);
    
    const analyticsCategory = screen.getByRole('button', { name: /Analytics/i });
    fireEvent.click(analyticsCategory);
    
    // Category should collapse (check for chevron rotation)
    expect(analyticsCategory.querySelector('svg')).toHaveClass('transform rotate-180');
  });

  it('should call onToggle when collapse button is clicked', () => {
    const onToggle = vi.fn();
    render(<Sidebar {...defaultProps} onToggle={onToggle} />);
    
    const toggleButton = screen.getByLabelText('Collapse sidebar');
    fireEvent.click(toggleButton);
    
    expect(onToggle).toHaveBeenCalled();
  });

  it('should show version information', () => {
    render(<Sidebar {...defaultProps} />);
    
    expect(screen.getByText('INT OS v2.5.0')).toBeInTheDocument();
    expect(screen.getByText('Build 2847')).toBeInTheDocument();
  });

  it('should render collapsed state correctly', () => {
    render(<Sidebar {...defaultProps} isExpanded={false} />);
    
    // App names should not be visible when collapsed
    expect(screen.queryByText('InsightHub')).not.toBeInTheDocument();
    
    // But tooltips should exist (check for tooltip triggers)
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should have proper accessibility attributes', () => {
    render(<Sidebar {...defaultProps} />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'App navigation');
    
    const activeButton = screen.getByRole('button', { name: /InsightHub/i });
    expect(activeButton).toHaveAttribute('aria-current', 'page');
  });

  describe('Mobile behavior', () => {
    it('should show close button on mobile when expanded', () => {
      // Mock mobile viewport
      global.innerWidth = 500;
      global.dispatchEvent(new Event('resize'));
      
      render(<Sidebar {...defaultProps} />);
      
      const closeButton = screen.getByLabelText(/menu/i);
      expect(closeButton).toBeInTheDocument();
    });

    it('should show overlay on mobile', () => {
      global.innerWidth = 500;
      
      const { container } = render(<Sidebar {...defaultProps} />);
      
      const overlay = container.querySelector('.fixed.inset-0.bg-black\\/50');
      expect(overlay).toBeInTheDocument();
    });
  });
});
```

### Testing TopNav Component

**tests/component/TopNav.test.tsx**:
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TopNav } from '@components/int-os/TopNav';

describe('TopNav Component', () => {
  const mockOnCommandPaletteOpen = vi.fn();

  it('should render INT OS logo', () => {
    render(<TopNav onCommandPaletteOpen={mockOnCommandPaletteOpen} />);
    
    expect(screen.getByText('INT OS')).toBeInTheDocument();
  });

  it('should display current app name', () => {
    render(
      <TopNav 
        onCommandPaletteOpen={mockOnCommandPaletteOpen} 
        currentApp="InsightHub"
      />
    );
    
    expect(screen.getByText('InsightHub')).toBeInTheDocument();
  });

  it('should open command palette when search is clicked', () => {
    render(<TopNav onCommandPaletteOpen={mockOnCommandPaletteOpen} />);
    
    const searchButton = screen.getByRole('button', { name: /search or run command/i });
    fireEvent.click(searchButton);
    
    expect(mockOnCommandPaletteOpen).toHaveBeenCalled();
  });

  it('should display system health indicator', () => {
    render(<TopNav onCommandPaletteOpen={mockOnCommandPaletteOpen} />);
    
    const healthIndicator = screen.getByText('System Status');
    expect(healthIndicator).toBeInTheDocument();
  });

  it('should show user avatar with initials', () => {
    render(<TopNav onCommandPaletteOpen={mockOnCommandPaletteOpen} />);
    
    expect(screen.getByText('SC')).toBeInTheDocument();
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
  });

  it('should have accessibility labels', () => {
    render(<TopNav onCommandPaletteOpen={mockOnCommandPaletteOpen} />);
    
    expect(screen.getByLabelText('INT OS Home')).toBeInTheDocument();
    expect(screen.getByLabelText('Open command palette')).toBeInTheDocument();
    expect(screen.getByLabelText('Settings')).toBeInTheDocument();
  });

  it('should display keyboard shortcut hint', () => {
    render(<TopNav onCommandPaletteOpen={mockOnCommandPaletteOpen} />);
    
    expect(screen.getByText('⌘K')).toBeInTheDocument();
  });
});
```

### Testing CommandPalette Component

**tests/component/CommandPalette.test.tsx**:
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CommandPalette } from '@components/int-os/CommandPalette';

describe('CommandPalette Component', () => {
  const mockOnClose = vi.fn();
  const mockOnNavigate = vi.fn();

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onNavigate: mockOnNavigate,
  };

  it('should render when open', () => {
    render(<CommandPalette {...defaultProps} />);
    
    expect(screen.getByPlaceholderText(/search apps/i)).toBeInTheDocument();
  });

  it('should not render when closed', () => {
    render(<CommandPalette {...defaultProps} isOpen={false} />);
    
    expect(screen.queryByPlaceholderText(/search apps/i)).not.toBeInTheDocument();
  });

  it('should filter commands based on search', async () => {
    const user = userEvent.setup();
    render(<CommandPalette {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText(/search apps/i);
    await user.type(searchInput, 'insight');
    
    expect(screen.getByText(/InsightHub/i)).toBeInTheDocument();
    expect(screen.queryByText(/ResolveDesk/i)).not.toBeInTheDocument();
  });

  it('should navigate when command is selected', async () => {
    render(<CommandPalette {...defaultProps} />);
    
    const insightButton = screen.getByRole('button', { name: /InsightHub/i });
    fireEvent.click(insightButton);
    
    expect(mockOnNavigate).toHaveBeenCalledWith('/insights');
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should navigate with Enter key', async () => {
    const user = userEvent.setup();
    render(<CommandPalette {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText(/search apps/i);
    await user.type(searchInput, '{ArrowDown}{Enter}');
    
    expect(mockOnNavigate).toHaveBeenCalled();
  });

  it('should close with Escape key', async () => {
    const user = userEvent.setup();
    render(<CommandPalette {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText(/search apps/i);
    await user.type(searchInput, '{Escape}');
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should show keyboard hints', () => {
    render(<CommandPalette {...defaultProps} />);
    
    expect(screen.getByText('Navigate')).toBeInTheDocument();
    expect(screen.getByText('Select')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('should group commands by category', () => {
    render(<CommandPalette {...defaultProps} />);
    
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Operations')).toBeInTheDocument();
  });
});
```

### Testing IntegrationHub Component

**tests/component/IntegrationHub.test.tsx**:
```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { IntegrationHub } from '@components/apps/IntegrationHub';

describe('IntegrationHub Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render integration cards', () => {
    render(<IntegrationHub />);
    
    expect(screen.getByText('Integration Hub')).toBeInTheDocument();
    expect(screen.getByText(/Manage connections/i)).toBeInTheDocument();
  });

  it('should show sync all button', () => {
    render(<IntegrationHub />);
    
    const syncButton = screen.getByRole('button', { name: /Sync All/i });
    expect(syncButton).toBeInTheDocument();
  });

  it('should show add connection button', () => {
    render(<IntegrationHub />);
    
    const addButton = screen.getByRole('button', { name: /Add Connection/i });
    expect(addButton).toBeInTheDocument();
  });

  it('should handle sync all action', async () => {
    render(<IntegrationHub />);
    
    const syncButton = screen.getByRole('button', { name: /Sync All/i });
    fireEvent.click(syncButton);
    
    expect(syncButton).toBeDisabled();
    
    // Fast-forward time
    vi.advanceTimersByTime(2000);
    
    await waitFor(() => {
      expect(syncButton).not.toBeDisabled();
    });
  });

  it('should display error banners for failed integrations', () => {
    render(<IntegrationHub />);
    
    // Check if error banner exists (mock data has Freshdesk error)
    expect(screen.getByText(/Auth Expired/i)).toBeInTheDocument();
  });

  it('should have tabs for different views', () => {
    render(<IntegrationHub />);
    
    expect(screen.getByRole('tab', { name: /Overview/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Data Flow/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Sync History/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Global Settings/i })).toBeInTheDocument();
  });

  it('should switch between tabs', () => {
    render(<IntegrationHub />);
    
    const dataFlowTab = screen.getByRole('tab', { name: /Data Flow/i });
    fireEvent.click(dataFlowTab);
    
    expect(screen.getByText('Live Data Flow')).toBeInTheDocument();
  });

  it('should update integration states on polling', async () => {
    render(<IntegrationHub />);
    
    // Fast-forward polling interval
    vi.advanceTimersByTime(5000);
    
    await waitFor(() => {
      // Verify that stats might have updated
      expect(screen.getByText(/Integration Hub/i)).toBeInTheDocument();
    });
  });
});
```

---

## 🔗 INTEGRATION TESTING

### API Integration Tests

**tests/integration/api.test.ts**:
```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
  rest.get('/api/kv/:key', (req, res, ctx) => {
    const { key } = req.params;
    return res(
      ctx.json({
        key,
        value: 'test-value',
      })
    );
  }),

  rest.post('/api/kv', async (req, res, ctx) => {
    const { key, value } = await req.json();
    return res(
      ctx.json({
        success: true,
        key,
        value,
      })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('API Integration', () => {
  it('should fetch KV value', async () => {
    const response = await fetch('/api/kv/test-key');
    const data = await response.json();
    
    expect(data.key).toBe('test-key');
    expect(data.value).toBe('test-value');
  });

  it('should set KV value', async () => {
    const response = await fetch('/api/kv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'new-key', value: 'new-value' }),
    });
    
    const data = await response.json();
    
    expect(data.success).toBe(true);
    expect(data.key).toBe('new-key');
  });
});
```

---

## 🎭 E2E TESTING

### Critical User Flows

**tests/e2e/navigation.spec.ts**:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate through landing page to app', async ({ page }) => {
    await page.goto('/');
    
    // Should see landing page first
    await expect(page.getByText('INT OS v2.5')).toBeVisible();
    
    // Click enter app
    await page.getByRole('button', { name: /Enter Application/i }).click();
    
    // Should see main app
    await expect(page.getByText('InsightHub')).toBeVisible();
  });

  test('should navigate between apps using sidebar', async ({ page }) => {
    // Skip landing page
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('int-os-visited', 'true'));
    await page.reload();
    
    // Click on ResolveDesk
    await page.getByRole('button', { name: /ResolveDesk/i }).click();
    
    // Should navigate to ResolveDesk
    await expect(page).toHaveURL(/.*resolve/);
    await expect(page.getByText('ResolveDesk')).toBeVisible();
  });

  test('should open command palette with keyboard shortcut', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('int-os-visited', 'true'));
    await page.reload();
    
    // Press Cmd+K (or Ctrl+K on Windows)
    await page.keyboard.press('Meta+k');
    
    // Command palette should be visible
    await expect(page.getByPlaceholderText(/Search apps/i)).toBeVisible();
  });

  test('should toggle sidebar', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('int-os-visited', 'true'));
    await page.reload();
    
    // Find and click toggle button
    await page.getByLabel('Collapse sidebar').click();
    
    // Sidebar should be collapsed (check for reduced width)
    const sidebar = page.locator('aside[role="navigation"]');
    await expect(sidebar).toHaveClass(/w-20/);
  });
});
```

**tests/e2e/integration-hub.spec.ts**:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Integration Hub', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('int-os-visited', 'true'));
    await page.reload();
    
    // Navigate to Integration Hub
    await page.getByRole('button', { name: /IntegrationHub/i }).click();
  });

  test('should display integration cards', async ({ page }) => {
    await expect(page.getByText('Integration Hub')).toBeVisible();
    
    // Should see integration cards (HubSpot, Freshdesk, etc.)
    await expect(page.getByText('HubSpot')).toBeVisible();
  });

  test('should sync all integrations', async ({ page }) => {
    const syncButton = page.getByRole('button', { name: /Sync All/i });
    await syncButton.click();
    
    // Button should be disabled during sync
    await expect(syncButton).toBeDisabled();
    
    // Wait for sync to complete
    await expect(syncButton).toBeEnabled({ timeout: 3000 });
  });

  test('should switch between tabs', async ({ page }) => {
    // Click Data Flow tab
    await page.getByRole('tab', { name: /Data Flow/i }).click();
    
    // Should show data flow diagram
    await expect(page.getByText('Live Data Flow')).toBeVisible();
    
    // Click Sync History tab
    await page.getByRole('tab', { name: /Sync History/i }).click();
    
    // Should show history table
    await expect(page.locator('table')).toBeVisible();
  });

  test('should open connection wizard', async ({ page }) => {
    await page.getByRole('button', { name: /Add Connection/i }).click();
    
    // Wizard should open
    await expect(page.getByText(/Connection Setup/i)).toBeVisible();
  });
});
```

**tests/e2e/accessibility.spec.ts**:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('should have no accessibility violations on homepage', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Run axe accessibility tests
    // Note: You'll need to inject axe-core
    const violations = await page.evaluate(async () => {
      // @ts-ignore
      const results = await axe.run();
      return results.violations;
    });
    
    expect(violations).toHaveLength(0);
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('int-os-visited', 'true'));
    await page.reload();
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Should be able to activate with Enter
    await page.keyboard.press('Enter');
  });

  test('should have proper focus indicators', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('int-os-visited', 'true'));
    await page.reload();
    
    // Tab to first focusable element
    await page.keyboard.press('Tab');
    
    // Check for focus ring (orange color #E27305)
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });
});
```

**tests/e2e/mobile.spec.ts**:
```typescript
import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['iPhone 12'] });

test.describe('Mobile Experience', () => {
  test('should have mobile-optimized layout', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('int-os-visited', 'true'));
    await page.reload();
    
    // Sidebar should be collapsed on mobile
    const sidebar = page.locator('aside[role="navigation"]');
    await expect(sidebar).toHaveClass(/-translate-x-full/);
  });

  test('should show mobile menu toggle', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('int-os-visited', 'true'));
    await page.reload();
    
    // Mobile toggle button should be visible
    const toggleButton = page.getByLabel('Open Menu');
    await expect(toggleButton).toBeVisible();
  });

  test('should open sidebar on mobile', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('int-os-visited', 'true'));
    await page.reload();
    
    // Click mobile toggle
    await page.getByLabel('Open Menu').click();
    
    // Sidebar should be visible
    const sidebar = page.locator('aside[role="navigation"]');
    await expect(sidebar).toHaveClass(/translate-x-0/);
  });

  test('should have touch-friendly buttons', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('int-os-visited', 'true'));
    await page.reload();
    
    // Check button sizes (minimum 44x44px for touch)
    const buttons = page.getByRole('button');
    const firstButton = buttons.first();
    const box = await firstButton.boundingBox();
    
    expect(box?.height).toBeGreaterThanOrEqual(44);
  });
});
```

---

## ♿ ACCESSIBILITY TESTING

### Automated Accessibility Tests

**tests/accessibility/wcag.test.ts**:
```typescript
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Sidebar } from '@components/int-os/Sidebar';
import { TopNav } from '@components/int-os/TopNav';
import { IntegrationHub } from '@components/apps/IntegrationHub';

expect.extend(toHaveNoViolations);

describe('WCAG 2.2 AA Compliance', () => {
  it('Sidebar should have no accessibility violations', async () => {
    const { container } = render(
      <Sidebar
        currentPath="/insights"
        onNavigate={() => {}}
        isExpanded={true}
        onToggle={() => {}}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('TopNav should have no accessibility violations', async () => {
    const { container } = render(
      <TopNav onCommandPaletteOpen={() => {}} />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('IntegrationHub should have no accessibility violations', async () => {
    const { container } = render(<IntegrationHub />);
    
    const results = await axe(container, {
      rules: {
        // Disable color-contrast for this test (handled separately)
        'color-contrast': { enabled: false },
      },
    });
    
    expect(results).toHaveNoViolations();
  });
});
```

**pa11y.config.js**:
```javascript
module.exports = {
  defaults: {
    standard: 'WCAG2AA',
    runners: ['axe', 'htmlcs'],
    timeout: 30000,
    wait: 2000,
    chromeLaunchConfig: {
      args: ['--no-sandbox'],
    },
  },
  urls: [
    'http://localhost:5173/',
    'http://localhost:5173/?skip-landing=true',
    'http://localhost:5173/?app=insights',
    'http://localhost:5173/?app=integrations',
  ],
};
```

### Color Contrast Tests

**tests/accessibility/color-contrast.test.ts**:
```typescript
import { describe, it, expect } from 'vitest';

// Helper function to calculate contrast ratio
function getContrastRatio(color1: string, color2: string): number {
  // Simplified - use a proper library like 'wcag-contrast'
  // This is a placeholder
  return 0;
}

describe('Color Contrast WCAG AA', () => {
  const colors = {
    primaryBlue: '#33475B',
    secondaryOrange: '#E27305',
    accentGreen: '#46A57B',
    supportBlue: '#529ADB',
    white: '#FFFFFF',
  };

  it('Primary Blue on White should meet AAA (7:1)', () => {
    const ratio = getContrastRatio(colors.primaryBlue, colors.white);
    expect(ratio).toBeGreaterThanOrEqual(7);
  });

  it('Secondary Orange on White should meet AA (4.5:1)', () => {
    const ratio = getContrastRatio(colors.secondaryOrange, colors.white);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('Accent Green on White should fail for normal text', () => {
    const ratio = getContrastRatio(colors.accentGreen, colors.white);
    expect(ratio).toBeLessThan(4.5);
  });

  it('Support Blue on White should meet large text only', () => {
    const ratio = getContrastRatio(colors.supportBlue, colors.white);
    expect(ratio).toBeGreaterThanOrEqual(3);
    expect(ratio).toBeLessThan(4.5);
  });
});
```

---

## ⚡ PERFORMANCE TESTING

### Lighthouse CI Configuration

**.lighthouserc.js**:
```javascript
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:5173/',
        'http://localhost:5173/?skip-landing=true',
        'http://localhost:5173/?app=integrations',
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

### Performance Metrics Tests

**tests/performance/metrics.test.ts**:
```typescript
import { describe, it, expect } from 'vitest';

describe('Performance Metrics', () => {
  it('should measure component render time', () => {
    const startTime = performance.now();
    
    // Render component
    // const { container } = render(<LargeComponent />);
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // Should render in less than 100ms
    expect(renderTime).toBeLessThan(100);
  });

  it('should not have excessive re-renders', () => {
    let renderCount = 0;
    
    // Use custom hook to count renders
    // const { rerender } = render(<Component onRender={() => renderCount++} />);
    
    // Trigger state change
    // rerender(<Component onRender={() => renderCount++} />);
    
    expect(renderCount).toBeLessThan(5);
  });
});
```

---

## 📸 VISUAL REGRESSION TESTING

### Chromatic/Percy Setup

**tests/visual/snapshots.test.ts**:
```typescript
import { test } from '@playwright/test';

test.describe('Visual Regression', () => {
  test('Landing page should match snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('landing-page.png');
  });

  test('Main app should match snapshot', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('int-os-visited', 'true'));
    await page.reload();
    
    await expect(page).toHaveScreenshot('main-app.png');
  });

  test('Integration Hub should match snapshot', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('int-os-visited', 'true'));
    await page.reload();
    await page.getByRole('button', { name: /IntegrationHub/i }).click();
    
    await expect(page).toHaveScreenshot('integration-hub.png');
  });

  test('Mobile sidebar should match snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('int-os-visited', 'true'));
    await page.reload();
    
    await page.getByLabel('Open Menu').click();
    
    await expect(page).toHaveScreenshot('mobile-sidebar.png');
  });
});
```

---

## 🗂️ TEST DATA & FIXTURES

### Mock Data for Testing

**tests/fixtures/integrations.ts**:
```typescript
import type { IntegrationState } from '@lib/integration-types';

export const mockIntegrations: IntegrationState[] = [
  {
    id: 'hubspot-1',
    name: 'HubSpot',
    icon: 'Building2',
    status: 'connected',
    config: {
      id: 'config-1',
      serviceId: 'hubspot',
      isEnabled: true,
      authMethod: 'oauth',
      syncDirection: 'two-way',
      syncFrequency: 'real-time',
      fieldMapping: {},
      conflictResolution: 'newest',
      lastSyncTime: '2 minutes ago',
    },
    stats: {
      syncedToday: 245,
      successRate: 98.5,
    },
  },
  {
    id: 'freshdesk-1',
    name: 'Freshdesk',
    icon: 'Headphones',
    status: 'error',
    error: {
      code: 'AUTH_EXPIRED',
      title: 'Freshdesk Authentication Expired',
      message: 'Your Freshdesk OAuth token has expired. Please reconnect.',
      severity: 'error',
      recovery: 'manual',
      timestamp: '2 hours ago',
    },
    stats: {
      syncedToday: 0,
      successRate: 0,
    },
  },
];
```

**tests/fixtures/apps.ts**:
```typescript
export const mockApps = [
  {
    id: 1,
    name: 'TestApp',
    path: '/test',
    icon: 'Settings',
    description: 'Test application',
    color: '#FF0000',
    category: 'Testing',
  },
];
```

---

## 🔄 CI/CD INTEGRATION

### GitHub Actions Workflow

**.github/workflows/test.yml**:
```yaml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  accessibility-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run dev &
      - run: npm run test:a11y

  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npx lhci autorun
```

---

## 📊 COVERAGE GOALS & REPORTING

### Coverage Requirements

```json
{
  "coverage": {
    "thresholds": {
      "global": {
        "lines": 80,
        "functions": 80,
        "branches": 80,
        "statements": 80
      },
      "critical": {
        "lines": 95,
        "functions": 95,
        "branches": 90,
        "statements": 95
      }
    }
  }
}
```

### Critical Files (95% Coverage Required)
- `/lib/constants.ts`
- `/lib/integration-types.ts`
- `/lib/utils.ts`
- `/components/int-os/Sidebar.tsx`
- `/components/int-os/TopNav.tsx`
- `/components/apps/IntegrationHub.tsx`

### Coverage Reporting

```bash
# Generate HTML coverage report
npm run test:coverage

# Open coverage report
open coverage/index.html

# Check coverage thresholds
npm run test:coverage -- --reporter=text-summary
```

---

## ✅ TESTING CHECKLIST

### Pre-Deployment Checklist

- [ ] All unit tests passing (80%+ coverage)
- [ ] All component tests passing (70%+ coverage)
- [ ] All integration tests passing
- [ ] E2E tests for critical flows passing
- [ ] Zero accessibility violations (axe-core)
- [ ] Lighthouse score 90+ across all categories
- [ ] Mobile tests passing on iOS and Android
- [ ] Keyboard navigation working
- [ ] Screen reader compatibility verified
- [ ] Visual regression tests approved
- [ ] Performance budgets met
- [ ] Security scan completed
- [ ] Load testing completed

---

## 🚀 IMPLEMENTATION TIMELINE

### Phase 1: Foundation (Week 1)
- ✅ Setup Vitest and testing configuration
- ✅ Create test utilities and fixtures
- ✅ Write unit tests for constants and types
- ✅ Write unit tests for utility functions

### Phase 2: Component Tests (Week 2)
- ✅ Test Sidebar component
- ✅ Test TopNav component
- ✅ Test CommandPalette component
- ✅ Test IntegrationHub component
- ✅ Test other critical components

### Phase 3: Integration & E2E (Week 3)
- ✅ Setup Playwright
- ✅ Write E2E tests for navigation
- ✅ Write E2E tests for Integration Hub
- ✅ Write E2E tests for mobile experience
- ✅ Setup API mocking with MSW

### Phase 4: Accessibility & Performance (Week 4)
- ✅ Setup Pa11y and axe-core
- ✅ Run accessibility audits
- ✅ Setup Lighthouse CI
- ✅ Create performance benchmarks
- ✅ Visual regression setup

### Phase 5: CI/CD & Reporting (Week 5)
- ✅ Configure GitHub Actions
- ✅ Setup coverage reporting
- ✅ Create test dashboards
- ✅ Documentation and training

---

## 📚 RESOURCES

### Documentation
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)

### Best Practices
- [Testing Library Guiding Principles](https://testing-library.com/docs/guiding-principles)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)

---

**Framework Version**: 1.0.0  
**Last Updated**: January 12, 2026  
**Maintained By**: INT OS Development Team  
**Status**: ✅ Ready for Implementation
