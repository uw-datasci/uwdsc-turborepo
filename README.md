# UWDSC Website v3 - Developer Onboarding Guide

Welcome to the UW Data Science Club website repository! This guide will help you understand the codebase architecture, setup process, and development workflow.

## 🚀 Quick Setup

### Prerequisites

- Node.js >= 20
- pnpm 10.4.1+

### Installation

1. [**Install pnpm**](https://pnpm.io/installation) (if you don't have it):

2. **Clone and setup the project**:

```bash
git clone <repository-url>
cd uwdsc-website-v3
pnpm install
```

3. **Start development servers**:

```bash
# Start all apps
pnpm dev

# Start specific apps
pnpm dev:web    # Main website
pnpm dev:cxc    # CxC app
```

4. **Other useful commands**:

```bash
pnpm build      # Build all packages
pnpm lint       # Lint all packages
pnpm ui:add <component-name>  # Add shadcn components
```

## 📁 Repository Structure

This is a **monorepo** using pnpm workspaces and Turborepo for build orchestration. Here's how it's organized:

```
uwdsc-website-v3/
├── apps/                    # Frontend applications
│   ├── web/                # Main website (Next.js)
│   └── cxc/                # CxC app (Next.js)
├── packages/               # Shared packages
│   ├── ui/                 # Design system components
│   ├── server/             # Backend services & data layer
│   ├── eslint-config/      # Shared ESLint configurations
│   └── typescript-config/  # Shared TypeScript configurations
└── scripts/                # Build and utility scripts
```

## 📦 Package Overview

### Applications (`apps/`)

#### `apps/web/` - Main Website

- **Purpose**: Primary UW Data Science Club website
- **Tech Stack**: Next.js 15, React 19, TypeScript
- **Dependencies**: `@uwdsc/ui`, `@uwdsc/server`

#### `apps/cxc/` - CxC App

- **Purpose**: Dedicated CxC app
- **Tech Stack**: Next.js 15, React 19, TypeScript
- **Dependencies**: Same as web app

### Shared Packages (`packages/`)

#### `packages/ui/` - Design System (Atoms)

- **Purpose**: Core UI components built with shadcn/ui
- **Components**: Button, Card, Navigation Menu, etc.
- **Tech Stack**: React, Radix UI, Tailwind CSS, Class Variance Authority
- **Role**: These are your **atomic components** - the basic building blocks

#### `packages/server/` - Backend Services

- **Purpose**: Database layer, services, repositories, and types
- **Tech Stack**: Supabase, Prisma, TypeScript
- **Structure**:
  - `database/` - Database client and configuration
  - `services/` - Business logic layer
  - `repository/` - Data access layer
  - `types/` - Shared TypeScript types
  - `middleware/` - Request/response middleware

#### `packages/eslint-config/` & `packages/typescript-config/`

- **Purpose**: Shared linting and TypeScript configuration
- **Benefits**: Consistent code style and type checking across all packages

## 🔄 API Architecture & Data Flow

Our application follows a clean architecture pattern with clear separation of concerns:

### Flow: React Component → API Route → Service → Repository → Database

```
┌─────────────────┐     ┌─────────────────┐    ┌─────────────────┐
│   React Page    │───▶│ lib/api/ funcs  │───▶│   app/api/      │
│   (Frontend)    │     │  (Client SDK)   │    │  (API Routes)   │
└─────────────────┘     └─────────────────┘    └─────────────────┘
                                │
┌─────────────────┐     ┌─────────────────┐    ┌─────────────────┐
│    Database     │◀───│   Repository    │◀───│    Service      │
│   (Supabase)    │     │  (Data Layer)   │    │ (Business Logic)│
└─────────────────┘     └─────────────────┘    └─────────────────┘
```

### Layer Breakdown

1. **React Components** (`apps/{web,cxc}/components/`)
   - UI components that consume data
   - These are your **molecular components** built from UI atoms

2. **Client API Functions** (`apps/{web,cxc}/lib/api/`)
   - Abstract API calls for frontend consumption
   - Handle request/response formatting
   - _Note: Currently being set up_

3. **API Routes** (`apps/{web,cxc}/app/api/`)
   - Next.js API routes (e.g., `/api/health`)
   - Handle HTTP requests and responses
   - Thin layer that calls services

4. **Services** (`packages/server/src/services/`)
   - Business logic and validation
   - Example: `HealthService.getSystemHealth()`
   - Orchestrate repository calls

5. **Repositories** (`packages/server/src/repository/`)
   - Data access layer
   - Direct database interactions
   - Extend `BaseRepository` for common functionality

6. **Database** (Supabase)
   - PostgreSQL with Supabase client
   - Managed through Prisma schema

### Example Flow: Health Check

```typescript
// 1. React component calls API function
const health = await getSystemHealth();

// 2. API function calls Next.js route
fetch("/api/health");

// 3. API route calls service
const healthService = new HealthService();
const healthData = await healthService.getSystemHealth();

// 4. Service calls repository
return await this.repository.getSystemHealth();

// 5. Repository queries database
const { data } = await this.client.from("health").select("*");
```

## 🎨 Design System Architecture

Our design system follows atomic design principles:

### Atomic Structure

```
Atoms (packages/ui/) → Molecules (app/components/) → Organisms → Templates → Pages
```

#### **Atoms** (`packages/ui/src/components/`)

- Basic UI elements from shadcn/ui
- Examples: `Button`, `Card`, `Input`
- Highly reusable, no business logic
- Import path: `@uwdsc/ui/components/{component-name}`

```tsx
import { Button } from "@uwdsc/ui/components/button";
import { Card } from "@uwdsc/ui/components/card";
```

#### **Molecules** (`apps/{web,cxc}/components/`)

- Combinations of atoms with specific functionality
- Examples: `MotionCard`, `ThemeToggle`
- Business logic and app-specific behavior

```tsx
// Example: MotionCard combines Card atoms with Framer Motion
import { Card, CardContent, CardHeader } from "@uwdsc/ui/components/card";
import { Button } from "@uwdsc/ui/components/button";

export function MotionCard() {
  return (
    <Card>
      <CardHeader>...</CardHeader>
      <CardContent>
        <Button>...</Button>
      </CardContent>
    </Card>
  );
}
```

### Adding New Components

#### Adding Shadcn Components (Atoms)

```bash
# Add a new shadcn component to the design system
pnpm ui:add dialog

# This runs our custom script that:
# 1. Changes to packages/ui directory
# 2. Runs shadcn CLI to add the component
# 3. Makes it available to all apps
```

#### Creating App Components (Molecules)

```tsx
// apps/web/components/MyComponent.tsx
import { Button } from "@uwdsc/ui/components/button";
import { Card } from "@uwdsc/ui/components/card";

export function MyComponent() {
  // Your component logic using atoms
}
```

## 🛠 Development Workflow

### Working on Features

1. **UI Components**: Add shadcn components with `pnpm ui:add <name>`
2. **App Components**: Create molecules in `apps/{app}/components/`
3. **API Development**:
   - Add routes in `apps/{app}/app/api/`
   - Create services in `packages/server/src/services/`
   - Add repositories in `packages/server/src/repository/`
4. **Types**: Define in `packages/server/src/types/`

### Best Practices

- **Component Organization**: Keep atoms in `@uwdsc/ui`, molecules in app components
- **API Layer**: Always go through the service → repository pattern
- **Type Safety**: Define types in the server package and share them
- **Styling**: Use Tailwind CSS classes, leverage design tokens from UI package

### Common Commands

```bash
# Development
pnpm dev                    # Start all apps
pnpm dev:web               # Start main website only
pnpm dev:cxc               # Start CxC app only

# Building
pnpm build                 # Build all packages

# Code Quality
pnpm lint                  # Lint all packages
pnpm format                # Format code with Prettier

# UI Components
pnpm ui:add button         # Add shadcn button component
pnpm ui:add form           # Add shadcn form components
```

## 🔧 Environment Setup

Each app may require environment variables. Check individual app directories for `.env.example` files.

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)

## 🆘 Getting Help

- Check existing components in `packages/ui/src/components/`
- Review API examples in `apps/web/app/api/health/`
- Look at service patterns in `packages/server/src/services/`
- Reach out to your VPs for more questions/clarifications

Happy coding! 🚀
