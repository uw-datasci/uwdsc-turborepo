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
│   │   ├── core/          # Shared backend utilities (auth, file services)
│   │   ├── web/           # Web app backend with Prisma
│   │   └── cxc/           # CxC app backend with Prisma
│   ├── eslint-config/      # Shared ESLint configurations
│   └── typescript-config/  # Shared TypeScript configurations
└── scripts/                # Build and utility scripts
```

## 📦 Package Overview

### Applications (`apps/`)

#### `apps/web/` - Main Website

- **Purpose**: Primary UW Data Science Club website
- **Tech Stack**: Next.js 15, React 19, TypeScript
- **Dependencies**: `@uwdsc/ui`, `@uwdsc/server/web`
- **Key Directories**:
  - `app/` - Next.js App Router pages and API routes
  - `components/` - React components (molecules/organisms)
  - `lib/api/` - Client-side API functions
  - `lib/schemas/` - Zod validation schemas
  - `contexts/` - React Context providers
  - `constants/` - App-wide constants
  - `types/` - TypeScript type definitions

#### `apps/cxc/` - CxC App

- **Purpose**: Dedicated CxC app
- **Tech Stack**: Next.js 15, React 19, TypeScript
- **Dependencies**: `@uwdsc/ui`, `@uwdsc/server/cxc`
- **Key Directories**: Same structure as web app

### Shared Packages (`packages/`)

#### `packages/ui/` - Design System (Atoms)

- **Purpose**: Core UI components built with shadcn/ui
- **Components**: Button, Card, Navigation Menu, etc.
- **Tech Stack**: React, Radix UI, Tailwind CSS, Class Variance Authority
- **Role**: These are your **atomic components** - the basic building blocks

#### `packages/server/` - Backend Services

The server package is split into three sub-packages for better separation of concerns:

##### `packages/server/core/` - Shared Backend Utilities

- **Purpose**: Common backend services shared across apps
- **Tech Stack**: Supabase, TypeScript, PostgreSQL
- **Exports**: `@uwdsc/server/core/*`
- **Structure**:
  - `database/` - Supabase client and connection utilities
  - `services/` - Shared services (auth, file, resume)
  - `repository/` - Shared data access layer (base repository, auth, file)
  - `types/` - Common TypeScript types
  - `utils/` - Error handling and utilities

##### `packages/server/web/` - Web App Backend

- **Purpose**: Backend services specific to the main website
- **Tech Stack**: Prisma, Supabase, TypeScript
- **Exports**: `@uwdsc/server/web/*`
- **Dependencies**: Extends `@uwdsc/server/core`
- **Structure**:
  - `prisma/schema/` - Prisma schema files (application, event, profile, etc.)
  - `prisma/generated/` - Generated Prisma client
  - `services/` - Web-specific business logic
  - `repository/` - Web-specific data access layer
  - `types/` - Web-specific types
  - `middleware/` - (Placeholder for future middleware)
  - `policies/` - (Placeholder for authorization policies)

##### `packages/server/cxc/` - CxC App Backend

- **Purpose**: Backend services specific to CxC app
- **Tech Stack**: Prisma, Supabase, TypeScript
- **Exports**: `@uwdsc/server/cxc/*`
- **Dependencies**: Extends `@uwdsc/server/core`
- **Structure**: Same as web backend with CxC-specific schemas

#### `packages/eslint-config/` & `packages/typescript-config/`

- **Purpose**: Shared linting and TypeScript configuration
- **Benefits**: Consistent code style and type checking across all packages

## 🔄 API Architecture & Data Flow

Our application follows a clean architecture pattern with clear separation of concerns:

### Flow: React Component → Client API → API Route → Service → Repository → Database

```
┌─────────────────┐     ┌─────────────────┐    ┌─────────────────┐
│   React Page    │───▶│ lib/api/ funcs  │───▶│   app/api/      │
│   (Frontend)    │     │  (Client SDK)   │    │  (API Routes)   │
└─────────────────┘     └─────────────────┘    └─────────────────┘

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
   - Type-safe API wrapper functions for frontend consumption
   - Handle request/response formatting and error handling
   - Example: `register()`, `login()`, `getProfile()`
   - Import types from `apps/{app}/types/api.ts`

3. **API Routes** (`apps/{web,cxc}/app/api/`)
   - Handle HTTP requests and responses
   - Thin layer that calls service methods
   - Import services from respective server package

4. **Services** (`packages/server/{core,web,cxc}/src/services/`)
   - Business logic and validation
   - Example: `HealthService.getSystemHealth()`
   - Orchestrate repository calls
   - Shared services in `core`, app-specific in `web`/`cxc`

5. **Repositories** (`packages/server/{core,web,cxc}/src/repository/`)
   - Data access layer
   - Direct database interactions via Prisma or Supabase client
   - Extend `BaseRepository` for common functionality
   - Core repositories in `core`, app-specific in `web`/`cxc`

6. **Database**
   - **Prisma**: App-specific database schemas for web and cxc
   - **Supabase**: Authentication and shared services
   - PostgreSQL as the underlying database

### Example Flow: Health Check

```typescript
// 1. React component (apps/web/app/page.tsx) calls API function
import { getSystemHealth } from "@/lib/api";
const health = await getSystemHealth();

// 2. API function (apps/web/lib/api/health.ts) calls Next.js route
const response = await fetch("/api/health");
return response.json();

// 3. API route (apps/web/app/api/health/route.ts) calls service
import { HealthService } from "@uwdsc/server/web/services/healthService";
const healthService = new HealthService();
const healthData = await healthService.getSystemHealth();

// 4. Service (packages/server/web/src/services/healthService.ts) calls repository
return await this.repository.getSystemHealth();

// 5. Repository (packages/server/web/src/repository/healthRepository.ts) queries database
const isHealthy = await this.checkDatabaseConnection();
return { status: isHealthy ? "healthy" : "unhealthy", ... };
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
- Import path: `@uwdsc/ui`

```tsx
import { Button } from "@uwdsc/ui";
import { Card, CardContent, CardHeader } from "@uwdsc/ui";
```

#### **Molecules** (`apps/{web,cxc}/components/`)

- Combinations of atoms with specific functionality
- Examples: `MotionCard`, `ThemeToggle`
- Business logic and app-specific behavior

```tsx
// Example: MotionCard combines Card atoms with Framer Motion
import { Card, CardContent, CardHeader } from "@uwdsc/ui";
import { Button } from "@uwdsc/ui";

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
import { Button } from "@uwdsc/ui";
import { Card, CardContent } from "@uwdsc/ui";

export function MyComponent() {
  // Your component logic using atoms
  return (
    <Card>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

## 🛠 Development Workflow

### Working on Features

1. **UI Components**: Add shadcn components with `pnpm ui:add <name>`
2. **App Components**: Create molecules in `apps/{app}/components/`
3. **Client API Functions**: Add type-safe wrappers in `apps/{app}/lib/api/`
4. **Validation Schemas**: Define Zod schemas in `apps/{app}/lib/schemas/`
5. **API Development**:
   - Add routes in `apps/{app}/app/api/`
   - For shared logic: Create services/repositories in `packages/server/core/src/`
   - For app-specific logic: Create in `packages/server/{web,cxc}/src/`
6. **Types**:
   - Frontend types: `apps/{app}/types/`
   - Backend types: `packages/server/{core,web,cxc}/src/types/`
7. **Prisma Schemas**: Define in `packages/server/{web,cxc}/src/prisma/schema/`

### Best Practices

- **Component Organization**: Keep atoms in `@uwdsc/ui`, molecules in app components
- **API Layer**:
  - Frontend: Use client API functions from `lib/api/`
  - Backend: Always follow the service → repository pattern
  - Import from correct server package (`core`, `web`, or `cxc`)
- **Type Safety**:
  - Define API types in `apps/{app}/types/api.ts`
  - Define backend types in `packages/server/{package}/src/types/`
  - Use Zod schemas for validation in `lib/schemas/`
- **Database**:
  - App-specific schemas go in respective Prisma schema folders
  - Shared auth/file operations use Supabase via core package
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
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Zod Documentation](https://zod.dev/) (for schema validation)

## 🆘 Getting Help

- Check existing components in `packages/ui/src/components/`
- Review API examples in `apps/web/app/api/health/` and `apps/web/lib/api/`
- Look at service patterns in `packages/server/core/src/services/` (shared) or `packages/server/web/src/services/` (app-specific)
- Check Prisma schemas in `packages/server/{web,cxc}/src/prisma/schema/`
- Reach out to your VPs for more questions/clarifications

Happy coding! 🚀
