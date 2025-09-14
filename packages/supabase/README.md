# @uwdsc/supabase

A Supabase client package for the UWDSC website monorepo.

## Setup

Make sure you have the following environment variables set:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Usage

### Basic Usage

```typescript
import { supabase } from "@uwdsc/supabase/client";

// Example: Fetch data
const { data, error } = await supabase.from("your_table").select("*");

// Example: Insert data
const { data, error } = await supabase
  .from("your_table")
  .insert([{ name: "John Doe", email: "john@example.com" }]);
```

### Using with TypeScript

```typescript
import { supabase } from "@uwdsc/supabase/client";
import type { Database } from "@uwdsc/supabase/types";

// The client is already typed with your Database interface
const { data, error } = await supabase
  .from("users") // This will be typed based on your Database schema
  .select("*");
```

### Custom Client

```typescript
import { createClient } from "@uwdsc/supabase/client";
import type { Database } from "@uwdsc/supabase/types";

// Create a custom client with different configuration
const customClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    // Custom options
  }
);
```

## Database Types

To generate TypeScript types for your database schema:

1. Install the Supabase CLI: `npm install supabase --save-dev`
2. Login: `npx supabase login`
3. Generate types: `npx supabase gen types typescript --project-id YOUR_PROJECT_ID --schema public > packages/supabase/src/types.ts`

Replace the placeholder types in `src/types.ts` with your generated types.

## Features

- ✅ Pre-configured Supabase client
- ✅ Environment variable validation
- ✅ TypeScript support
- ✅ Session persistence
- ✅ Auto token refresh
- ✅ URL session detection
